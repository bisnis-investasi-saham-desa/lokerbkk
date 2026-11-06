import React from 'react';
import { BKK_SCHOOLS } from '../data/bkkData';
import { BKKSchool } from '../types';
import {
  Building2,
  MapPin,
  Phone,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Briefcase
} from 'lucide-react';

interface BkkDirectoryProps {
  onNavigate: (href: string) => void;
  selectedSchoolSlug?: string;
  onSearchSchoolJobs: (schoolName: string, city: string) => void;
}

export const BkkDirectory: React.FC<BkkDirectoryProps> = ({
  onNavigate,
  selectedSchoolSlug,
  onSearchSchoolJobs
}) => {
  const selectedSchool = selectedSchoolSlug
    ? BKK_SCHOOLS.find((s) => s.slug === selectedSchoolSlug)
    : null;

  return (
    <div className="w-full bg-white text-neutral-900 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
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
            <li>
              <a
                href="/bkk-sekolah"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/bkk-sekolah');
                }}
                className={`hover:underline ${
                  selectedSchool ? 'text-blue-600' : 'font-semibold text-neutral-900'
                }`}
              >
                Direktori BKK SMK Seluruh Indonesia
              </a>
            </li>
            {selectedSchool && (
              <>
                <li>/</li>
                <li className="font-semibold text-neutral-900 truncate">
                  {selectedSchool.name}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Selected School Detail View */}
        {selectedSchool ? (
          <article className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-sky-50 border border-sky-200">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Terverifikasi Dinas Ketenagakerjaan
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                    {selectedSchool.name}
                  </h1>
                  <p className="text-base text-neutral-900 leading-relaxed max-w-3xl">
                    {selectedSchool.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
                    <p className="flex items-center gap-2 text-neutral-900">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{selectedSchool.address} ({selectedSchool.city}, {selectedSchool.province})</span>
                    </p>
                    <p className="flex items-center gap-2 text-neutral-900">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{selectedSchool.phone} • Kontak: {selectedSchool.contactPerson}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSearchSchoolJobs(selectedSchool.name, selectedSchool.city)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Lihat Lowongan di BKK Ini</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Industrial Partners */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
              <h2 className="text-xl font-extrabold text-neutral-900 mb-4 border-l-4 border-blue-600 pl-3">
                Daftar Perusahaan Industri Mitra Rekrutmen
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {selectedSchool.industryPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/50 text-sm font-bold text-neutral-900 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ) : (
          /* Directory List View */
          <div>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                Direktori Resmi <span className="text-blue-700 underline decoration-blue-300">Bursa Kerja Khusus (BKK) SMK</span>
              </h1>
              <p className="text-base text-neutral-700 mt-2 max-w-3xl">
                Daftar BKK sekolah kejuruan terakreditasi dan berizin resmi dari Dinas Ketenagakerjaan di berbagai pusat kawasan industri Indonesia. Klik sekolah untuk melihat rincian mitra industri dan info lowongan kerja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BKK_SCHOOLS.map((school) => (
                <article
                  key={school.id}
                  className="p-5 sm:p-6 rounded-2xl border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                        NPSN: {school.npsn}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {school.activeRecruitmentsCount} Rekrutmen Aktif
                      </span>
                    </div>

                    <h2 className="text-xl font-bold">
                      <a
                        href={`/bkk-sekolah/${school.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/bkk-sekolah/${school.slug}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {school.name}
                      </a>
                    </h2>

                    <p className="text-sm text-neutral-900 line-clamp-2">
                      {school.description}
                    </p>

                    <div className="space-y-1 text-xs text-neutral-600 pt-1">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{school.city}, {school.province}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">Mitra: {school.industryPartners.join(', ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                    <a
                      href={`/bkk-sekolah/${school.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/bkk-sekolah/${school.slug}`);
                      }}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Profil BKK</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onSearchSchoolJobs(school.name, school.city)}
                      className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      Cari Loker BKK Ini
                    </button>
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
