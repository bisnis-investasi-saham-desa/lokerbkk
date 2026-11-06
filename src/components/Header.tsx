import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Building2,
  BookOpen,
  Menu,
  X,
  Key,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  onOpenApiModal: () => void;
  hasCustomApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenApiModal,
  hasCustomApiKey
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Cari Lowongan BKK', href: '/lowongan?keywords=&location=' },
    { label: 'Direktori BKK SMK', href: '/bkk-sekolah' },
    { label: 'Panduan Tes BKK', href: '/panduan-bkk' },
    { label: 'Kategori Vokasi', href: '/kategori/operator-produksi' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-sky-50/90 backdrop-blur-md border-b border-sky-200/80 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - LOKERBKK.COM */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold shadow-sm group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 leading-none">
                  LOKER<span className="text-blue-600">BKK</span><span className="text-sky-500">.COM</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-800 tracking-wide mt-0.5">
                  PORTAL BURSA KERJA KHUSUS
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links - Clickable in Blue */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href.split('?')[0]);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-blue-600 hover:text-blue-800 hover:bg-sky-100/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Header Action: Hidden from visitors but functionality remains active */}
          <div className="hidden">
            <button
              type="button"
              onClick={onOpenApiModal}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            >
              API Key Config
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-blue-600 hover:bg-sky-100 cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-sky-50 border-b border-sky-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="block px-4 py-2.5 rounded-xl font-bold text-sm text-blue-600 hover:text-blue-800 hover:bg-sky-100/70"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
