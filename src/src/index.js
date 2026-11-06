/**
 * lokerbkk-api Worker
 *
 * Scheduled handler (cron 5 hari sekali jam 23:00 WIB / 16:00 UTC):
 *   - Memanggil Jooble API 5 kali (1 per jenis pekerjaan), lokasi = "indonesia"
 *   - Failover 4 API key: jika key gagal (401/403/429), coba key berikutnya
 *   - Filter hasil berdasarkan 7 kota target
 *   - Simpan lowongan ke D1 database
 *
 * Fetch handler (website mengakses data):
 *   - GET /api/lowongan?kota=bekasi&jenis=qc  → filter kota & jenis pekerjaan
 *   - GET /api/lowongan                       → semua lowongan
 *   - GET /api/kota                            → daftar kota tersedia
 *   - GET /api/jenis                           → daftar jenis pekerjaan tersedia
 */

const KOTA_TARGET = [
  "bekasi", "cikarang", "karawang", "cikampek",
  "solo", "tangerang", "jakarta"
];

const JENIS_PEKERJAAN = [
  "operator produksi", "qc", "staff",
  "cleaning service", "operator alat"
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

async function callJoobleWithFailover(env, keywords, location) {
  const keys = JSON.parse(env.JOOBLE_API_KEYS);
  const body = JSON.stringify({ keywords, location });

  for (const apiKey of keys) {
    try {
      const res = await fetch(`https://jooble.org/api/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (res.status !== 401 && res.status !== 403 && res.status !== 429) {
        const data = await res.json();
        return data.jobs || [];
      }
      console.log(`Key ${apiKey.substring(0, 8)}... gagal (HTTP ${res.status}), coba key berikutnya`);
    } catch (err) {
      console.log(`Error dengan key ${apiKey.substring(0, 8)}...: ${err.message}`);
    }
  }
  console.log("Semua API key Jooble gagal");
  return [];
}

function matchKota(locationText) {
  if (!locationText) return null;
  const lower = locationText.toLowerCase();
  for (const kota of KOTA_TARGET) {
    if (lower.includes(kota)) return kota;
  }
  return null;
}

async function scheduled(controller, env, ctx) {
  console.log("Memulai pengambilan data lowongan dari Jooble...");
  await env.DB.prepare("DELETE FROM lowongan").run();
  console.log("Data lama dibersihkan");

  let totalDisimpan = 0;
  for (const jenis of JENIS_PEKERJAAN) {
    console.log(`Mencari lowongan: ${jenis}`);
    const jobs = await callJoobleWithFailover(env, jenis, "indonesia");
    console.log(`Ditemukan ${jobs.length} hasil untuk "${jenis}"`);

    const stmts = [];
    for (const job of jobs) {
      const kota = matchKota(job.location);
      if (!kota) continue;
      stmts.push(
        env.DB.prepare(
          "INSERT INTO lowongan (judul, perusahaan, kota, jenis_pekerjaan, url, gaji, deskripsi, tanggal_ambil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(
          job.title || "",
          job.company || "",
          kota,
          jenis,
          job.link || job.url || "",
          job.salary || "",
          job.snippet || job.description || "",
          new Date().toISOString()
        )
      );
    }
    if (stmts.length > 0) {
      await env.DB.batch(stmts);
      totalDisimpan += stmts.length;
      console.log(`Disimpan ${stmts.length} lowongan untuk "${jenis}"`);
    }
  }
  console.log(`Selesai! Total ${totalDisimpan} lowongan disimpan ke D1`);
}

async function fetch(request, env) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (url.pathname === "/api/kota") {
    return new Response(JSON.stringify({ kota: KOTA_TARGET }), { headers: CORS_HEADERS });
  }
  if (url.pathname === "/api/jenis") {
    return new Response(JSON.stringify({ jenis: JENIS_PEKERJAAN }), { headers: CORS_HEADERS });
  }
  if (url.pathname === "/api/lowongan") {
    const kota = url.searchParams.get("kota");
    const jenis = url.searchParams.get("jenis");
    let query = "SELECT * FROM lowongan WHERE 1=1";
    const params = [];
    if (kota) { query += " AND kota = ?"; params.push(kota.toLowerCase()); }
    if (jenis) { query += " AND jenis_pekerjaan = ?"; params.push(jenis.toLowerCase()); }
    query += " ORDER BY tanggal_ambil DESC";
    const stmt = env.DB.prepare(query);
    if (params.length > 0) stmt.bind(...params);
    const { results } = await stmt.all();
    return new Response(JSON.stringify({ total: results.length, lowongan: results }), { headers: CORS_HEADERS });
  }
  return new Response(JSON.stringify({
    status: "ok",
    endpoints: {
      "/api/lowongan?kota=bekasi&jenis=qc": "Ambil lowongan dengan filter",
      "/api/lowongan": "Ambil semua lowongan",
      "/api/kota": "Daftar kota tersedia",
      "/api/jenis": "Daftar jenis pekerjaan tersedia",
    }
  }), { headers: CORS_HEADERS });
}

export default { fetch, scheduled };
