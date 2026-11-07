const API_URL = "https://lokerbkk-api.profilku179.workers.dev";

export interface Lowongan {
  id: number;
  judul: string;
  perusahaan: string;
  kota: string;
  jenis_pekerjaan: string;
  url: string;
  gaji: string;
  deskripsi: string;
  tanggal_ambil: string;
}

export async function getLowongan(kota?: string, jenis?: string): Promise<{ total: number; lowongan: Lowongan[] }> {
  const params = new URLSearchParams();
  if (kota) params.set("kota", kota);
  if (jenis) params.set("jenis", jenis);
  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${API_URL}/api/lowongan${query}`);
  return res.json();
}

export async function getKotaList(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/kota`);
  const data = await res.json();
  return data.kota;
}

export async function getJenisList(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/jenis`);
  const data = await res.json();
  return data.jenis;
}
