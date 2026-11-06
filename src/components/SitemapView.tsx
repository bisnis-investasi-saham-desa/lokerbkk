import React, { useState } from 'react';
import { BKK_SCHOOLS, JOB_CATEGORIES, BKK_GUIDES } from '../data/bkkData';
import { ExternalLink, Code2, Globe } from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (href: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'xml'>('html');

  const links = [
    { url: 'https://lokerbkk.com/', label: 'Beranda LOKERBKK.COM (Fokus Keyword: Lowongan kerja via BKK sekolah seluruh indonesia)', priority: '1.0', changefreq: 'daily' },
    { url: 'https://lokerbkk.com/lowongan?keywords=Operator+Produksi&location=Karawang', label: 'Loker Operator Produksi Kawasan Karawang', priority: '0.9', changefreq: 'daily' },
    { url: 'https://lokerbkk.com/lowongan?keywords=Quality+Control&location=Cikarang', label: 'Loker Quality Control Kawasan Cikarang', priority: '0.9', changefreq: 'daily' },
    { url: 'https://lokerbkk.com/lowongan?keywords=Maintenance+Mesin&location=Bekasi', label: 'Loker Maintenance Mesin Kawasan Bekasi', priority: '0.9', changefreq: 'daily' },
    { url: 'https://lokerbkk.com/lowongan?keywords=Staff+Gudang&location=Surabaya', label: 'Loker Staff Gudang & Logistik Surabaya', priority: '0.8', changefreq: 'daily' },
    { url: 'https://lokerbkk.com/bkk-sekolah', label: 'Direktori Resmi BKK SMK Seluruh Indonesia', priority: '0.9', changefreq: 'weekly' },
    ...BKK_SCHOOLS.map((s) => ({
      url: `https://lokerbkk.com/bkk-sekolah/${s.slug}`,
      label: `Profil Rekrutmen ${s.name} (${s.city})`,
      priority: '0.8',
      changefreq: 'weekly'
    })),
    { url: 'https://lokerbkk.com/panduan-bkk', label: 'Pusat Panduan Tes & Alur Seleksi BKK', priority: '0.9', changefreq: 'weekly' },
    ...BKK_GUIDES.map((g) => ({
      url: `https://lokerbkk.com/panduan-bkk/${g.slug}`,
      label: g.title,
      priority: '0.8',
      changefreq: 'monthly'
    })),
    ...JOB_CATEGORIES.map((c) => ({
      url: `https://lokerbkk.com/kategori/${c.slug}`,
      label: `Lowongan BKK Kategori ${c.name}`,
      priority: '0.8',
      changefreq: 'weekly'
    })),
    { url: 'https://lokerbkk.com/tentang-kami', label: 'Tentang LOKERBKK.COM', priority: '0.5', changefreq: 'monthly' },
    { url: 'https://lokerbkk.com/kebijakan-privasi', label: 'Kebijakan Privasi LokerBKK', priority: '0.3', changefreq: 'yearly' },
    { url: 'https://lokerbkk.com/syarat-ketentuan', label: 'Syarat & Ketentuan Layanan', priority: '0.3', changefreq: 'yearly' },
    { url: 'https://lokerbkk.com/kontak', label: 'Hubungi Pengelola & Pendaftaran BKK Baru', priority: '0.4', changefreq: 'monthly' }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${links
  .map(
    (l) => `  <url>
    <loc>${l.url}</loc>
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
            <li className="font-semibold text-neutral-900">Peta Situs (Sitemap Index)</li>
          </ol>
        </nav>

        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold text-neutral-900">
            Peta Situs Resmi <span className="text-blue-600">LOKERBKK.COM</span>
          </h1>
          <p className="text-base text-neutral-700">
            Struktur URL lengkap dan mandiri untuk pengindeksan Google Search Console, Googlebot crawler, dan kemudahan navigasi pengunjung.
          </p>
        </header>

        <div className="flex gap-2 border-b border-neutral-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'html'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-sky-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Tampilan Web HTML ({links.length} URL)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'xml'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-sky-50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Format sitemap.xml Googlebot</span>
          </button>
        </div>

        {activeTab === 'html' ? (
          <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl bg-white p-4 sm:p-6 shadow-xs space-y-3">
            {links.map((link, idx) => {
              const localPath = link.url.replace('https://lokerbkk.com', '');
              return (
                <div key={idx} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
                  <div>
                    <a
                      href={localPath}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(localPath);
                      }}
                      className="text-base font-bold text-blue-600 hover:text-blue-800 hover:underline block"
                    >
                      {link.label}
                    </a>
                    <span className="text-xs text-neutral-500 font-mono mt-0.5 block">
                      {link.url}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-sky-50 text-blue-700 rounded border border-sky-200">
                      Prioritas: {link.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-neutral-900 rounded-2xl p-5 text-neutral-200 font-mono text-xs overflow-x-auto shadow-inner">
            <pre>{xmlContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
