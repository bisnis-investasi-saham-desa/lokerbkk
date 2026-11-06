import React, { useState } from 'react';
import {
  CheckCircle,
  ShieldCheck,
  Building2,
  Award,
  ChevronDown,
  HelpCircle,
  MapPin,
  ExternalLink,
  Users,
  Compass,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

interface PillarContentProps {
  onNavigate: (href: string) => void;
}

export const PillarContent: React.FC<PillarContentProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  const FAQS = [
    {
      q: 'Apa itu BKK Sekolah dan mengapa menjadi jalur utama lowongan kerja SMK?',
      a: 'Bursa Kerja Khusus (BKK) adalah unit pelaksana penempatan tenaga kerja resmi yang dibentuk di lingkungan Sekolah Menengah Kejuruan (SMK) dan perguruan tinggi vokasi. Legalitas BKK diatur langsung melalui Peraturan Menteri Ketenagakerjaan RI (Permenaker) No. 39 Tahun 2016. BKK menjembatani lulusan kejuruan dengan ratusan mitra industri terkemuka seperti PT Astra Honda Motor, PT Denso, dan PT Epson secara transparan tanpa pungutan liar.'
    },
    {
      q: 'Apakah alumni dari sekolah lain (luar sekolah pelaksana) boleh melamar via BKK?',
      a: 'Sebagian besar BKK SMK di Indonesia, seperti BKK SMKN 1 Karawang dan BKK SMKN 1 Cikarang Selatan, membuka kuota pendaftaran baik untuk alumni internal maupun alumni luar sekolah (umum). Syarat utamanya adalah memiliki ijazah/SKL SMK atau SMA sederajat yang sesuai dengan kualifikasi jurusan yang diminta perusahaan.'
    },
    {
      q: 'Apakah pendaftaran lowongan kerja via BKK dipungut biaya?',
      a: 'Sesuai regulasi Kementerian Ketenagakerjaan, pendaftaran lowongan kerja di BKK tidak boleh memungut biaya penempatan kerja (bebas calo). Beberapa BKK sekolah hanya membebankan biaya pengganti administrasi tes (seperti fotokopi lembar soal psikotes, kartu ujian, atau sewa fasilitas aula) dengan nominal yang sangat terjangkau (umumnya Rp 15.000 - Rp 35.000), jauh berbeda dari oknum calo yayasan yang meminta jutaan rupiah.'
    },
    {
      q: 'Apa saja tahapan tes fisik yang biasa diujikan dalam seleksi BKK pabrik otomotif?',
      a: 'Tahapan tes fisik industri otomotif dan elektronik meliputi: pengukuran tinggi badan (pria min 165 cm, wanita min 155 cm), berat badan proporsional (BMI), tes buta warna menggunakan buku Ishihara 38 plates, ketahanan fisik (push up 30-40 kali dalam 1 menit, lari 12 menit / lari shuttle run), serta pemeriksaan visual tangan tidak tremor dan tubuh tidak bertato atau bertindik.'
    },
    {
      q: 'Bagaimana cara mengetahui jadwal rekrutmen terbaru BKK seluruh Indonesia?',
      a: 'Anda dapat menggunakan kolom pencarian LOKERBKK.COM di bagian atas halaman ini untuk memfilter lowongan berdasarkan lokasi kawasan industri (misal: Karawang, Cikarang, Bekasi, Surabaya) dan jenis pekerjaan vokasi yang Anda minati. Portal ini secara konsisten mengagregasi data resmi bursa kerja khusus terverifikasi.'
    }
  ];

  return (
    <article className="w-full bg-white text-neutral-900 py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation - SEO Rich */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-neutral-600">
            <li>
              <a
                href="/"
                onClick={(e) => handleLink(e, '/')}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Beranda
              </a>
            </li>
            <li>/</li>
            <li className="font-semibold text-neutral-900">
              Lowongan Kerja via BKK Sekolah Seluruh Indonesia
            </li>
          </ol>
        </nav>

        {/* Highlight Card: Legalitas & Pengantar */}
        <div className="bg-sky-50/60 rounded-2xl border border-sky-200 p-6 sm:p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Regulasi Permenaker No. 39/2016
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                Pusat Informasi Lowongan Kerja via BKK Sekolah Seluruh Indonesia
              </h2>
              <p className="text-neutral-900 text-base leading-relaxed">
                Portal resmi rujukan para lulusan SMK/SMA sederajat untuk mengakses rekrutmen tenaga kerja industri manufaktur, otomotif, farmasi, pergudangan, hingga pemagangan resmi luar negeri melalui jejaring{' '}
                <a
                  href="/bkk-sekolah"
                  onClick={(e) => handleLink(e, '/bkk-sekolah')}
                  className="text-blue-600 hover:text-blue-800 font-bold underline decoration-blue-400"
                >
                  Bursa Kerja Khusus (BKK) Sekolah
                </a>{' '}
                terakreditasi di seluruh penjuru Indonesia.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-2.5 sm:min-w-[220px]">
              <a
                href="/bkk-sekolah"
                onClick={(e) => handleLink(e, '/bkk-sekolah')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-colors text-center"
              >
                <Building2 className="w-4 h-4" />
                <span>Lihat Direktori BKK SMK</span>
              </a>
              <a
                href="/panduan-bkk"
                onClick={(e) => handleLink(e, '/panduan-bkk')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-sky-50 text-blue-700 font-bold text-sm border-2 border-blue-400 transition-colors text-center"
              >
                <Award className="w-4 h-4 text-blue-600" />
                <span>Panduan Tes Seleksi BKK</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: Mengapa Melamar via BKK Sekolah? */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
            Mengapa Melamar Pekerjaan Melalui BKK Sekolah Lebih Terjamin & Bebas Penipuan?
          </h2>
          <p className="text-base text-neutral-900 leading-relaxed">
            Dalam dunia ketenagakerjaan vokasi Indonesia, jalur{' '}
            <strong className="font-bold">lowongan kerja via BKK sekolah</strong> diakui oleh Kementerian Ketenagakerjaan (Kemnaker) dan Kementerian Pendidikan Dasar dan Menengah sebagai jalur penempatan kerja paling aman, transparan, dan berdaya serap tinggi. Berbeda dengan agen penyalur tenaga kerja tak berizin atau yayasan komersial yang marak membebankan biaya puluhan juta rupiah, BKK sekolah didirikan dengan misi pengabdian pendidikan untuk menyalurkan tamatan kejuruan langsung ke dunia usaha dan dunia industri (DUDI).
          </p>
          <p className="text-base text-neutral-900 leading-relaxed">
            Setiap perusahaan manufaktur berskala multinasional seperti Astra Group, Yamaha, Denso, Epson, dan Toyota memiliki nota kesepahaman (MoU) kemitraan langsung dengan pengelola BKK sekolah. Proses rekrutmen—mulai dari verifikasi berkas, tes psikotes, hingga wawancara HRD—diselenggarakan langsung di lingkungan sekolah kejuruan dengan pengawasan guru dan dinas terkait.
          </p>

          {/* Tabel Perbandingan BKK vs Yayasan Calo */}
          <div className="overflow-x-auto my-6 border border-neutral-200 rounded-xl shadow-xs">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-sky-100/70 border-b border-sky-200 text-neutral-900">
                  <th className="p-3.5 font-bold">Parameter Penilaian</th>
                  <th className="p-3.5 font-bold text-blue-800">Bursa Kerja Khusus (BKK) Sekolah</th>
                  <th className="p-3.5 font-bold text-neutral-600">Yayasan / Penyalur Swasta Liar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-900">
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-semibold">Dasar Hukum & Izin</td>
                  <td className="p-3.5 text-blue-700 font-semibold">Resmi Permenaker RI No. 39 Tahun 2016</td>
                  <td className="p-3.5 text-red-600 font-medium">Banyak yang tidak berizin / fiktif</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-semibold">Biaya Penempatan</td>
                  <td className="p-3.5 text-blue-700 font-semibold">Gratis / Hanya biaya administrasi tes berkisar puluhan ribu</td>
                  <td className="p-3.5 text-red-600 font-medium">Meminta jaminan jutaan hingga belasan juta rupiah</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-semibold">Kepastian Tes & HRD</td>
                  <td className="p-3.5 text-blue-700 font-semibold">Penguji datang langsung dari tim HRD resmi industri</td>
                  <td className="p-3.5 text-red-600 font-medium">Tes formalitas tanpa kejelasan surat penempatan</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-3.5 font-semibold">Status Perjanjian Kerja</td>
                  <td className="p-3.5 text-blue-700 font-semibold">Kontrak PKWT langsung di PT atau vendor rekanan resmi</td>
                  <td className="p-3.5 text-red-600 font-medium">Sistem potong gaji sepihak (pinalti ijazah)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Alur Lengkap Rekrutmen */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
            Alur 6 Tahap Rekrutmen Kerja via BKK Sekolah dari Awal Hingga Kontrak
          </h2>
          <p className="text-base text-neutral-900 leading-relaxed">
            Bagi alumni baru yang ingin mengikuti rekrutmen kerja melalui BKK, sangat penting memahami tahapan seleksi terstruktur agar persiapan yang dilakukan lebih terarah. Anda juga dapat mempelajari detilnya di halaman{' '}
            <a
              href="/panduan-bkk/alur-rekrutmen-bkk-sekolah-resmi"
              onClick={(e) => handleLink(e, '/panduan-bkk/alur-rekrutmen-bkk-sekolah-resmi')}
              className="text-blue-600 hover:text-blue-800 font-bold underline"
            >
              Panduan Lengkap Alur Rekrutmen BKK
            </a>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                1
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Pendaftaran & Seleksi Berkas</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Pengumpulan berkas meliputi formulir BKK, legalisir ijazah, fotokopi KTP, KK, SKCK kepolisian aktif, dan surat keterangan sehat dari dokter.
              </p>
            </div>

            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                2
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Pengukuran Fisik & Bebas Buta Warna</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Pemeriksaan tinggi badan dengan batas toleransi ketat, uji ketajaman penglihatan warna (buku Ishihara), serta cek bebas tindik dan tato.
              </p>
            </div>

            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                3
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Psikotes Kraepelin & Matematika Dasar</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Tes hitung cepat angka koran untuk mengukur ketahanan stres, stabilitas kerja, dan daya konsentrasi di lini manufaktur.
              </p>
            </div>

            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                4
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Wawancara User & HRD Perusahaan</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Pengecekan motivasi kerja, pemahaman kejuruan SMK, kesiapan sistem kerja shift 1, 2, dan 3, serta attitude kepribadian.
              </p>
            </div>

            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                5
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Medical Check Up (MCU) Klinik</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Pemeriksaan laboratorium menyeluruh: rontgen paru-paru (Thorax), tes darah, urine bebas narkoba, audiometri, dan tekanan darah.
              </p>
            </div>

            <div className="border border-sky-200 rounded-xl p-5 bg-white shadow-xs hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg mb-3">
                6
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Tanda Tangan Kontrak PKWT</h3>
              <p className="text-sm text-neutral-900 leading-relaxed">
                Penjelasan hak gaji sesuai UMK Karawang/Bekasi, lembur normatif, fasilitas BPJS Kesehatan & Ketenagakerjaan, serta penempatan mess.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Kategori Pekerjaan & Jurusan Vokasi */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
            Peluang Karir Berdasarkan Jurusan SMK & Posisi Lowongan Kerja Populer
          </h2>
          <p className="text-base text-neutral-900 leading-relaxed">
            Industri manufaktur Indonesia menyerap puluhan ribu tenaga kerja vokasi setiap kuartal. Berikut adalah bidang kerja yang paling banyak dibuka rekrutmennya melalui BKK sekolah:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/operator-produksi"
                  onClick={(e) => handleLink(e, '/kategori/operator-produksi')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Operator Produksi & Assembly</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Paling banyak dicari di pabrik otomotif Cikarang & Karawang. Cocok untuk semua jurusan SMK/SMA.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/quality-control"
                  onClick={(e) => handleLink(e, '/kategori/quality-control')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Quality Control (QC) & Inspeksi</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Pengukuran presisi menggunakan jangka sorong, dial indicator, dan mikrometer digital.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/maintenance-mesin"
                  onClick={(e) => handleLink(e, '/kategori/maintenance-mesin')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Maintenance Mesin & Mekatronika</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Perawatan sistem kelistrikan, panel PLC, hidrolik, dan permesinan presisi CNC industri.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/gudang-logistik"
                  onClick={(e) => handleLink(e, '/kategori/gudang-logistik')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Staff Gudang & Logistik</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Pengelolaan stok suku cadang, picking, packing, sorting, dan operator forklift SIO Kemnaker.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/operator-cnc"
                  onClick={(e) => handleLink(e, '/kategori/operator-cnc')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Operator Bubut & Milling CNC</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Fabrikasi logam cetakan mould & dies berakurasi mikro untuk industri komponen presisi.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                <a
                  href="/kategori/magang-jepang-bkk"
                  onClick={(e) => handleLink(e, '/kategori/magang-jepang-bkk')}
                  className="text-blue-600 hover:text-blue-800 underline flex items-center justify-between"
                >
                  <span>Program Magang Kerja Jepang</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-sm text-neutral-700">
                Ginou Jisshusei resmi jalur Sending Organization (SO) BKK bekerjasama dengan Kemnaker RI.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Direktori BKK Terpopuler */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-l-4 border-blue-600 pl-3">
            Pusat Rekrutmen BKK Sekolah Unggulan di Kawasan Industri Nasional
          </h2>
          <p className="text-base text-neutral-900 leading-relaxed">
            Berbagai sekolah kejuruan di Indonesia telah membuktikan kapasitasnya sebagai pusat rekrutmen massal. Di antaranya adalah{' '}
            <a
              href="/bkk-sekolah/bkk-smkn-1-karawang"
              onClick={(e) => handleLink(e, '/bkk-sekolah/bkk-smkn-1-karawang')}
              className="text-blue-600 hover:text-blue-800 font-bold underline"
            >
              BKK SMKN 1 Karawang
            </a>{' '}
            yang berdekatan langsung dengan Kawasan Industri KIIC & Surya Cipta,{' '}
            <a
              href="/bkk-sekolah/bkk-smkn-1-cikarang-selatan"
              onClick={(e) => handleLink(e, '/bkk-sekolah/bkk-smkn-1-cikarang-selatan')}
              className="text-blue-600 hover:text-blue-800 font-bold underline"
            >
              BKK SMKN 1 Cikarang Selatan
            </a>{' '}
            di episentrum Kawasan EJIP & MM2100, serta{' '}
            <a
              href="/bkk-sekolah/bkk-smkn-2-surakarta"
              onClick={(e) => handleLink(e, '/bkk-sekolah/bkk-smkn-2-surakarta')}
              className="text-blue-600 hover:text-blue-800 font-bold underline"
            >
              BKK SMKN 2 Surakarta
            </a>{' '}
            dan{' '}
            <a
              href="/bkk-sekolah/bkk-smkn-2-pengasih"
              onClick={(e) => handleLink(e, '/bkk-sekolah/bkk-smkn-2-pengasih')}
              className="text-blue-600 hover:text-blue-800 font-bold underline"
            >
              BKK SMKN 2 Pengasih Kulon Progo
            </a>{' '}
            yang menjadi magnet rekrutmen ribuan alumni di Jawa Tengah dan D.I. Yogyakarta.
          </p>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div>
              <p className="font-bold text-neutral-900 text-base">
                Ingin mencari info jadwal tes BKK sekolah di kota Anda?
              </p>
              <p className="text-sm text-neutral-700">
                Gunakan fitur pencarian di bagian atas atau jelajahi direktori BKK lengkap kami.
              </p>
            </div>
            <a
              href="/bkk-sekolah"
              onClick={(e) => handleLink(e, '/bkk-sekolah')}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shrink-0 flex items-center gap-1.5 shadow-xs"
            >
              <span>Buka Direktori Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* SECTION 5: FAQ Accordion dengan Schema SEO */}
        <section className="mb-10 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Pertanyaan yang Sering Diajukan (FAQ BKK Sekolah)
            </h2>
          </div>
          <p className="text-base text-neutral-900">
            Berikut jawaban informatif atas pertanyaan krusial yang paling sering ditanyakan oleh calon pelamar lowongan kerja via BKK sekolah:
          </p>

          <div className="space-y-3 mt-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-base text-neutral-900 hover:bg-sky-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-neutral-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-neutral-900 text-base leading-relaxed border-t border-neutral-100 bg-sky-50/20">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Bottom */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-sky-700 p-8 text-white text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Siap Mengikuti Rekrutmen Kerja Resmi via BKK Sekolah?
          </h3>
          <p className="text-sky-100 text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            Mulai langkah sukses karir industri Anda hari ini. Gunakan kolom pencarian 2 parameter di bagian paling atas halaman untuk menemukan posisi dan lokasi pabrik impian Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const inputEl = document.getElementById('search-keywords');
              if (inputEl) inputEl.focus();
            }}
            className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-base hover:bg-sky-50 transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <span>Mulai Pencarian Lowongan Sekarang</span>
            <ArrowRight className="w-5 h-5 text-blue-700" />
          </button>
        </div>
      </div>
    </article>
  );
};
