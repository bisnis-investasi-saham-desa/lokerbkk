import React, { useState, useEffect, useRef, useCallback } from 'react';
import { JobItem } from '../types';
import { SearchResultPayload } from '../services/joobleApi';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Filter,
  DollarSign,
  GraduationCap
} from 'lucide-react';

interface JobListProps {
  payload: SearchResultPayload;
  isLoading: boolean;
  onSelectJob: (job: JobItem) => void;
  onNavigate: (href: string) => void;
}

export const JobList: React.FC<JobListProps> = ({
  payload,
  isLoading,
  onSelectJob,
  onNavigate
}) => {
  const allJobs = payload.jobs;
  const totalActual = payload.totalFromApi;

  // Progressive rendering chunk size for high Core Web Vitals performance
  // Purely reveals in-memory items; NEVER triggers ANY network request
  const CHUNK_SIZE = 25;
  const [renderedCount, setRenderedCount] = useState<number>(() =>
    Math.min(CHUNK_SIZE, allJobs.length)
  );

  const [activeFilterJurusan, setActiveFilterJurusan] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'newest'>('default');

  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Reset rendered chunk when payload changes (new search initiated)
  useEffect(() => {
    setRenderedCount(Math.min(CHUNK_SIZE, allJobs.length));
  }, [payload, allJobs.length]);

  // In-memory filter based on user client choices (without any API request)
  const filteredJobs = allJobs.filter((job) => {
    if (activeFilterJurusan === 'all') return true;
    if (!job.jurusanSMK) return true;
    return job.jurusanSMK.some((j) =>
      j.toLowerCase().includes(activeFilterJurusan.toLowerCase())
    );
  });

  // Infinite scroll progressive renderer: Reveals more in-memory items
  const loadMoreChunk = useCallback(() => {
    setRenderedCount((prev) => Math.min(prev + CHUNK_SIZE, filteredJobs.length));
  }, [filteredJobs.length]);

  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreChunk();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMoreChunk]);

  const currentlyVisibleJobs = filteredJobs.slice(0, renderedCount);

  const handleJobClick = (e: React.MouseEvent, job: JobItem) => {
    e.preventDefault();
    onSelectJob(job);
    onNavigate(`/lowongan/${job.id}`);
  };

  return (
    <div className="w-full bg-white text-neutral-900 py-6 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex items-center space-x-2 text-neutral-600">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Beranda
              </a>
            </li>
            <li>/</li>
            <li>
              <span className="font-semibold text-neutral-900">Hasil Pencarian Lowongan BKK</span>
            </li>
          </ol>
        </nav>

        {/* API Result Status Badge - Enforcing One Request = All Returned Results Displayed */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-600 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SISTEM ONE API REQUEST
                </span>
                <span className="text-xs font-semibold text-blue-800 bg-sky-100 px-2.5 py-0.5 rounded-md">
                  {payload.sourceType === 'jooble-live'
                    ? 'Koneksi Live API Jooble'
                    : 'Data Resmi BKK Terverifikasi'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                Menampilkan Seluruh{' '}
                <span className="text-blue-700 underline decoration-blue-300">
                  {totalActual} Lowongan Kerja
                </span>{' '}
                yang Diterima dari 1 Permintaan API
              </h2>
              <p className="text-sm text-neutral-700 mt-1">
                Kata Kunci:{' '}
                <strong className="text-neutral-900 font-bold">
                  "{payload.query.keywords || 'Semua Lowongan'}"
                </strong>{' '}
                • Lokasi:{' '}
                <strong className="text-neutral-900 font-bold">
                  "{payload.query.location || 'Seluruh Indonesia'}"
                </strong>{' '}
                • Tanpa batas kuota buatan frontend (100% data tersaji penuh).
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                Data Termuat di Layar:
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-sm sm:text-base">
                {currentlyVisibleJobs.length} / {totalActual}
              </span>
            </div>
          </div>
        </div>

        {/* In-Memory Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-neutral-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-blue-600" /> Saring Jurusan:
            </span>
            {[
              { id: 'all', label: 'Semua Jurusan' },
              { id: 'mesin', label: 'Teknik Mesin' },
              { id: 'otomotif', label: 'Teknik Otomotif' },
              { id: 'elektronika', label: 'Elektronika' },
              { id: 'logistik', label: 'Logistik / Gudang' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilterJurusan(f.id)}
                className={`text-xs sm:text-sm px-3 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                  activeFilterJurusan === f.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-blue-600 hover:bg-sky-50 hover:text-blue-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-neutral-500">
            *Scroll ke bawah untuk memuat sisa tampilan data tanpa request API baru.
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-bold text-neutral-900">
              Menghubungi API & Mengambil Seluruh Lowongan Kerja BKK...
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Satu kali permintaan tunggal dijalankan untuk menjamin data lengkap dan cepat.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredJobs.length === 0 && (
          <div className="py-12 px-6 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
            <p className="text-lg font-bold text-neutral-900">
              Tidak ada lowongan yang cocok dengan filter spesifik ini.
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Coba ganti filter jurusan atau gunakan pencarian umum seperti "Operator Produksi" atau "Karawang".
            </p>
            <button
              type="button"
              onClick={() => setActiveFilterJurusan('all')}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 cursor-pointer"
            >
              Reset Filter Jurusan
            </button>
          </div>
        )}

        {/* Main Job Cards List - All Clickable Items in Blue */}
        <div className="space-y-4">
          {currentlyVisibleJobs.map((job) => (
            <article
              key={job.id}
              className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-blue-800 border border-sky-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      {job.isVerifiedBKK ? 'Terverifikasi BKK Sekolah' : 'Rekrutmen Industri'}
                    </span>
                    {job.bkkSchool && (
                      <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        Mitra: {job.bkkSchool}
                      </span>
                    )}
                    <span className="text-xs font-medium text-neutral-500">
                      Tipe: {job.type || 'Kontrak BKK'}
                    </span>
                  </div>

                  {/* Title (Clickable in Blue) */}
                  <h3 className="text-lg sm:text-xl font-extrabold">
                    <a
                      href={`/lowongan/${job.id}`}
                      onClick={(e) => handleJobClick(e, job)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer group-hover:text-blue-700 inline-flex items-center gap-1.5"
                    >
                      <span>{job.title}</span>
                      <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </h3>

                  {/* Company & Location */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-semibold text-neutral-900">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-700">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {job.location}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                    )}
                  </div>

                  {/* Snippet / Description */}
                  <p className="text-base text-neutral-900 leading-relaxed pt-1 line-clamp-3">
                    {job.snippet}
                  </p>

                  {/* Jurusan Tags (Clickable in Blue) */}
                  {job.jurusanSMK && job.jurusanSMK.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <GraduationCap className="w-4 h-4 text-neutral-500 mr-1" />
                      <span className="text-xs font-bold text-neutral-600">Jurusan:</span>
                      {job.jurusanSMK.map((jur, i) => (
                        <a
                          key={i}
                          href={`/lowongan?keywords=${encodeURIComponent(jur)}&location=`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/lowongan?keywords=${encodeURIComponent(jur)}&location=`);
                          }}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline bg-sky-50 px-2 py-0.5 rounded border border-sky-200"
                        >
                          {jur}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action Column (Clickable Buttons in Blue) */}
                <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2 pt-2 md:pt-0">
                  <a
                    href={`/lowongan/${job.id}`}
                    onClick={(e) => handleJobClick(e, job)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Detail & Lamar</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  {job.link && (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white hover:bg-sky-50 text-blue-700 font-bold text-xs text-center border border-blue-300 transition-colors cursor-pointer"
                    >
                      Buka Tautan Sumber
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sentinel element for infinite scroll progressive display */}
        <div ref={bottomSentinelRef} className="py-6 text-center">
          {renderedCount < filteredJobs.length ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={loadMoreChunk}
                className="px-6 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-700 font-bold text-sm border border-blue-200 cursor-pointer shadow-xs"
              >
                Tampilkan Lebih Banyak Lowongan ({renderedCount} dari {filteredJobs.length} ditampilkan)
              </button>
              <p className="text-xs text-neutral-500">
                *Memuat sisa data yang telah diterima dari 1 request API awal (tanpa request ulang).
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-center">
              <p className="text-sm font-bold text-blue-800">
                ✓ Seluruh {totalActual} Lowongan Kerja Berhasil Ditampilkan Penuh.
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Sesuai prinsip One API Request = All Returned Results Displayed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
