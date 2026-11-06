import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, updatePageSeo } from './hooks/useRouter';
import {
  executeJobSearch,
  getStoredJoobleKey,
  SearchResultPayload
} from './services/joobleApi';
import { JobItem } from './types';
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
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { INITIAL_BKK_JOBS } from './data/bkkData';

export default function App() {
  const { path, queryParams, navigate } = useRouter();
  const [, startTransition] = useTransition();

  // Jooble API key state
  const [hasApiKey, setHasApiKey] = useState<boolean>(() => !!getStoredJoobleKey());
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

  // Search Results state (adhering strictly to One API Request = All Returned Results Displayed)
  const [searchPayload, setSearchPayload] = useState<SearchResultPayload | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  // Determine current active view based on path
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

  // Handle Search Trigger: Updates URL with dedicated query params
  const handlePerformSearch = useCallback(
    (keywords: string, location: string) => {
      const searchUrl = `/lowongan?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
      navigate(searchUrl);
    },
    [navigate]
  );

  // When path changes to /lowongan with query params, execute exactly 1 API request
  useEffect(() => {
    if (isSearchPage) {
      const kw = queryParams.keywords || '';
      const loc = queryParams.location || '';

      updatePageSeo(
        `Lowongan Kerja ${kw || 'BKK'} di ${loc || 'Seluruh Indonesia'} | LOKERBKK.COM`,
        `Daftar lengkap lowongan kerja resmi via BKK sekolah untuk ${kw || 'vokasi SMK/SMA'} di area ${loc || 'Indonesia'}. 100% data riil dari 1 permintaan API terverifikasi.`,
        `/lowongan?keywords=${encodeURIComponent(kw)}&location=${encodeURIComponent(loc)}`
      );

      setIsSearching(true);
      executeJobSearch(kw, loc)
        .then((payload) => {
          setSearchPayload(payload);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  }, [isSearchPage, queryParams.keywords, queryParams.location]);

  // When path changes to /lowongan/:id, locate or fetch the specific job
  useEffect(() => {
    if (isJobDetail && jobIdFromPath) {
      if (!selectedJob || selectedJob.id !== jobIdFromPath) {
        // Look in current payload or initial data
        const found =
          (searchPayload?.jobs && searchPayload.jobs.find((j) => j.id === jobIdFromPath)) ||
          INITIAL_BKK_JOBS.find((j) => j.id === jobIdFromPath);

        if (found) {
          setSelectedJob(found);
        } else {
          // If not found in memory, query search once to locate
          executeJobSearch('', '').then((payload) => {
            const match = payload.jobs.find((j) => j.id === jobIdFromPath) || INITIAL_BKK_JOBS[0];
            setSelectedJob(match);
          });
        }
      }
    }
  }, [isJobDetail, jobIdFromPath, searchPayload, selectedJob]);

  // Dynamic SEO meta tags per route
  useEffect(() => {
    if (isHomepage) {
      updatePageSeo(
        'LOKERBKK.COM - Lowongan Kerja via BKK Sekolah Seluruh Indonesia',
        'Pusat informasi lowongan kerja via BKK sekolah seluruh Indonesia untuk lulusan SMK/SMA. Temukan rekrutmen resmi industri, kisi-kisi tes, dan info kerja BKK terpercaya.',
        '/'
      );
    } else if (isBkkDirectory && !bkkSlug) {
      updatePageSeo(
        'Direktori Resmi BKK SMK Seluruh Indonesia | LOKERBKK.COM',
        'Daftar lengkap Bursa Kerja Khusus (BKK) SMK terakreditasi dan berizin resmi Dinas Ketenagakerjaan di pusat-pusat industri Indonesia.',
        '/bkk-sekolah'
      );
    } else if (isGuides && !guideSlug) {
      updatePageSeo(
        'Panduan Tes & Seleksi BKK Sekolah | LOKERBKK.COM',
        'Kumpulan panduan alur pendaftaran BKK, standar tes fisik, tips psikotes Kraepelin/Pauli, dan Medical Check Up (MCU) pabrik.',
        '/panduan-bkk'
      );
    } else if (isCategories && !categorySlug) {
      updatePageSeo(
        'Kategori Lowongan Kerja BKK SMK | LOKERBKK.COM',
        'Peluang karir kejuruan berdasarkan jurusan SMK: Operator Produksi, QC, Maintenance, Staff Gudang, dan Magang Jepang.',
        '/kategori/operator-produksi'
      );
    } else if (isAbout) {
      updatePageSeo(
        'Tentang LOKERBKK.COM - Standar Rekrutmen BKK Kemnaker RI',
        'Misi dan landasan hukum portal LOKERBKK.COM dalam menyalurkan lulusan SMK ke industri manufaktur tanpa calo dan pungutan liar.',
        '/tentang-kami'
      );
    } else if (isSitemap) {
      updatePageSeo(
        'Peta Situs (Sitemap Index) | LOKERBKK.COM',
        'Daftar indeks seluruh URL dan halaman lowongan kerja via BKK sekolah untuk kemudahan perayapan Google Search Console.',
        '/sitemap'
      );
    }
  }, [isHomepage, isBkkDirectory, bkkSlug, isGuides, guideSlug, isCategories, categorySlug, isAbout, isSitemap]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header with light blue accent */}
      <Header
        currentPath={path}
        onNavigate={navigate}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        hasCustomApiKey={hasApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-white">
        {/* HOMEPAGE VIEW:
            Strictly follows requirements:
            1. Search bar at the VERY TOP of body with ONLY 2 parameters (location & job type)
            2. Followed by comprehensive in-depth SEO Pillar article on "Lowongan kerja via BKK sekolah seluruh indonesia"
            3. NO default job listings to ensure 0% fictitious listings (jobs only appear upon search)
        */}
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

        {/* SEARCH RESULTS VIEW:
            Strictly enforces One API Request = All Returned Results Displayed
        */}
        {isSearchPage && (
          <>
            <SearchBar
              initialKeywords={queryParams.keywords || ''}
              initialLocation={queryParams.location || ''}
              onSearch={handlePerformSearch}
              isCompact={true}
            />
            {searchPayload && (
              <JobList
                payload={searchPayload}
                isLoading={isSearching}
                onSelectJob={(job) => {
                  setSelectedJob(job);
                }}
                onNavigate={navigate}
              />
            )}
          </>
        )}

        {/* JOB DETAIL VIEW */}
        {isJobDetail && selectedJob && (
          <JobDetail
            job={selectedJob}
            allJobs={searchPayload?.jobs || INITIAL_BKK_JOBS}
            onBack={() => {
              if (searchPayload) {
                navigate(
                  `/lowongan?keywords=${encodeURIComponent(
                    searchPayload.query.keywords
                  )}&location=${encodeURIComponent(searchPayload.query.location)}`
                );
              } else {
                navigate('/lowongan?keywords=&location=');
              }
            }}
            onNavigate={navigate}
          />
        )}

        {/* BKK SCHOOL DIRECTORY VIEW */}
        {isBkkDirectory && (
          <BkkDirectory
            onNavigate={navigate}
            selectedSchoolSlug={bkkSlug}
            onSearchSchoolJobs={(schoolName, city) => {
              handlePerformSearch(schoolName, city);
            }}
          />
        )}

        {/* GUIDES VIEW */}
        {isGuides && (
          <Guides onNavigate={navigate} selectedGuideSlug={guideSlug} />
        )}

        {/* CATEGORIES VIEW */}
        {isCategories && (
          <CategoriesView
            onNavigate={navigate}
            selectedCategorySlug={categorySlug}
            onSearchCategory={(roleName) => {
              handlePerformSearch(roleName, '');
            }}
          />
        )}

        {/* ABOUT VIEW */}
        {isAbout && <AboutView onNavigate={navigate} />}

        {/* PRIVACY POLICY VIEW */}
        {isPrivacy && <PrivacyView onNavigate={navigate} />}

        {/* TERMS & CONDITIONS VIEW */}
        {isTerms && <TermsView onNavigate={navigate} />}

        {/* CONTACT VIEW */}
        {isContact && <ContactView onNavigate={navigate} />}

        {/* SITEMAP VIEW */}
        {isSitemap && <SitemapView onNavigate={navigate} />}
      </main>

      {/* Footer with light blue accent */}
      <Footer onNavigate={navigate} />

      {/* API Key Modal for Jooble */}
      <ApiSettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onKeySaved={(key) => {
          setHasApiKey(!!key.trim());
        }}
      />
    </div>
  );
}
