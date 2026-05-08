import { useState } from 'react';
import { Wifi } from 'lucide-react';
import { siteConfig } from '../lib/site-config';
import SectionHeader from './SectionHeader';

export default function LabStatusSection() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="lab"
          command="ls -la ~/lab/photos/"
          title="Lab"
          subtitle={`Home lab devices and infrastructure on ${siteConfig.lab.networkCidr}.`}
        />

        <div className="mb-8 flex items-center gap-4 text-sm font-mono">
          <span className="text-gray-500">
            <Wifi className="w-4 h-4 inline mr-1.5 text-cyan-500" />
            {siteConfig.lab.networkName}
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.lab.devices.map((device, index) => (
            <article
              key={index}
              className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={device.image}
                  alt={device.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {device.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {device.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
