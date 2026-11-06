import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialKeywords?: string;
  initialLocation?: string;
  onSearch: (keywords: string, location: string) => void;
  isCompact?: boolean;
}

const POPULAR_LOCATIONS = [
  'Karawang',
  'Cikarang',
  'Bekasi',
  'Tangerang',
  'Jakarta',
  'Surabaya',
  'Solo',
  'Semarang'
];

const POPULAR_ROLES = [
  'Operator Produksi',
  'Quality Control (QC)',
  'Maintenance Mesin',
  'Staff Gudang',
  'Operator CNC',
  'Magang Jepang'
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
    onSearch(keywords.trim(), location.trim());
  };

  const handleQuickKeyword = (val: string) => {
    setKeywords(val);
    onSearch(val, location.trim());
  };

  const handleQuickLocation = (val: string) => {
    setLocation(val);
    onSearch(keywords.trim(), val);
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

        {/* Form Only 2 Parameters: Jenis Pekerjaan & Lokasi */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-blue-400 p-2 sm:p-3 shadow-lg hover:border-blue-600 transition-colors"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            {/* Parameter 1: Jenis Pekerjaan / Keywords */}
            <div className="md:col-span-5 relative flex items-center px-3 py-2.5 bg-neutral-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 border border-neutral-200">
              <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
              <div className="w-full">
                <label htmlFor="search-keywords" className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  Jenis Pekerjaan / Posisi
                </label>
                <input
                  id="search-keywords"
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Contoh: Operator Produksi, QC, Maintenance..."
                  className="w-full bg-transparent text-neutral-900 text-base font-semibold focus:outline-hidden placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Parameter 2: Lokasi */}
            <div className="md:col-span-4 relative flex items-center px-3 py-2.5 bg-neutral-50 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 border border-neutral-200">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
              <div className="w-full">
                <label htmlFor="search-location" className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  Lokasi / Kawasan Industri
                </label>
                <input
                  id="search-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Karawang, Cikarang, Solo, Surabaya..."
                  className="w-full bg-transparent text-neutral-900 text-base font-semibold focus:outline-hidden placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Tombol Cari (Wajib Berwarna Biru) */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:ring-4 focus:ring-blue-300"
              >
                <Search className="w-5 h-5" />
                <span>Cari Lowongan BKK</span>
                <ArrowRight className="w-4 h-4 ml-1 hidden sm:inline" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Suggestions - All clickable in blue */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">Populer:</span>
          {POPULAR_ROLES.slice(0, 4).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleQuickKeyword(role)}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline font-semibold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 cursor-pointer transition-colors"
            >
              + {role}
            </button>
          ))}
          <span className="hidden md:inline text-neutral-300">|</span>
          <span className="hidden md:inline text-neutral-700 font-semibold text-xs sm:text-sm">Kota Industri:</span>
          {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleQuickLocation(loc)}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium bg-sky-50/70 px-2 py-0.5 rounded border border-sky-100 cursor-pointer transition-colors"
            >
              📍 {loc}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
