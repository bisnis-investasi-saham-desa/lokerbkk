import React from 'react';
import { ShieldCheck, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (href: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white text-neutral-900 py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
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
            <li className="font-semibold text-neutral-900">Tentang Kami</li>
          </ol>
        </nav>

        <header className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-blue-800 border border-sky-200">
            Profil Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Tentang <span className="text-blue-600">LOKERBKK.COM</span>
          </h1>
          <p className="text-base text-neutral-900 leading-relaxed">
            Portal rujukan informasi lowongan kerja via BKK sekolah seluruh Indonesia yang didedikasikan untuk menjembatani lulusan Sekolah Menengah Kejuruan (SMK) dan vokasi dengan dunia industri manufaktur, otomotif, dan logistik nasional.
          </p>
        </header>

        <section className="p-6 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Landasan Hukum & Visi Penyelenggaraan
          </h2>
          <p className="text-base text-neutral-900 leading-relaxed">
            Bursa Kerja Khusus (BKK) adalah mitra kerja resmi Dinas Ketenagakerjaan yang dibentuk berdasarkan <strong>Peraturan Menteri Ketenagakerjaan RI Nomor 39 Tahun 2016</strong> tentang Penempatan Tenaga Kerja. Melalui LOKERBKK.COM, kami berkomitmen melawan maraknya praktik penipuan rekrutmen kerja dan calo ilegal yang merugikan lulusan kejuruan.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 border-l-4 border-blue-600 pl-3">
            Komitmen Layanan LOKERBKK.COM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-neutral-900">100% Bebas Calo</h3>
              <p className="text-sm text-neutral-900">
                Informasi rekrutmen dipublikasikan secara transparan tanpa pungutan jutaan rupiah.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-neutral-900">Terhubung Mitra Industri Terkemuka</h3>
              <p className="text-sm text-neutral-900">
                Kemitraan langsung dengan Astra Honda Motor, Denso, Yamaha, Epson, Toyota, dan puluhan industri tier-1.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-neutral-900">One API Request Data Integrity</h3>
              <p className="text-sm text-neutral-900">
                Menjamin seluruh data aktual dari penyedia API lowongan ditampilkan penuh tanpa pembatasan frontend.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-neutral-200 bg-white space-y-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-neutral-900">Edukasi & Kisi-kisi Seleksi</h3>
              <p className="text-sm text-neutral-900">
                Menyediakan panduan lengkap tes fisik, psikotes Kraepelin, dan Medical Check Up (MCU).
              </p>
            </div>
          </div>
        </section>

        <div className="pt-4 flex flex-wrap gap-4">
          <a
            href="/bkk-sekolah"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/bkk-sekolah');
            }}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
          >
            Jelajahi Direktori BKK SMK
          </a>
          <a
            href="/panduan-bkk"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/panduan-bkk');
            }}
            className="px-6 py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-700 font-bold text-sm border border-blue-200"
          >
            Baca Panduan Tes Vokasi
          </a>
        </div>
      </div>
    </div>
  );
};
