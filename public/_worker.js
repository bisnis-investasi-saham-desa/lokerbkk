export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    const isBot = /googlebot|bingbot|slurp|duckduckbot/i.test(ua);
    const API = "https://kemenaker.lokerbkk.com";

    if (isBot && url.pathname === "/lowongan") {
      const jenis = (url.searchParams.get("keywords") || "").toLowerCase();
      const kota = (url.searchParams.get("location") || "").toLowerCase();
      try {
        const q = new URLSearchParams();
        if (kota) q.set("kota", kota);
        if (jenis) q.set("jenis", jenis);
        const res = await fetch(API + "/api/lowongan?" + q.toString());
        const data = await res.json();
        const jobs = data.lowongan || [];
        const J = jenis ? jenis.charAt(0).toUpperCase()+jenis.slice(1) : "Kerja";
        const K = kota ? "di "+kota.charAt(0).toUpperCase()+kota.slice(1) : "Seluruh Indonesia";
        const judul = `Lowongan ${J} ${K} Terbaru | LOKERBKK.COM`;
        const h1 = `Lowongan ${J} ${K}`;
        const listHtml = jobs.slice(0, 50).map(j => `<article><h2><a href="https://www.lokerbkk.com/lowongan/${j.id}">${j.judul}</a></h2><p>${j.perusahaan} — ${j.kota}</p><p>${j.gaji || ""}</p></article>`).join("");
        const html = `<!doctype html><html lang="id"><head><meta charset="UTF-8">
<title>${judul}</title>
<meta name="description" content="Daftar lowongan ${jenis||"kerja"} ${kota?"di "+kota:""} terbaru via BKK sekolah resmi. ${jobs.length} lowongan tersedia, update setiap 3 hari.">
<link rel="canonical" href="https://www.lokerbkk.com/lowongan?keywords=${encodeURIComponent(jenis)}&location=${encodeURIComponent(kota)}">
</head><body><h1>${h1}</h1>
<p>Temukan lowongan ${jenis||"kerja"} terbaru ${kota?"di "+kota:""} melalui BKK sekolah resmi. Saat ini tersedia ${jobs.length} lowongan.</p>
${listHtml}</body></html>`;
        return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
      } catch (e) {}
    }

    return env.ASSETS.fetch(request);
  }
};
