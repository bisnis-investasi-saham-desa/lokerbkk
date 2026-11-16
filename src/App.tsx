import { useState, useEffect, useCallback } from 'react';
import { useRouter, updatePageSeo } from './hooks/useRouter';
import { getLowongan, type Lowongan } from './services/lowonganApi';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { PillarContent } from './components/PillarContent';
import { JobList } from './components/JobList';
import { JobDetail } from './components/JobDetail';
import { BkkDirectory } from './components/BkkDirectory';
import { Guides } from './components/Guides';
import { CategoriesView } from './components/CategoriesView';
import { AboutView } from './components/AboutView';
import { SitemapView } from './components/SitemapView';
import { PrivacyView, TermsView, ContactView } from './components/LegalViews';

export default function App() {
  const { path, queryParams, navigate } = useRouter();

  const [lowonganResults, setLowonganResults] = useState<Lowongan[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [homeLowongan, setHomeLowongan] = useState<Lowongan[]>([]);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Lowongan | null>(null);

  const isHomepage = path === '/' || path === '';
  const isSearchPage = path.startsWith('/lowongan') && !path.startsWith('/lowongan/');
  const isJobDetail = path.startsWith('/lowongan/');
  const isBkkDirectory = path.startsWith('/bkk-sekolah');
  const isGuides = path.startsWith('/panduan-bkk');
  const isCategories = path.startsWith('/kategori');
  const isAbout = path === '/tentang-kami';
  const isPrivacy = path === '/kebijakan-privasi';
  const isTerms = path === '/syarat-ketentuan';
  const isContact = path === '/kontak';
  const isSitemap = path === '/sitemap';

  const bkkSlug = isBkkDirectory && path !== '/bkk-sekolah' ? path.replace('/bkk-sekolah/', '') : undefined;
  const guideSlug = isGuides && path !== '/panduan-bkk' ? path.replace('/panduan-bkk/', '') : undefined;
  const categorySlug = isCategories && path !== '/kategori' ? path.replace('/kategori/', '') : undefined;
  const jobIdFromPath = isJobDetail ? path.replace('/lowongan/', '') : null;

  const handlePerformSearch = useCallback(
    (keywords: string, location: string) => {
      const searchUrl = `/lowongan?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
      navigate(searchUrl);
    },
    [navigate]
  );

  useEffect(() => {
    if (isHomepage) {
      setIsHomeLoading(true);
      getLowongan("", "")
        .then((data) => setHomeLowongan(data.lowongan))
        .finally(() => setIsHomeLoading(false));
    }
  }, [isHomepage]);

  useEffect(() => {
    if (isSearchPage) {
      const kw = queryParams.keywords || '';
      const loc = queryParams.location || '';

      updatePageSeo(
        `Lowongan Kerja ${kw || 'BKK'} di ${loc || 'Seluruh Indonesia'} | LokerBKK.com`,
        `Daftar lengkap lowongan kerja resmi via BKK sekolah untuk ${kw || 'vokasi SMK/SMA'} di area ${loc || 'Indonesia'}.`,
        `/lowongan?keywords=${encodeURIComponent(kw)}&location=${encodeURIComponent(loc)}`
      );

      setIsSearching(true);
      getLowongan(loc, kw)
        .then((data) => setLowonganResults(data.lowongan))
        .finally(() => setIsSearching(false));
    }
  }, [isSearchPage, queryParams.keywords, queryParams.location]);

  useEffect(() => {
    if (isJobDetail && jobIdFromPath) {
      const found = lowonganResults.find((j) => String(j.id) === jobIdFromPath);
      if (found) {
        setSelectedJob(found);
      } else {
        getLowongan('', '').then((data) => {
          const match = data.lowongan.find((j) => String(j.id) === jobIdFromPath);
          if (match) setSelectedJob(match);
        });
      }
    }
  }, [isJobDetail, jobIdFromPath, lowonganResults]);

  useEffect(() => {
    if (isHomepage) {
      updatePageSeo(
        'LokerBKK.com - Lowongan Kerja via BKK Sekolah Seluruh Indonesia',
        'Pusat informasi lowongan kerja via BKK sekolah seluruh Indonesia untuk lulusan SMK/SMA.',
        '/'
      );
    } else if (isBkkDirectory && !bkkSlug) {
      updatePageSeo(
        'Direktori Resmi BKK SMK Seluruh Indonesia | LokerBKK.com',
        'Daftar lengkap Bursa Kerja Khusus (BKK) SMK terakreditasi.',
        '/bkk-sekolah'
      );
    } else if (isGuides && !guideSlug) {
      updatePageSeo(
        'Panduan Tes & Seleksi BKK Sekolah | LokerBKK.com',
        'Kumpulan panduan alur pendaftaran BKK, standar tes fisik, tips psikotes.',
        '/panduan-bkk'
      );
    } else if (isCategories && !categorySlug) {
      updatePageSeo(
        'Kategori Lowongan Kerja BKK SMK | LokerBKK.com',
        'Peluang karir kejuruan berdasarkan jurusan SMK.',
        '/kategori/operator-produksi'
      );
    } else if (isAbout) {
      updatePageSeo(
        'Tentang LokerBKK.com - Standar Rekrutmen BKK Kemnaker RI',
        'Misi dan landasan hukum portal LokerBKK.com.',
        '/tentang-kami'
      );
    } else if (isSitemap) {
      updatePageSeo(
        'Peta Situs (Sitemap Index) | LokerBKK.com',
        'Daftar indeks seluruh URL dan halaman lowongan kerja via BKK sekolah.',
        '/sitemap'
      );
    }
  }, [isHomepage, isBkkDirectory, bkkSlug, isGuides, guideSlug, isCategories, categorySlug, isAbout, isSitemap]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header currentPath={path} onNavigate={navigate} />

      <main className="flex-1 w-full bg-white">
        {isHomepage && (
          <>
            <SearchBar
              initialKeywords=""
              initialLocation=""
              onSearch={handlePerformSearch}
              isCompact={false}
            />
            <JobList
              lowongan={homeLowongan}
              isLoading={isHomeLoading}
              onSelectJob={(job) => setSelectedJob(job)}
              onNavigate={navigate}
              limit={12}
              showViewAll={true}
            />
            <PillarContent onNavigate={navigate} />
          </>
        )}

        {isSearchPage && (
          <>
            <SearchBar
              initialKeywords={queryParams.keywords || ''}
              initialLocation={queryParams.location || ''}
              onSearch={handlePerformSearch}
              isCompact={true}
            />
            <JobList
              lowongan={lowonganResults}
              isLoading={isSearching}
              onSelectJob={(job) => setSelectedJob(job)}
              onNavigate={navigate}
            />
          </>
        )}

        {isJobDetail && selectedJob && (
          <JobDetail
            job={selectedJob}
            allJobs={lowonganResults}
            onBack={() => {
              const kw = queryParams.keywords || '';
              const loc = queryParams.location || '';
              navigate(`/lowongan?keywords=${encodeURIComponent(kw)}&location=${encodeURIComponent(loc)}`);
            }}
            onNavigate={navigate}
          />
        )}

        {isBkkDirectory && (
          <BkkDirectory
            onNavigate={navigate}
            selectedSchoolSlug={bkkSlug}
            onSearchSchoolJobs={(schoolName, city) => handlePerformSearch(schoolName, city)}
          />
        )}

        {isGuides && <Guides onNavigate={navigate} selectedGuideSlug={guideSlug} />}

        {isCategories && (
          <CategoriesView
            onNavigate={navigate}
            selectedCategorySlug={categorySlug}
            onSearchCategory={(roleName) => handlePerformSearch(roleName, '')}
          />
        )}

        {isAbout && <AboutView onNavigate={navigate} />}
        {isPrivacy && <PrivacyView onNavigate={navigate} />}
        {isTerms && <TermsView onNavigate={navigate} />}
        {isContact && <ContactView onNavigate={navigate} />}
        {isSitemap && <SitemapView onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
