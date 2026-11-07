import { useState, useEffect } from "react";
import { getLowongan, getKotaList, getJenisList, type Lowongan } from "../services/lowonganApi";

export default function JobList() {
  const [lowongan, setLowongan] = useState<Lowongan[]>([]);
  const [loading, setLoading] = useState(true);
  const [kota, setKota] = useState("");
  const [jenis, setJenis] = useState("");
  const [kotaList, setKotaList] = useState<string[]>([]);
  const [jenisList, setJenisList] = useState<string[]>([]);

  useEffect(() => {
    getKotaList().then(setKotaList);
    getJenisList().then(setJenisList);
  }, []);

  useEffect(() => {
    setLoading(true);
    getLowongan(kota, jenis)
      .then((data) => setLowongan(data.lowongan))
      .finally(() => setLoading(false));
  }, [kota, jenis]);

  return (
    <div>
      {/* Filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select value={kota} onChange={(e) => setKota(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}>
          <option value="">Semua Kota</option>
          {kotaList.map((k) => (
            <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</option>
          ))}
        </select>
        <select value={jenis} onChange={(e) => setJenis(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}>
          <option value="">Semua Jenis Pekerjaan</option>
          {jenisList.map((j) => (
            <option key={j} value={j}>{j.charAt(0).toUpperCase() + j.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Memuat lowongan...</p>}

      {/* Hasil */}
      {!loading && lowongan.length === 0 && <p>Tidak ada lowongan yang cocok.</p>}

      {!loading && lowongan.length > 0 && (
        <div>
          <p style={{ color: "#666", marginBottom: "16px" }}>{lowongan.length} lowongan ditemukan</p>
          {lowongan.map((job) => (
            <div key={job.id} style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px", marginBottom: "12px", background: "#fff" }}>
              <h3 style={{ margin: "0 0 8px" }}>{job.judul}</h3>
              <p style={{ margin: "0 0 4px" }}><strong>{job.perusahaan}</strong> — {job.kota}</p>
              <p style={{ margin: "0 0 8px" }}>
                <span style={{ background: "#e8f4fd", padding: "2px 8px", borderRadius: "4px", fontSize: "13px", color: "#0066cc" }}>
                  {job.jenis_pekerjaan}
                </span>
                {" | "}{job.gaji || "Gaji tidak disebutkan"}
              </p>
              <p style={{ margin: "0 0 8px", color: "#555" }}>{job.deskripsi.substring(0, 200)}...</p>
              <a href={job.url} target="_blank" rel="noopener" style={{ color: "#0066cc", textDecoration: "none" }}>
                Lihat lowongan lengkap →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
