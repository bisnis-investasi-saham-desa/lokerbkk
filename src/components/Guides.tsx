import React, { useEffect } from 'react';
import { BKK_GUIDES } from '../data/bkkData';
import { BKKGuide } from '../types';
import { updatePageSeo } from '../hooks/useRouter';
import {
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  CheckCircle,
  ExternalLink,
  Award
} from 'lucide-react';

interface GuidesProps {
  onNavigate: (href: string) => void;
  selectedGuideSlug?: string;
}

export const Guides: React.FC<GuidesProps> = ({
  onNavigate,
  selectedGuideSlug
}) => {
  const selectedGuide = selectedGuideSlug
    ? BKK_GUIDES.find((g) => g.slug === selectedGuideSlug)
    : null;

  useEffect(() => {
    if (selectedGuide) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: selectedGuide.title,
        description: selectedGuide.summary,
        author: {
          '@type': 'Organization',
          name: 'LOKERBKK.COM'
        },
        publisher: {
          '@type': 'Organization',
          name: 'LOKERBKK.COM',
          logo: {
            '@type': 'ImageObject',
            url: 'https://lokerbkk.com/logo.png'
          }
        },
        datePublished: '2026-10-25T08:00:00+07:00',
        dateModified: '2026-11-04T08:00:00+07:00',
        mainEntityOfPage: `https://lokerbkk.com/panduan-bkk/${selectedGuide.slug}`
      };

      updatePageSeo(
        `${selectedGuide.title} | LOKERBKK.COM`,
        selectedGuide.summary,
        `/panduan-bkk/${selectedGuide.slug}`,
        articleSchema
      );
    }
  }, [selectedGuide]);

  return (
    <div className="w-full bg-white text-neutral-900 py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-neutral-600 flex-wrap">
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
                href="/panduan-bkk"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/panduan-bkk');
                }}
                className={`hover:underline ${
                  selectedGuide ? 'text-blue-600' : 'font-semibold text-neutral-900'
                }`}
              >
                Panduan Tes & Rekrutmen BKK
              </a>
            </li>
            {selectedGuide && (
              <>
                <li>/</li>
                <li className="font-semibold text-neutral-900 truncate max-w-xs">
                  {selectedGuide.title}
                </li>
              </>
            )}
          </ol>
        </nav>

        {selectedGuide ? (
          /* Single Guide Article View */
          <article className="space-y-6">
            <button
              type="button"
              onClick={() => onNavigate('/panduan-bkk')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Indeks Panduan BKK</span>
            </button>

            <header className="space-y-3 pb-6 border-b border-neutral-200">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-blue-800 border border-sky-200">
                Kategori: {selectedGuide.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                {selectedGuide.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {selectedGuide.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Diperbarui: {selectedGuide.lastUpdated}
                </span>
                <span>Penulis: Tim Ahli Seleksi Vokasi LOKERBKK.COM</span>
              </div>
            </header>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-sky-50 border-l-4 border-blue-600 text-neutral-900 text-base leading-relaxed font-medium">
              {selectedGuide.summary}
            </div>

            {/* Article Content Paragraphs with Rich Inline Links */}
            <div className="space-y-5 text-base text-neutral-900 leading-relaxed">
              {selectedGuide.content.map((paragraph, idx) => (
                <p key={idx} className="text-neutral-900">
                  {paragraph}
                </p>
              ))}

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 my-6">
                <h3 className="font-bold text-base text-neutral-900">
                  Rekomendasi Tautan Terkait untuk Pelamar BKK:
                </h3>
                <ul className="space-y-2 text-sm font-semibold">
                  <li>
                    • Temukan lowongan resmi di:{' '}
                    <a
                      href="/lowongan?keywords=Operator+Produksi&location=Karawang"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/lowongan?keywords=Operator+Produksi&location=Karawang');
                      }}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Lowongan Operator Produksi Kawasan Karawang
                    </a>
                  </li>
                  <li>
                    • Cek jejaring sekolah kejuruan di:{' '}
                    <a
                      href="/bkk-sekolah"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/bkk-sekolah');
                      }}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Direktori BKK SMK Seluruh Indonesia
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        ) : (
          /* Guides Directory View */
          <div>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                Pusat Panduan & Tips Lolos <span className="text-blue-700 underline decoration-blue-300">Tes Seleksi BKK Sekolah</span>
              </h1>
              <p className="text-base text-neutral-700 mt-2">
                Kumpulan artikel resmi dan bocoran kisi-kisi tes seleksi industri manufaktur, tes fisik, psikotes Kraepelin/Pauli, hingga Medical Check Up (MCU) untuk lulusan SMK/SMA se-Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BKK_GUIDES.map((guide) => (
                <article
                  key={guide.id}
                  className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-blue-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                      {guide.category}
                    </span>

                    <h2 className="text-lg sm:text-xl font-bold">
                      <a
                        href={`/panduan-bkk/${guide.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/panduan-bkk/${guide.slug}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {guide.title}
                      </a>
                    </h2>

                    <p className="text-sm text-neutral-900 line-clamp-3">
                      {guide.summary}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                      <span>{guide.readTime}</span>
                      <span>•</span>
                      <span>{guide.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100">
                    <a
                      href={`/panduan-bkk/${guide.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/panduan-bkk/${guide.slug}`);
                      }}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Baca Panduan Selengkapnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
