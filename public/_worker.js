export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    const isBot = /googlebot|bingbot|slurp|duckduckbot/i.test(ua);

    if (isBot && url.pathname.startsWith("/lowongan/")) {
      const id = url.pathname.replace("/lowongan/", "");
      try {
        const res = await fetch("https://kemenaker.lokerbkk.com/api/lowongan");
        const data = await res.json();
        const job = (data.lowongan || []).find(j => String(j.id) === id);
        if (job) {
          const schema = {
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.judul,
            description: job.deskripsi,
            datePosted: job.tanggal_ambil,
            hiringOrganization: { "@type": "Organization", name: job.perusahaan },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.kota, addressCountry: "ID" } },
            employmentType: "FULL_TIME"
          };
          const html = `<!doctype html><html lang="id"><head>
<meta charset="UTF-8"><title>${job.judul} - ${job.perusahaan} | LOKERBKK.COM</title>
<meta name="description" content="Lowongan ${job.judul} di ${job.perusahaan} (${job.kota}) via BKK sekolah.">
<link rel="canonical" href="https://www.lokerbkk.com/lowongan/${job.id}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head><body>
<h1>${job.judul}</h1>
<p><strong>${job.perusahaan}</strong> — ${job.kota}</p>
<p>${job.gaji || ""}</p>
<p>${job.deskripsi}</p>
<a href="${job.url}">Lamar Sekarang</a>
</body></html>`;
          return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
        }
      } catch (e) {}
    }
    return env.ASSETS.fetch(request);
  }
};
