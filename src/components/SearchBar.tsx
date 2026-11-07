import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialKeywords?: string;
  initialLocation?: string;
  onSearch: (keywords: string, location: string) => void;
  isCompact?: boolean;
}

// Pilihan paten dari API
const PILIHAN_KOTA = [
  'Bekasi',
  'Cikarang',
  'Karawang',
  'Cikampek',
  'Solo',
  'Tangerang',
  'Jakarta'
];

const PILIHAN_JENIS = [
  'Operator Produksi',
  'QC',
  'Staff',
  'Cleaning Service',
  'Operator Alat'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialKeywords = '',
  initialLocation = '',
  onSearch,
  isCompact = false
}) => {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keywords.toLowerCase(), location.toLowerCase());
  };

  const handleJenisChange = (val: string) => {
    setKeywords(val);
};

const handleKotaChange = (val: string) => {
    setLocation(val);
};

  return (
    <section
      aria-label="Form Pencarian Lowongan Kerja BKK"
      className={`w-full bg-white transition-all ${
        isCompact ? 'py-4' : 'pt-6 pb-8 border-b border-sky-100 shadow-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {!isCompact && (
          <div className="mb-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-blue-700 text-sm font-semibold mb-2 border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Pusat Karir SMK Terpercaya – Bursa Kerja Khusus (BKK) Nasional</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Cari <span className="text-blue-700 underline decoration-blue-300">Lowongan Kerja via BKK Sekolah</span>
            </h1>
            <p className="text-neutral-700 text-base mt-1.5 max-w-3xl">
              Menyalurkan tenaga kerja langsung dengan rekrutmen resmi industri manufaktur, otomotif, dan logistik se-Indonesia tanpa calo.
            </p>
          </div>
        )}

        {/* Form: 2 Dropdown + Tombol Cari */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-blue-400 p-2 sm:p-3 shadow-lg hover:border-blue-600 transition-colors"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            {/* Dropdown 1: Jenis Pekerjaan */}
            <div className="md:col-span-5 relative flex items-center px-3 py-2.5 bg-neutral-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 border border-neutral-200">
              <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
              <div className="w-full">
                <label htmlFor="search-jenis" className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  Jenis Pekerjaan
                </label>
                <select
                  id="search-jenis"
                  value={keywords}
                  onChange={(e) => handleJenisChange(e.target.value)}
                  className="w-full bg-transparent text-neutral-900 text-base font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="">Semua Jenis Pekerjaan</option>
                  {PILIHAN_JENIS.map((jenis) => (
                    <option key={jenis} value={jenis}>{jenis}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2: Kota */}
            <div className="md:col-span-4 relative flex items-center px-3 py-2.5 bg-neutral-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 border border-neutral-200">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
              <div className="w-full">
                <label htmlFor="search-kota" className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  Lokasi / Kota
                </label>
                <select
                  id="search-kota"
                  value={location}
                  onChange={(e) => handleKotaChange(e.target.value)}
                  className="w-full bg-transparent text-neutral-900 text-base font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="">Semua Kota</option>
                  {PILIHAN_KOTA.map((kota) => (
                    <option key={kota} value={kota}>{kota}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tombol Cari */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-300"
              >
                <Search className="w-5 h-5" />
                <span>Cari Lowongan</span>
                <ArrowRight className="w-4 h-4 ml-1 hidden sm:inline" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
