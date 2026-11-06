import React from 'react';
import { JOB_CATEGORIES } from '../data/bkkData';
import { JobCategory } from '../types';
import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface CategoriesViewProps {
  onNavigate: (href: string) => void;
  selectedCategorySlug?: string;
  onSearchCategory: (keywords: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onNavigate,
  selectedCategorySlug,
  onSearchCategory
}) => {
  const selectedCategory = selectedCategorySlug
    ? JOB_CATEGORIES.find((c) => c.slug === selectedCategorySlug)
    : null;

  return (
    <div className="w-full bg-white text-neutral-900 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
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
              <a
                href="/kategori/operator-produksi"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/kategori/operator-produksi');
                }}
                className={`hover:underline ${
                  selectedCategory ? 'text-blue-600' : 'font-semibold text-neutral-900'
                }`}
              >
                Kategori Lowongan BKK
              </a>
            </li>
            {selectedCategory && (
              <>
                <li>/</li>
                <li className="font-semibold text-neutral-900 truncate">
                  {selectedCategory.name}
                </li>
              </>
            )}
          </ol>
        </nav>

        {selectedCategory ? (
          <article className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-sky-50 border border-sky-200">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-sky-200">
                Bidang Vokasi Industri
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
                Lowongan Kerja {selectedCategory.name} via BKK Sekolah
              </h1>
              <p className="text-base text-neutral-900 mt-2 max-w-3xl leading-relaxed">
                {selectedCategory.description}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-neutral-700 flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Jurusan SMK Relevan:
                </span>
                {selectedCategory.jurusanRelevan.map((j, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-white text-blue-800 px-2.5 py-1 rounded-md border border-sky-200"
                  >
                    {j}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSearchCategory(selectedCategory.name)}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Cari Semua Lowongan {selectedCategory.name}</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-4">
              <h2 className="text-xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
                Tips Mempersiapkan Diri di Bidang {selectedCategory.name}
              </h2>
              <p className="text-base text-neutral-900 leading-relaxed">
                Untuk lolos rekrutmen di kategori ini, pelamar disarankan melatih ketelitian membaca gambar teknik kerja, pengukuran jangka sorong / micrometer, serta menjaga kondisi fisik prima untuk sistem shift pabrik.
              </p>
              <div className="pt-2">
                <a
                  href="/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif');
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                >
                  <span>Baca Panduan Tes Fisik & Kebugaran Pabrik</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                Kategori Pilihan <span className="text-blue-700 underline decoration-blue-300">Lowongan Kerja BKK Sekolah</span>
              </h1>
              <p className="text-base text-neutral-700 mt-2">
                Pilih bidang kejuruan yang sesuai dengan latar belakang kompetensi keahlian SMK Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {JOB_CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <h2 className="text-lg font-bold">
                      <a
                        href={`/kategori/${cat.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/kategori/${cat.slug}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {cat.name}
                      </a>
                    </h2>
                    <p className="text-sm text-neutral-900 line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500">
                      {cat.count}+ Loker BKK
                    </span>
                    <button
                      type="button"
                      onClick={() => onSearchCategory(cat.name)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Cari Loker</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
