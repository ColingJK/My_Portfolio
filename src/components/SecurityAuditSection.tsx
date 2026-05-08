import { useEffect, useState, useMemo } from 'react';
import { ShieldAlert, Scan, BarChart3, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { siteConfig } from '../lib/site-config';
import type { SecurityVulnerability, ScanResult } from '../lib/types';
import SectionHeader from './SectionHeader';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';

type VulnFilter = 'all' | 'open' | 'remediated' | 'accepted_risk' | 'false_positive';

export default function SecurityAuditSection() {
  const [vulnerabilities, setVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [vulnFilter, setVulnFilter] = useState<VulnFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVuln, setExpandedVuln] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured || !supabase) {
        setVulnerabilities(siteConfig.fallback.vulnerabilities);
        setScans(siteConfig.fallback.scans);
        setLoading(false);
        return;
      }
      const [vulnRes, scanRes] = await Promise.all([
        supabase.from('security_vulnerabilities').select('*').order('discovered_at', { ascending: false }),
        supabase.from('scan_results').select('*').order('started_at', { ascending: false }),
      ]);
      setVulnerabilities(vulnRes.data || siteConfig.fallback.vulnerabilities);
      setScans(scanRes.data || siteConfig.fallback.scans);
      setLoading(false);
    }
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const open = vulnerabilities.filter((v) => v.status === 'open');
    const remediated = vulnerabilities.filter((v) => v.status === 'remediated');
    return {
      total: vulnerabilities.length,
      open: open.length,
      critical: open.filter((v) => v.severity === 'critical').length,
      high: open.filter((v) => v.severity === 'high').length,
      remediated: remediated.length,
      remediationRate: vulnerabilities.length > 0
        ? ((remediated.length / vulnerabilities.length) * 100).toFixed(1)
        : '0',
    };
  }, [vulnerabilities]);

  const filteredVulns = useMemo(() => {
    let result = vulnerabilities;
    if (vulnFilter !== 'all') {
      result = result.filter((v) => v.status === vulnFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.cve_id.toLowerCase().includes(q) ||
          v.affected_host.toLowerCase().includes(q)
      );
    }
    return result;
  }, [vulnerabilities, vulnFilter, searchQuery]);

  const scanTypeLabels: Record<string, string> = {
    vulnerability: 'Vuln Scan',
    compliance: 'Compliance',
    port: 'Port Scan',
    webapp: 'Web App',
  };

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="audit"
          command="sudo openvas --scan"
          title="Security Audit Dashboard"
          subtitle="Vulnerability tracking, scan results, and security posture overview. Data sourced from automated security tooling."
        />

        {loading ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-900/50 rounded-lg border border-gray-800 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-mono text-gray-500 uppercase">Open Vulns</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.open}</div>
                <div className="text-xs font-mono text-red-400 mt-1">
                  {stats.critical} critical, {stats.high} high
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-gray-500 uppercase">Remediated</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.remediated}</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">
                  {stats.remediationRate}% remediation rate
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Scan className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-gray-500 uppercase">Total Scans</span>
                </div>
                <div className="text-2xl font-bold text-white">{scans.length}</div>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  {scans.filter((s) => s.status === 'completed').length} completed
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-mono text-gray-500 uppercase">Findings</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {scans.reduce((sum, s) => sum + s.total_findings, 0)}
                </div>
                <div className="text-xs font-mono text-yellow-400 mt-1">
                  across all scans
                </div>
              </div>
            </div>

            {/* Severity Distribution Bar */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
              <h3 className="text-xs font-mono text-gray-500 uppercase mb-3">Vulnerability Severity Distribution</h3>
              <div className="flex h-3 rounded-full overflow-hidden bg-gray-800">
                {['critical', 'high', 'medium', 'low', 'info'].map((sev) => {
                  const count = vulnerabilities.filter((v) => v.severity === sev).length;
                  const pct = vulnerabilities.length > 0 ? (count / vulnerabilities.length) * 100 : 0;
                  const colors: Record<string, string> = {
                    critical: 'bg-red-500',
                    high: 'bg-orange-500',
                    medium: 'bg-yellow-500',
                    low: 'bg-blue-500',
                    info: 'bg-gray-500',
                  };
                  return pct > 0 ? (
                    <div
                      key={sev}
                      className={`${colors[sev]} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                      title={`${sev}: ${count} (${pct.toFixed(1)}%)`}
                    />
                  ) : null;
                })}
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-600">
                {['critical', 'high', 'medium', 'low', 'info'].map((sev) => (
                  <span key={sev}>
                    {sev}: {vulnerabilities.filter((v) => v.severity === sev).length}
                  </span>
                ))}
              </div>
            </div>

            {/* Scan Results */}
            <div className="mb-8">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">Recent Scans</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 px-3 text-xs font-mono text-gray-500 uppercase">Type</th>
                      <th className="text-left py-2 px-3 text-xs font-mono text-gray-500 uppercase">Scanner</th>
                      <th className="text-left py-2 px-3 text-xs font-mono text-gray-500 uppercase">Target</th>
                      <th className="text-left py-2 px-3 text-xs font-mono text-gray-500 uppercase">Status</th>
                      <th className="text-center py-2 px-3 text-xs font-mono text-gray-500 uppercase">Crit</th>
                      <th className="text-center py-2 px-3 text-xs font-mono text-gray-500 uppercase">High</th>
                      <th className="text-center py-2 px-3 text-xs font-mono text-gray-500 uppercase">Med</th>
                      <th className="text-center py-2 px-3 text-xs font-mono text-gray-500 uppercase">Low</th>
                      <th className="text-center py-2 px-3 text-xs font-mono text-gray-500 uppercase">Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scans.map((scan) => (
                      <tr key={scan.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-xs text-cyan-400">
                          {scanTypeLabels[scan.scan_type] || scan.scan_type}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-xs text-gray-400">{scan.scanner_name}</td>
                        <td className="py-2.5 px-3 font-mono text-xs text-gray-400">{scan.target}</td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={scan.status} />
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs">
                          <span className={scan.critical_count > 0 ? 'text-red-400' : 'text-gray-600'}>
                            {scan.critical_count}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs">
                          <span className={scan.high_count > 0 ? 'text-orange-400' : 'text-gray-600'}>
                            {scan.high_count}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs">
                          <span className={scan.medium_count > 0 ? 'text-yellow-400' : 'text-gray-600'}>
                            {scan.medium_count}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs">
                          <span className={scan.low_count > 0 ? 'text-blue-400' : 'text-gray-600'}>
                            {scan.low_count}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs text-gray-600">
                          {scan.info_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vulnerability List */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                  Vulnerabilities ({filteredVulns.length})
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search CVE, title, host..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs font-mono bg-gray-900 border border-gray-800 rounded-md text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 w-48"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select
                      value={vulnFilter}
                      onChange={(e) => setVulnFilter(e.target.value as VulnFilter)}
                      className="pl-8 pr-6 py-1.5 text-xs font-mono bg-gray-900 border border-gray-800 rounded-md text-gray-300 appearance-none focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="remediated">Remediated</option>
                      <option value="accepted_risk">Accepted Risk</option>
                      <option value="false_positive">False Positive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {filteredVulns.map((vuln) => (
                  <div
                    key={vuln.id}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedVuln(expandedVuln === vuln.id ? null : vuln.id)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <SeverityBadge severity={vuln.severity} />
                        <div className="min-w-0">
                          <div className="text-sm text-white font-medium truncate">
                            {vuln.cve_id && (
                              <span className="text-cyan-400 mr-2">{vuln.cve_id}</span>
                            )}
                            {vuln.title}
                          </div>
                          <div className="text-xs font-mono text-gray-500 mt-0.5">
                            {vuln.affected_host}:{vuln.affected_port} &middot; CVSS {vuln.cvss_score}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={vuln.status} />
                        {expandedVuln === vuln.id ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {expandedVuln === vuln.id && (
                      <div className="px-4 pb-4 border-t border-gray-800/50">
                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                          {vuln.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-gray-500">
                          <span>Discovered: {new Date(vuln.discovered_at).toLocaleDateString()}</span>
                          {vuln.remediated_at && (
                            <span>Remediated: {new Date(vuln.remediated_at).toLocaleDateString()}</span>
                          )}
                        </div>
                        {vuln.remediation_notes && (
                          <div className="mt-2 text-xs font-mono text-emerald-400/80 bg-emerald-500/5 border border-emerald-500/10 rounded px-3 py-2">
                            {vuln.remediation_notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {filteredVulns.length === 0 && (
                  <div className="text-center py-8 text-gray-600 font-mono text-sm">
                    No vulnerabilities match the current filter.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
