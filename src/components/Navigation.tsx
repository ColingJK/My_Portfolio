import { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { siteConfig } from '../lib/site-config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/95 backdrop-blur-md border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleClick('#home')}
            className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-lg tracking-tight hover:text-cyan-300 transition-colors"
          >
            <Shield className="w-6 h-6" />
            <span>{siteConfig.name.split(' ')[0].toLowerCase()}@sec</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-3 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors rounded-md hover:bg-cyan-500/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-950/98 backdrop-blur-md border-b border-cyan-500/10">
          <div className="px-4 py-3 space-y-1">
            {siteConfig.navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="block w-full text-left px-3 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors rounded-md hover:bg-cyan-500/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
