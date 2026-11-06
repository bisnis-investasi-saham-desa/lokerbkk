CREATE TABLE IF NOT EXISTS lowongan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  perusahaan TEXT,
  kota TEXT NOT NULL,
  jenis_pekerjaan TEXT NOT NULL,
  url TEXT,
  gaji TEXT,
  deskripsi TEXT,
  tanggal_ambil TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lowongan_kota ON lowongan (kota);
CREATE INDEX IF NOT EXISTS idx_lowongan_jenis ON lowongan (jenis_pekerjaan);
CREATE INDEX IF NOT EXISTS idx_lowongan_kota_jenis ON lowongan (kota, jenis_pekerjaan);
