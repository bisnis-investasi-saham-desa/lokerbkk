import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  Building2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  Award
} from 'lucide-react';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="w-full bg-sky-50 border-t border-sky-200 text-neutral-900 pt-12 pb-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Identity (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-neutral-900 tracking-tight">
                LOKER<span className="text-blue-600">BKK</span><span className="text-sky-500">.COM</span>
              </span>
            </div>

            <p className="text-sm text-neutral-900 leading-relaxed max-w-sm">
              <strong className="font-bold">LOKERBKK.COM</strong> adalah portal direktori dan pencarian{' '}
              <a
                href="/"
                onClick={(e) => handleNav(e, '/')}
                className="text-blue-600 hover:text-blue-800 underline font-semibold"
              >
                lowongan kerja via BKK sekolah
              </a>{' '}
              seluruh Indonesia yang mengintegrasikan informasi rekrutmen resmi industri manufaktur, otomotif, dan logistik langsung dari Bursa Kerja Khusus (BKK) SMK terakreditasi Kemendikbudristek & Kemenaker RI.
            </p>

            <div className="p-3 bg-white rounded-xl border border-sky-200 text-xs text-neutral-900 space-y-1">
              <p className="font-bold text-blue-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Landasan Hukum Ketenagakerjaan
              </p>
              <p className="text-neutral-700">
                Penyelenggaraan BKK berpedoman pada Peraturan Menteri Ketenagakerjaan RI Nomor 39 Tahun 2016 tentang Penempatan Tenaga Kerja. Bebas calo dan pungutan penempatan.
              </p>
            </div>
          </div>

          {/* Kolom 1: Kawasan Industri Populer */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-neutral-900 border-b border-sky-200 pb-2">
              Loker BKK Kawasan
            </h3>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <a
                  href="/lowongan?keywords=&location=Karawang"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Karawang')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Karawang (KIIC)
                </a>
              </li>
              <li>
                <a
                  href="/lowongan?keywords=&location=Cikarang"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Cikarang')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Cikarang (MM2100)
                </a>
              </li>
              <li>
                <a
                  href="/lowongan?keywords=&location=Bekasi"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Bekasi')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Bekasi (EJIP)
                </a>
              </li>
              <li>
                <a
                  href="/lowongan?keywords=&location=Tangerang"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Tangerang')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Tangerang
                </a>
              </li>
              <li>
                <a
                  href="/lowongan?keywords=&location=Surabaya"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Surabaya')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Surabaya & Gresik
                </a>
              </li>
              <li>
                <a
                  href="/lowongan?keywords=&location=Solo"
                  onClick={(e) => handleNav(e, '/lowongan?keywords=&location=Solo')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  📍 Loker BKK Solo Raya
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Posisi & Kategori Vokasi */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-neutral-900 border-b border-sky-200 pb-2">
              Kategori Pekerjaan
            </h3>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <a
                  href="/kategori/operator-produksi"
                  onClick={(e) => handleNav(e, '/kategori/operator-produksi')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Operator Produksi & Assembly
                </a>
              </li>
              <li>
                <a
                  href="/kategori/quality-control"
                  onClick={(e) => handleNav(e, '/kategori/quality-control')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Quality Control (QC) & QA
                </a>
              </li>
              <li>
                <a
                  href="/kategori/maintenance-mesin"
                  onClick={(e) => handleNav(e, '/kategori/maintenance-mesin')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Maintenance Mesin & Listrik
                </a>
              </li>
              <li>
                <a
                  href="/kategori/gudang-logistik"
                  onClick={(e) => handleNav(e, '/kategori/gudang-logistik')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Staff Gudang & Forklift
                </a>
              </li>
              <li>
                <a
                  href="/kategori/operator-cnc"
                  onClick={(e) => handleNav(e, '/kategori/operator-cnc')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Operator Bubut / CNC
                </a>
              </li>
              <li>
                <a
                  href="/kategori/magang-jepang-bkk"
                  onClick={(e) => handleNav(e, '/kategori/magang-jepang-bkk')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Magang Kerja Jepang (SO BKK)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Panduan & Informasi Portal */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-neutral-900 border-b border-sky-200 pb-2">
              Panduan & Regulasi
            </h3>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <a
                  href="/panduan-bkk/alur-rekrutmen-bkk-sekolah-resmi"
                  onClick={(e) => handleNav(e, '/panduan-bkk/alur-rekrutmen-bkk-sekolah-resmi')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Alur Rekrutmen BKK Resmi
                </a>
              </li>
              <li>
                <a
                  href="/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif"
                  onClick={(e) => handleNav(e, '/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Standar Tes Fisik Pabrik
                </a>
              </li>
              <li>
                <a
                  href="/panduan-bkk/kisi-kisi-psikotes-kraepelin-pauli-bkk"
                  onClick={(e) => handleNav(e, '/panduan-bkk/kisi-kisi-psikotes-kraepelin-pauli-bkk')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Kisi-kisi Psikotes Kraepelin
                </a>
              </li>
              <li>
                <a
                  href="/panduan-bkk/panduan-medical-check-up-mcu-bkk"
                  onClick={(e) => handleNav(e, '/panduan-bkk/panduan-medical-check-up-mcu-bkk')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Tips Medical Check Up (MCU)
                </a>
              </li>
              <li>
                <a
                  href="/tentang-kami"
                  onClick={(e) => handleNav(e, '/tentang-kami')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Tentang LOKERBKK.COM
                </a>
              </li>
              <li>
                <a
                  href="/sitemap"
                  onClick={(e) => handleNav(e, '/sitemap')}
                  className="text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  Peta Situs (Sitemap Index)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal inline links */}
        <div className="pt-6 border-t border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-700">
          <p>© {new Date().getFullYear()} LOKERBKK.COM - Hak Cipta Dilindungi. Pusat Informasi Lowongan Kerja via BKK Sekolah Seluruh Indonesia.</p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/kebijakan-privasi"
              onClick={(e) => handleNav(e, '/kebijakan-privasi')}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Kebijakan Privasi
            </a>
            <span>•</span>
            <a
              href="/syarat-ketentuan"
              onClick={(e) => handleNav(e, '/syarat-ketentuan')}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Syarat & Ketentuan
            </a>
            <span>•</span>
            <a
              href="/kontak"
              onClick={(e) => handleNav(e, '/kontak')}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Hubungi Pengelola
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
