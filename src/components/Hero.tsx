import { useState, useEffect } from 'react';
import { ChevronDown, Shield } from 'lucide-react';
import { siteConfig } from '../lib/site-config';

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = siteConfig.hero.terminalLines;

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, lines.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-gray-950">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>security professional</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
          <span className="text-gray-400 text-2xl sm:text-3xl lg:text-4xl font-normal block mb-2">
            {siteConfig.hero.greeting}
          </span>
          {siteConfig.name}
        </h1>

        <p className="text-lg sm:text-xl text-cyan-400 font-mono mb-8">
          {siteConfig.title}
        </p>

        <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          {siteConfig.bio}
        </p>

        {/* Terminal animation */}
        <div className="max-w-md mx-auto bg-gray-900/80 border border-gray-800 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-gray-500 font-mono">bash</span>
          </div>
          <div className="p-4 font-mono text-sm text-left space-y-1 min-h-[180px]">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('$') ? 'text-cyan-400' : 'text-emerald-400'
                } animate-fadeIn`}
              >
                {line}
              </div>
            ))}
            {visibleLines < lines.length && (
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
            )}
            {visibleLines >= lines.length && (
              <span className="text-gray-600">$<span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" /></span>
            )}
          </div>
        </div>
      </div>

      <a
        href="#projects"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-cyan-400 transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
