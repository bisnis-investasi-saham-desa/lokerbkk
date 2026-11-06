import React, { useState } from 'react';
import {
  getStoredJoobleKey,
  setStoredJoobleKey,
  testJoobleApiKey
} from '../services/joobleApi';
import {
  Key,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Code2,
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  onKeySaved
}) => {
  const [apiKey, setApiKey] = useState<string>(() => getStoredJoobleKey());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    sampleData?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredJoobleKey(apiKey);
    onKeySaved(apiKey);
    onClose();
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testJoobleApiKey(apiKey);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Terjadi kesalahan saat memanggil API.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-blue-700 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 id="api-modal-title" className="text-lg sm:text-xl font-bold text-neutral-900">
                Konfigurasi API Jooble Pencarian Kerja
              </h2>
              <p className="text-xs text-neutral-500">
                Integrasi Resmi XMLHttpRequest id.jooble.org
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-neutral-900">
          <p className="leading-relaxed">
            Sistem pencarian lowongan kerja terhubung ke endpoint resmi{' '}
            <code className="bg-neutral-100 text-blue-700 px-1.5 py-0.5 rounded font-mono text-xs">
              https://id.jooble.org/api/&lt;KEY&gt;
            </code>{' '}
            menggunakan metode <strong>One API Request = All Returned Results Displayed</strong>.
          </p>

          <div>
            <label htmlFor="jooble-key-input" className="block text-xs font-bold text-neutral-700 uppercase mb-1.5">
              Masukkan API Key Jooble Anda
            </label>
            <input
              id="jooble-key-input"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Contoh: 3a2b1c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-hidden"
            />
            <span className="text-xs text-neutral-500 mt-1 block">
              *Tersimpan aman di penyimpanan lokal (localStorage) browser Anda.
            </span>
          </div>

          {/* Test connection execution */}
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-600" />
                Uji Script XMLHttpRequest Jooble
              </span>
              <button
                type="button"
                onClick={handleRunTest}
                disabled={isTesting || !apiKey.trim()}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 text-white font-bold text-xs cursor-pointer flex items-center gap-1 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isTesting ? 'Menguji...' : 'Jalankan Tes XHR'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  testResult.success
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{testResult.message}</p>
                    {testResult.sampleData && (
                      <pre className="mt-2 p-2 bg-white rounded border border-neutral-200 font-mono text-[11px] overflow-x-auto max-h-32">
                        {testResult.sampleData}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 text-xs text-neutral-600 space-y-1 border border-neutral-200">
            <p className="font-bold text-neutral-800">Catatan Ahli SEO & Developer:</p>
            <p>
              Jika Anda belum memiliki API Key Jooble, sistem LOKERBKK.COM secara otomatis menyajikan basis data puluhan lowongan resmi BKK sekolah terverifikasi di Karawang, Cikarang, Solo, Surabaya, dll. sehingga seluruh fungsi pencarian tetap berjalan 100% sempurna.
            </p>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-neutral-700 hover:bg-neutral-100 text-sm font-semibold cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm cursor-pointer"
          >
            Simpan & Gunakan Kunci
          </button>
        </div>
      </div>
    </div>
  );
};
