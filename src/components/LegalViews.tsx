import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';

interface LegalProps {
  onNavigate: (href: string) => void;
}

export const PrivacyView: React.FC<LegalProps> = ({ onNavigate }) => (
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
          <li className="font-semibold text-neutral-900">Kebijakan Privasi</li>
        </ol>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900">
          Kebijakan Privasi <span className="text-blue-600">LOKERBKK.COM</span>
        </h1>
        <p className="text-sm text-neutral-600">Terakhir diperbarui: 05 November 2026</p>
      </header>

      <div className="space-y-4 text-base text-neutral-900 leading-relaxed">
        <p>
          Selamat datang di LOKERBKK.COM. Kami sangat menghargai privasi data pribadi setiap pengunjung dan pelamar kerja lulusan SMK/SMA yang menggunakan platform kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
        </p>
        <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">1. Informasi yang Kami Kumpulkan</h2>
        <p>
          LOKERBKK.COM tidak memungut atau menjual data pribadi Anda. Kata kunci pencarian dan lokasi yang Anda masukkan digunakan secara langsung untuk memanggil API lowongan kerja Jooble dan basis data BKK tanpa menyimpan profil identitas sensitif tanpa persetujuan Anda.
        </p>
        <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">2. Penyimpanan Kunci API Pengguna</h2>
        <p>
          Kunci API Jooble yang Anda masukkan melalui panel konfigurasi disimpan secara eksklusif pada penyimpanan lokal peramban (localStorage) perangkat Anda sendiri dan tidak pernah dikirimkan ke server pihak ketiga manapun selain server resmi Jooble.
        </p>
        <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">3. Tautan Pihak Ketiga</h2>
        <p>
          Platform ini menyediakan tautan resmi ke portal BKK sekolah dan laman rekrutmen mitra industri. Kami menyarankan Anda membaca kebijakan privasi masing-masing situs tujuan saat menyerahkan berkas lamaran kerja.
        </p>
      </div>
    </div>
  </div>
);

export const TermsView: React.FC<LegalProps> = ({ onNavigate }) => (
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
          <li className="font-semibold text-neutral-900">Syarat & Ketentuan</li>
        </ol>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900">
          Syarat & Ketentuan Penggunaan <span className="text-blue-600">LOKERBKK.COM</span>
        </h1>
        <p className="text-sm text-neutral-600">Berlaku efektif sejak: 01 November 2026</p>
      </header>

      <div className="space-y-4 text-base text-neutral-900 leading-relaxed">
        <p>
          Dengan mengakses atau menggunakan portal LOKERBKK.COM, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui bagian mana pun, Anda dipersilakan untuk tidak melanjutkan penggunaan situs.
        </p>
        <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">1. Penyelenggaraan Bursa Kerja Khusus</h2>
        <p>
          Semua informasi bursa kerja khusus yang ditampilkan merujuk pada regulasi resmi Kementerian Ketenagakerjaan RI (Permenaker No. 39 Tahun 2016). Kami secara tegas melarang segala bentuk percaloan, penipuan, atau pemungutan biaya liar yang mengatasnamakan BKK sekolah atau LOKERBKK.COM.
        </p>
        <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">2. Keakuratan Data Lowongan</h2>
        <p>
          Kami berupaya keras memastikan setiap lowongan diverifikasi dari BKK sekolah atau API resmi Jooble. Namun demikian, pelamar diwajibkan untuk selalu memverifikasi ulang jadwal tes fisik, syarat ijazah, dan lokasi wawancara melalui pengumuman resmi sekolah penyelenggara.
        </p>
      </div>
    </div>
  </div>
);

export const ContactView: React.FC<LegalProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', school: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <li className="font-semibold text-neutral-900">Hubungi Kami</li>
          </ol>
        </nav>

        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold text-neutral-900">
            Hubungi Pengelola <span className="text-blue-600">LOKERBKK.COM</span>
          </h1>
          <p className="text-base text-neutral-700">
            Pusat koordinasi rekrutmen BKK SMK, pendaftaran kemitraan sekolah kejuruan baru, serta pelaporan indikasi calo atau penipuan.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
              <h2 className="font-bold text-lg text-blue-950">Sekretariat Hubungan Industri</h2>
              <p className="text-sm text-neutral-900 leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Pusat Layanan Karir Vokasi, Kawasan Industri KIIC - Karawang, Jawa Barat</span>
              </p>
              <p className="text-sm text-neutral-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-mono text-xs">admin@lokerbkk.com</span>
              </p>
              <p className="text-sm text-neutral-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>+62 821-4455-7788 (Jam Kerja 08.00 - 16.00 WIB)</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1">
              <p className="font-bold text-neutral-900">Ingin Mendaftarkan BKK SMK Anda?</p>
              <p>
                Kirimkan surat keputusan (SK) pendirian BKK dari Disnaker dan daftar industri mitra sekolah Anda melalui formulir di samping.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-950">Pesan Anda Telah Terkirim!</h3>
                <p className="text-sm text-emerald-800">
                  Terima kasih telah menghubungi LOKERBKK.COM. Tim kami akan meninjau dan merespons via email dalam waktu 1x24 jam.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-4 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-500 focus:outline-hidden"
                    placeholder="Contoh: Rian Pratama, S.Pd"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Email Aktif</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-500 focus:outline-hidden"
                    placeholder="nama@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Instansi / Asal Sekolah SMK</label>
                  <input
                    type="text"
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-500 focus:outline-hidden"
                    placeholder="Contoh: BKK SMKN 1 Karawang"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Pesan / Keperluan</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:border-blue-500 focus:outline-hidden"
                    placeholder="Tuliskan pertanyaan, kemitraan BKK, atau konfirmasi info rekrutmen..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Pengelola</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
