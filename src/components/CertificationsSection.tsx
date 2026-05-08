import { useEffect, useState } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { siteConfig } from '../lib/site-config';
import type { Certification } from '../lib/types';
import SectionHeader from './SectionHeader';
import StatusBadge from './StatusBadge';

export default function CertificationsSection() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCerts() {
      if (!isSupabaseConfigured || !supabase) {
        setCerts(siteConfig.fallback.certifications);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('certifications')
        .select('*')
        .order('sort_order', { ascending: true });
      setCerts(data || siteConfig.fallback.certifications);
      setLoading(false);
    }
    fetchCerts();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="certifications"
          command="cat /etc/certs.list"
          title="Certifications"
          subtitle="Industry certifications and professional credentials validating expertise across security domains."
        />

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-900/50 rounded-lg border border-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {certs.map((cert) => (
              <article
                key={cert.id}
                className="group bg-gray-900/50 border border-gray-800 rounded-lg p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <Award className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                  <StatusBadge status={cert.status} />
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs font-mono text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(cert.issued_date)}
                  </span>
                  {cert.expiry_date && (
                    <span>
                      Exp: {formatDate(cert.expiry_date)}
                    </span>
                  )}
                  {cert.credential_id && (
                    <span className="text-gray-600">ID: {cert.credential_id}</span>
                  )}
                </div>

                {cert.verify_url && (
                  <div className="mt-2">
                    <a
                      href={cert.verify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-500/70 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
