import { siteConfig } from '../lib/site-config';
import SectionHeader from './SectionHeader';

export default function LabGallery() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="lab-gallery"
          command="show cisco lab/"
          title={siteConfig.labGallery.title}
          subtitle={siteConfig.labGallery.subtitle}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.labGallery.items.map((item, index) => (
            <article
              key={index}
              className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {siteConfig.labGallery.items.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono">
            <p>Edit labGallery.items in src/lib/site-config.ts to add labs</p>
          </div>
        )}
      </div>
    </section>
  );
}
