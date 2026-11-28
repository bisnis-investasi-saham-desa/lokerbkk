import React, { useState } from 'react';
import { Code2, Globe } from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (href: string) => void;
}

const KOTA = ['bekasi', 'cikarang', 'karawang', 'cikampek', 'solo', 'tangerang', 'jakarta'];
const JENIS = [
  { slug: 'operator+produksi', label: 'Operator Produksi' },
  { slug: 'qc', label: 'QC' },
  { slug: 'staff', label: 'Staff' },
  { slug: 'cleaning+service', label: 'Cleaning Service' },
  { slug: 'operator+alat', label: 'Operator Alat' }
];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'xml'>('html');

  const links = [
    { url: 'https://www.lokerbkk.com/', label: 'Beranda LOKERBKK.COM', priority: '1.0', changefreq: 'daily' },
    { url: 'https://www.lokerbkk.com/lowongan?keywords=&location=', label: 'Semua Lowongan', priority: '0.9', changefreq: 'daily' },
    ...JENIS.map((j) => ({
      url: `https://www.lokerbkk.com/lowongan?keywords=${j.slug}&location=`,
      label: `Lowongan ${j.label} (Semua Kota)`,
      priority: '0.8',
      changefreq: 'daily'
    })),
    ...KOTA.map((k) => ({
      url: `https://www.lokerbkk.com/lowongan?keywords=&location=${k}`,
      label: `Lowongan di ${cap(k)}`,
      priority: '0.8',
      changefreq: 'daily'
    })),
    ...KOTA.flatMap((k) =>
      JENIS.map((j) => ({
        url: `https://www.lokerbkk.com/lowongan?keywords=${j.slug}&location=${k}`,
        label: `Lowongan ${j.label} di ${cap(k)}`,
        priority: '0.7',
        changefreq: 'daily'
      }))
    ),
    { url: 'https://www.lokerbkk.com/bkk-sekolah', label: 'Direktori BKK SMK', priority: '0.7', changefreq: 'weekly' },
    { url: 'https://www.lokerbkk.com/panduan-bkk', label: 'Panduan Tes BKK', priority: '0.7', changefreq: 'weekly' },
    { url: 'https://www.lokerbkk.com/kategori/operator-produksi', label: 'Kategori Operator Produksi', priority: '0.6', changefreq: 'weekly' },
    { url: 'https://www.lokerbkk.com/tentang-kami', label: 'Tentang Kami', priority: '0.5', changefreq: 'monthly' },
    { url: 'https://www.lokerbkk.com/kebijakan-privasi', label: 'Kebijakan Privasi', priority: '0.3', changefreq: 'monthly' },
    { url: 'https://www.lokerbkk.com/syarat-ketentuan', label: 'Syarat & Ketentuan', priority: '0.3', changefreq: 'monthly' },
    { url: 'https://www.lokerbkk.com/kontak', label: 'Kontak', priority: '0.4', changefreq: 'monthly' }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${links
  .map(
    (l) => `  <url>
    <loc>${l.url.replace(/&/g, '&amp;')}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${l.changefreq}</changefreq>
    <priority>${l.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return (
    <div className="w-full bg-white text-neutral-900 py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex items-center space-x-2 text-neutral-600 flex-wrap">
            <li>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Beranda
              </a>
            </li>
            <li>/</li>
            <li className="font-semibold text-neutral-900">Peta Situs</li>
          </ol>
        </nav>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Peta Situs Resmi <span className="text-blue-600">LOKERBKK.COM</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-700">
            Struktur URL lengkap untuk pengindeksan Google dan navigasi pengunjung.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'html' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-sky-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Tampilan Web ({links.length} URL)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('xml')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'xml' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-sky-50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Format XML</span>
          </button>
        </div>

        {activeTab === 'html' ? (
          <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl bg-white p-4 sm:p-6 shadow-xs">
            {links.map((link, idx) => {
              const localPath = link.url.replace('https://www.lokerbkk.com', '');
              return (
                <div key={idx} className="py-3 first:pt-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <a
                      href={localPath}
                      onClick={(e) => { e.preventDefault(); onNavigate(localPath); }}
                      className="text-sm sm:text-base font-bold text-blue-600 hover:text-blue-800 hover:underline block break-words"
                    >
                      {link.label}
                    </a>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5 block break-all">
                      {link.url}
                    </span>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-sky-50 text-blue-700 rounded border border-sky-200">
                      {link.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-neutral-900 rounded-2xl p-4 sm:p-5 text-neutral-200 font-mono text-xs overflow-x-auto shadow-inner">
            <pre className="whitespace-pre">{xmlContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
