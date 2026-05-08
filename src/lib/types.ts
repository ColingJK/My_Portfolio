export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: 'active' | 'expired' | 'in_progress';
  issued_date: string | null;
  expiry_date: string | null;
  credential_id: string;
  verify_url: string;
  sort_order: number;
  created_at: string;
}

export interface LabDevice {
  id: string;
  name: string;
  device_type: string;
  hostname: string;
  ip_address: string;
  status: 'online' | 'offline' | 'maintenance';
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  temperature: number;
  uptime_seconds: number;
  running_services: string[];
  last_heartbeat: string;
  image_url: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityVulnerability {
  id: string;
  cve_id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cvss_score: number;
  affected_host: string;
  affected_port: number;
  status: 'open' | 'remediated' | 'accepted_risk' | 'false_positive';
  discovered_at: string;
  remediated_at: string | null;
  remediation_notes: string;
  created_at: string;
}

export interface ScanResult {
  id: string;
  scan_type: 'vulnerability' | 'compliance' | 'port' | 'webapp';
  scanner_name: string;
  target: string;
  started_at: string;
  completed_at: string | null;
  status: 'running' | 'completed' | 'failed';
  total_findings: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  info_count: number;
  created_at: string;
}
