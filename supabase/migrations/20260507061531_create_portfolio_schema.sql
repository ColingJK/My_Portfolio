/*
  # Create Portfolio Schema for Cybersecurity Professional

  1. New Tables
    - `projects`: Portfolio projects with tech stack, description, and links
    - `certifications`: Professional certifications with status and dates
    - `lab_devices`: Raspberry Pi lab devices with live status info
    - `security_vulnerabilities`: Mock vulnerability data for audit dashboard
    - `scan_results`: Mock scan results for audit dashboard

  2. Security
    - Enable RLS on all tables
    - Public read access for portfolio display data (projects, certifications, lab_devices)
    - Authenticated-only access for security audit data (vulnerabilities, scan_results)

  3. Important Notes
    - All tables use UUID primary keys
    - Timestamps track creation and updates
    - Severity levels use text check constraints for data integrity
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  tech_stack text[] NOT NULL DEFAULT '{}',
  category text NOT NULL DEFAULT 'tool',
  github_url text DEFAULT '',
  live_url text DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'in_progress')),
  issued_date date,
  expiry_date date,
  credential_id text DEFAULT '',
  verify_url text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Lab Devices table (Raspberry Pi and other devices)
CREATE TABLE IF NOT EXISTS lab_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  device_type text NOT NULL DEFAULT 'raspberry_pi',
  hostname text NOT NULL DEFAULT '',
  ip_address text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'maintenance')),
  cpu_usage numeric(5,2) DEFAULT 0,
  memory_usage numeric(5,2) DEFAULT 0,
  disk_usage numeric(5,2) DEFAULT 0,
  temperature numeric(5,2) DEFAULT 0,
  uptime_seconds bigint DEFAULT 0,
  running_services text[] DEFAULT '{}',
  last_heartbeat timestamptz DEFAULT now(),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Security Vulnerabilities table (mock data for audit dashboard)
CREATE TABLE IF NOT EXISTS security_vulnerabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve_id text DEFAULT '',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  severity text NOT NULL DEFAULT 'low' CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  cvss_score numeric(3,1) DEFAULT 0,
  affected_host text NOT NULL DEFAULT '',
  affected_port integer DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'remediated', 'accepted_risk', 'false_positive')),
  discovered_at timestamptz DEFAULT now(),
  remediated_at timestamptz,
  remediation_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Scan Results table (mock data for audit dashboard)
CREATE TABLE IF NOT EXISTS scan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type text NOT NULL DEFAULT 'vulnerability' CHECK (scan_type IN ('vulnerability', 'compliance', 'port', 'webapp')),
  scanner_name text NOT NULL DEFAULT '',
  target text NOT NULL DEFAULT '',
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('running', 'completed', 'failed')),
  total_findings integer DEFAULT 0,
  critical_count integer DEFAULT 0,
  high_count integer DEFAULT 0,
  medium_count integer DEFAULT 0,
  low_count integer DEFAULT 0,
  info_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_vulnerabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_results ENABLE ROW LEVEL SECURITY;

-- Public read policies for portfolio display data
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view certifications"
  ON certifications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view lab devices"
  ON lab_devices FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated-only policies for security audit data
CREATE POLICY "Authenticated users can view vulnerabilities"
  ON security_vulnerabilities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view scan results"
  ON scan_results FOR SELECT
  TO authenticated
  USING (true);

-- Insert policies for authenticated users
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert certifications"
  ON certifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certifications"
  ON certifications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert lab devices"
  ON lab_devices FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update lab devices"
  ON lab_devices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert vulnerabilities"
  ON security_vulnerabilities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vulnerabilities"
  ON security_vulnerabilities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert scan results"
  ON scan_results FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scan results"
  ON scan_results FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects (sort_order);
CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications (status);
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_severity ON security_vulnerabilities (severity);
CREATE INDEX IF NOT EXISTS idx_vulnerabilities_status ON security_vulnerabilities (status);
CREATE INDEX IF NOT EXISTS idx_scan_results_type ON scan_results (scan_type);
