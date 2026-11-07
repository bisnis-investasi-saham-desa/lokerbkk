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

  // Search state
  const [lowonganResults, setLowonganResults] = useState<Lowongan[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Lowongan | null>(null);

  // Determine current active view
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

  // Sub-slug extraction
  const bkkSlug = isBkkDirectory && path !== '/bkk-sekolah' ? path.replace('/bkk-sekolah/', '') : undefined;
  const guideSlug = isGuides && path !== '/panduan-bkk' ? path.replace('/panduan-bkk/', '') : undefined;
  const categorySlug = isCategories && path !== '/kategori' ? path.replace('/kategori/', '') : undefined;
  const jobIdFromPath = isJobDetail ? path.replace('/lowongan/', '') : null;

  // Handle Search: navigate to /lowongan with query params
  const handlePerformSearch = useCallback(
    (keywords: string, location: string) => {
      const searchUrl = `/lowongan?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
      navigate(searchUrl);
    },
    [navigate]
  );

  // When on /lowongan page, call API (keywords = jenis, location = kota)
  useEffect(() => {
    if (isSearchPage) {
      const kw = queryParams.keywords || '';
      const loc = queryParams.location || '';

      updatePageSeo(
        `Lowongan Kerja ${kw || 'BKK'} di ${loc || 'Seluruh Indonesia'} | LOKERBKK.COM`,
        `Daftar lengkap lowongan kerja resmi via BKK sekolah untuk ${kw || 'vokasi SMK/SMA'} di area ${loc || 'Indonesia'}.`,
        `/lowongan?keywords=${encodeURIComponent(kw)}&location=${encodeURIComponent(loc)}`
      );

      setIsSearching(true);
      // getLowongan(kota, jenis) — loc = kota, kw = jenis
      getLowongan(loc, kw)
        .then((data) => setLowonganResults(data.lowongan))
        .finally(() => setIsSearching(false));
    }
  }, [isSearchPage, queryParams.keywords, queryParams.location]);

  // When on /lowongan/:id, find the job from results
  useEffect(() => {
    if (isJobDetail && jobIdFromPath) {
      const found = lowonganResults.find((j) => String(j.id) === jobIdFromPath);
      if (found) {
        setSelectedJob(found);
      } else {
        // Job not in current results, fetch all then find
        getLowongan('', '').then((data) => {
          const match = data.lowongan.find((j) => String(j.id) === jobIdFromPath);
          if (match) setSelectedJob(match);
        });
      }
    }
  }, [isJobDetail, jobIdFromPath, lowonganResults]);

  // Dynamic SEO per route
  useEffect(() => {
    if (isHomepage) {
      updatePageSeo(
        'LOKERBKK.COM - Lowongan Kerja via BKK Sekolah Seluruh Indonesia',
        'Pusat informasi lowongan kerja via BKK sekolah seluruh Indonesia untuk lulusan SMK/SMA.',
        '/'
      );
    } else if (isBkkDirectory && !bkkSlug) {
      updatePageSeo(
        'Direktori Resmi BKK SMK Seluruh Indonesia | LOKERBKK.COM',
        'Daftar lengkap Bursa Kerja Khusus (BKK) SMK terakreditasi.',
        '/bkk-sekolah'
      );
    } else if (isGuides && !guideSlug) {
      updatePageSeo(
        'Panduan Tes & Seleksi BKK Sekolah | LOKERBKK.COM',
        'Kumpulan panduan alur pendaftaran BKK, standar tes fisik, tips psikotes.',
        '/panduan-bkk'
      );
    } else if (isCategories && !categorySlug) {
      updatePageSeo(
        'Kategori Lowongan Kerja BKK SMK | LOKERBKK.COM',
        'Peluang karir kejuruan berdasarkan jurusan SMK.',
        '/kategori/operator-produksi'
      );
    } else if (isAbout) {
      updatePageSeo(
        'Tentang LOKERBKK.COM - Standar Rekrutmen BKK Kemnaker RI',
        'Misi dan landasan hukum portal LOKERBKK.COM.',
        '/tentang-kami'
      );
    } else if (isSitemap) {
      updatePageSeo(
        'Peta Situs (Sitemap Index) | LOKERBKK.COM',
        'Daftar indeks seluruh URL dan halaman lowongan kerja via BKK sekolah.',
        '/sitemap'
      );
    }
  }, [isHomepage, isBkkDirectory, bkkSlug, isGuides, guideSlug, isCategories, categorySlug, isAbout, isSitemap]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header currentPath={path} onNavigate={navigate} />

      <main className="flex-1 w-full bg-white">
        {/* HOMEPAGE */}
        {isHomepage && (
          <>
            <SearchBar
              initialKeywords=""
              initialLocation=""
              onSearch={handlePerformSearch}
              isCompact={false}
            />
            <PillarContent onNavigate={navigate} />
          </>
        )}

        {/* SEARCH RESULTS */}
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

        {/* JOB DETAIL */}
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

        {/* BKK DIRECTORY */}
        {isBkkDirectory && (
          <BkkDirectory
            onNavigate={navigate}
            selectedSchoolSlug={bkkSlug}
            onSearchSchoolJobs={(schoolName, city) => handlePerformSearch(schoolName, city)}
          />
        )}

        {/* GUIDES */}
        {isGuides && <Guides onNavigate={navigate} selectedGuideSlug={guideSlug} />}

        {/* CATEGORIES */}
        {isCategories && (
          <CategoriesView
            onNavigate={navigate}
            selectedCategorySlug={categorySlug}
            onSearchCategory={(roleName) => handlePerformSearch(roleName, '')}
          />
        )}

        {/* ABOUT */}
        {isAbout && <AboutView onNavigate={navigate} />}

        {/* LEGAL */}
        {isPrivacy && <PrivacyView onNavigate={navigate} />}
        {isTerms && <TermsView onNavigate={navigate} />}
        {isContact && <ContactView onNavigate={navigate} />}

        {/* SITEMAP */}
        {isSitemap && <SitemapView onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
