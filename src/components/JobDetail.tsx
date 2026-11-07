import React, { useEffect } from 'react';
import { Lowongan } from '../services/lowonganApi';
import { updatePageSeo } from '../hooks/useRouter';
import {
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Clock,
  DollarSign,
  Share2,
  ArrowLeft,
  GraduationCap,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface JobDetailProps {
  job: Lowongan;
  allJobs: Lowongan[];
  onBack: () => void;
  onNavigate: (href: string) => void;
}

export const JobDetail: React.FC<JobDetailProps> = ({
  job,
  allJobs,
  onBack,
  onNavigate
}) => {
  useEffect(() => {
    const jobPostingSchema = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: job.judul,
      description: job.deskripsi,
      identifier: {
        '@type': 'PropertyValue',
        name: job.perusahaan,
        value: job.id
      },
      datePosted: job.tanggal_ambil || new Date().toISOString(),
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: job.perusahaan,
        sameAs: 'https://lokerbkk.com'
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.kota,
          addressCountry: 'ID'
        }
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'IDR',
        value: {
          '@type': 'QuantitativeValue',
          value: 5200000,
          unitText: 'MONTH'
        }
      }
    };

    updatePageSeo(
      `${job.judul} - ${job.perusahaan} | LOKERBKK.COM`,
      `Lowongan kerja ${job.judul} di ${job.perusahaan} (${job.kota}) via BKK sekolah resmi. Pendaftaran terbuka untuk lulusan SMK/SMA sederajat.`,
      `/lowongan/${job.id}`,
      jobPostingSchema
    );
  }, [job]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.judul} - ${job.perusahaan}`,
        text: `Info lowongan kerja via BKK Sekolah: ${job.judul} di ${job.perusahaan}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan lowongan telah disalin ke papan klip!');
    }
  };

  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="w-full bg-white text-neutral-900 py-6 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
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
              <button
                type="button"
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
              >
                Lowongan Kerja
              </button>
            </li>
            <li>/</li>
            <li className="font-semibold text-neutral-900 truncate max-w-xs">
              {job.judul}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mb-6 cursor-pointer hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Hasil Pencarian Lowongan</span>
        </button>

        {/* Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-sky-100 bg-sky-50/40 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Rekrutmen Resmi BKK Sekolah
                </span>
                <span className="text-xs font-semibold text-neutral-700 bg-white px-3 py-1 rounded-full border border-sky-200">
                  ID Lowongan: #{job.id}
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  {job.jenis_pekerjaan.charAt(0).toUpperCase() + job.jenis_pekerjaan.slice(1)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {job.judul}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm sm:text-base font-semibold text-neutral-900">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  {job.perusahaan}
                </span>
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {job.kota.charAt(0).toUpperCase() + job.kota.slice(1)}
                </span>
                {job.gaji && (
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-lg border border-emerald-300 font-bold">
                    <DollarSign className="w-4 h-4" />
                    {job.gaji}
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const targetEl = document.getElementById('alur-pendaftaran');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-md cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <span>Lamar Sekarang via BKK</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-blue-700 font-bold text-sm border border-blue-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Bagikan Info Lowongan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid: 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Deskripsi Pekerjaan */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
                Deskripsi Pekerjaan & Tanggung Jawab
              </h2>
              <p className="text-base text-neutral-900 leading-relaxed whitespace-pre-line">
                {job.deskripsi}
              </p>
              <p className="text-base text-neutral-900 leading-relaxed">
                Kandidat yang lolos seleksi bursa kerja khusus ini akan ditempatkan di lini produksi atau divisi pendukung dengan sistem kerja shift bergilir (pagi, sore, malam), didukung dengan pelatihan Standar Operasional Prosedur (SOP) dan Keselamatan & Kesehatan Kerja (K3) berstandar internasional.
              </p>
            </section>

            {/* Tahapan Seleksi */}
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
                Tahapan Seleksi Rekrutmen BKK
              </h2>
              <div className="space-y-2.5 mt-3">
                {[
                  'Seleksi Administrasi & Verifikasi Ijazah Asli',
                  'Pengukuran Fisik & Tes Buta Warna Ishihara',
                  'Psikotes Kraepelin / Pauli & Matematika Dasar',
                  'Interview User & HRD Perusahaan',
                  'Medical Check Up (MCU) di Klinik Mitra Resmi',
                  'Tanda Tangan Kontrak Kerja PKWT'
                ].map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-neutral-200 bg-white flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-neutral-900 text-base">{stage}</p>
                      <p className="text-sm text-neutral-600">
                        {idx === 1 && (
                          <span>
                            Lihat panduan lolos:{' '}
                            <a
                              href="/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate('/panduan-bkk/rahasia-lolos-tes-fisik-smk-pt-otomotif');
                              }}
                              className="text-blue-600 hover:text-blue-800 underline font-semibold"
                            >
                              Tips Tes Fisik Pabrik Otomotif
                            </a>
                          </span>
                        )}
                        {idx === 2 && (
                          <span>
                            Kisi-kisi psikotes:{' '}
                            <a
                              href="/panduan-bkk/kisi-kisi-psikotes-kraepelin-pauli-bkk"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate('/panduan-bkk/kisi-kisi-psikotes-kraepelin-pauli-bkk');
                              }}
                              className="text-blue-600 hover:text-blue-800 underline font-semibold"
                            >
                              Trik Menstabilkan Grafik Tes Koran Kraepelin
                            </a>
                          </span>
                        )}
                        {idx === 4 && (
                          <span>
                            Persiapan kesehatan:{' '}
                            <a
                              href="/panduan-bkk/panduan-medical-check-up-mcu-bkk"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate('/panduan-bkk/panduan-medical-check-up-mcu-bkk');
                              }}
                              className="text-blue-600 hover:text-blue-800 underline font-semibold"
                            >
                              Tips Lolos MCU & Rontgen Thorax
                            </a>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Alur Pendaftaran */}
            <section id="alur-pendaftaran" className="p-6 rounded-2xl bg-sky-50 border border-sky-200 space-y-4">
              <h2 className="text-xl font-extrabold text-blue-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Cara Pendaftaran & Penyerahan Berkas
              </h2>
              <div className="space-y-3 text-base text-neutral-900 leading-relaxed">
                <p>
                  1. Siapkan berkas lamaran lengkap berupa fotokopi Ijazah / Surat Keterangan Lulus (SKL), KTP, Kartu Keluarga, SKCK aktif, dan pas foto 3x4 berwarna (2 lembar).
                </p>
                <p>
                  2. Kunjungi sekretariat BKK di sekolah penyelenggara atau isi formulir online pendaftaran bursa kerja khusus.
                </p>
                <p>
                  3. Ikuti jadwal tes fisik dan psikotes yang diumumkan melalui pengumuman resmi madding BKK sekolah.
                </p>
              </div>

              {job.url && (
                <div className="pt-2">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm"
                  >
                    <span>Buka Tautan Eksternal Mitra</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-neutral-900 border-b border-neutral-200 pb-3">
                Kualifikasi & Persyaratan Fisik
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Pendidikan Minimal</span>
                  <span className="font-bold text-neutral-900 text-base">SMK / SMA Sederajat</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Jenis Pekerjaan</span>
                  <span className="font-bold text-blue-700 text-base">
                    {job.jenis_pekerjaan.charAt(0).toUpperCase() + job.jenis_pekerjaan.slice(1)}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Jenis Kelamin</span>
                  <span className="font-bold text-neutral-900 text-base">Pria / Wanita</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Standar Tinggi Badan</span>
                  <span className="font-bold text-neutral-900 text-base">
                    Pria min. 165 cm / Wanita min. 155 cm
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Syarat Penglihatan</span>
                  <span className="font-bold text-red-600 text-base">Wajib Tidak Buta Warna (Parsial/Total)</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-neutral-500 uppercase">Ketentuan Fisik Lain</span>
                  <span className="font-medium text-neutral-900">Tidak bertindik (pria), tidak bertato, dan tidak ada bekas patah tulang aktif.</span>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            <div className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-3">
              <h3 className="font-extrabold text-base text-neutral-900">
                Lowongan BKK Terkait
              </h3>
              <div className="space-y-3">
                {relatedJobs.map((rj) => (
                  <div key={rj.id} className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                    <a
                      href={`/lowongan/${rj.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/lowongan/${rj.id}`);
                      }}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline block"
                    >
                      {rj.judul}
                    </a>
                    <span className="text-xs text-neutral-600 block mt-0.5">
                      {rj.perusahaan} • {rj.kota.charAt(0).toUpperCase() + rj.kota.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
