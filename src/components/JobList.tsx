import { useState, useEffect } from "react";
import type { Lowongan } from "../services/lowonganApi";
import { getLowongan } from "../services/lowonganApi";

interface JobListProps {
  lowongan: Lowongan[];
  isLoading: boolean;
  onSelectJob: (job: Lowongan) => void;
  onNavigate: (path: string) => void;
  limit?: number;
  showViewAll?: boolean;
}

export function JobList({ lowongan, isLoading, onSelectJob, onNavigate, limit, showViewAll }: JobListProps) {
  const [fallback, setFallback] = useState<Lowongan[]>([]);
  const [loadingFallback, setLoadingFallback] = useState(false);

  const handleClick = (job: Lowongan) => {
    onSelectJob(job);
    onNavigate(`/lowongan/${job.id}`);
  };

  const displayLowongan = limit ? lowongan.slice(0, limit) : lowongan;

  useEffect(() => {
    if (!isLoading && displayLowongan.length === 0) {
      setLoadingFallback(true);
      getLowongan("", "")
        .then((data) => setFallback((data.lowongan || []).slice(0, 12)))
        .finally(() => setLoadingFallback(false));
    }
  }, [isLoading, displayLowongan.length]);

  const renderCard = (job: Lowongan) => (
    <div
      key={job.id}
      onClick={() => handleClick(job)}
      className="border border-neutral-200 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-300 transition-all cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-neutral-900 mb-1 break-words">{job.judul}</h3>
          <p className="text-neutral-700 text-sm mb-2 break-words">
            <strong>{job.perusahaan}</strong> — {job.kota.charAt(0).toUpperCase() + job.kota.slice(1)}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-sky-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-sky-200">
              {job.jenis_pekerjaan.charAt(0).toUpperCase() + job.jenis_pekerjaan.slice(1)}
            </span>
            {job.gaji && (
              <span className="text-neutral-600 text-sm">{job.gaji}</span>
            )}
          </div>
          <p className="text-neutral-500 text-sm line-clamp-2 break-words">{job.deskripsi}</p>
        </div>
        <a
          href={job.url}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap mt-2 sm:mt-0"
        >
          Lihat lowongan →
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {isLoading && (
        <p className="text-neutral-600 text-center py-8">Memuat lowongan...</p>
      )}

      {!isLoading && displayLowongan.length === 0 && (
        <div>
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">Tidak ada lowongan yang cocok.</p>
            <p className="text-neutral-400 text-sm mt-1">
              Coba pilih kota atau jenis pekerjaan lain. Atau silahkan coba lamar lowongan lain dibawah ini :
            </p>
          </div>

          {loadingFallback && (
            <p className="text-neutral-500 text-center py-4">Memuat lowongan lain...</p>
          )}

          {!loadingFallback && fallback.length > 0 && (
            <div className="grid gap-3">
              {fallback.map(renderCard)}
            </div>
          )}
        </div>
      )}

      {!isLoading && displayLowongan.length > 0 && (
        <div>
          <p className="text-neutral-600 mb-4 font-semibold">
            Lowongan Kerja Untuk Anda
          </p>
          <div className="grid gap-3">
            {displayLowongan.map(renderCard)}
          </div>

          {showViewAll && limit && lowongan.length > limit && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => onNavigate("/lowongan?keywords=&location=")}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md cursor-pointer transition-colors"
              >
                Lihat Semua Lowongan ({lowongan.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
