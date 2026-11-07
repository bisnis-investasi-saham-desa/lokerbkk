import { useState, useEffect } from "react";
import { getLowongan, type Lowongan } from "../services/lowonganApi";

interface JobListProps {
  kota: string;
  jenis: string;
}

export default function JobList({ kota, jenis }: JobListProps) {
  const [lowongan, setLowongan] = useState<Lowongan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLowongan(kota, jenis)
      .then((data) => setLowongan(data.lowongan))
      .finally(() => setLoading(false));
  }, [kota, jenis]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Loading */}
      {loading && (
        <p className="text-neutral-600 text-center py-8">Memuat lowongan...</p>
      )}

      {/* Kosong */}
      {!loading && lowongan.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500 text-lg">Tidak ada lowongan yang cocok.</p>
          <p className="text-neutral-400 text-sm mt-1">Coba pilih kota atau jenis pekerjaan lain.</p>
        </div>
      )}

      {/* Hasil */}
      {!loading && lowongan.length > 0 && (
        <div>
          <p className="text-neutral-600 mb-4 font-semibold">
            {lowongan.length} lowongan ditemukan
            {kota && ` di ${kota.charAt(0).toUpperCase() + kota.slice(1)}`}
            {jenis && ` — ${jenis.charAt(0).toUpperCase() + jenis.slice(1)}`}
          </p>
          <div className="grid gap-3">
            {lowongan.map((job) => (
              <div
                key={job.id}
                className="border border-neutral-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{job.judul}</h3>
                    <p className="text-neutral-700 text-sm mb-2">
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
                    <p className="text-neutral-500 text-sm line-clamp-3">{job.deskripsi}</p>
                  </div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener"
                    className="shrink-0 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap mt-2 sm:mt-0"
                  >
                    Lihat lowongan →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
