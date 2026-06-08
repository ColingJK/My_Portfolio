/**
 * Site Configuration - Edit this file to customize your portfolio.
 *
 * ============================================================
 *  EDITING GUIDE
 * ============================================================
 *
 *  PROJECT GALLERY (Portfolio items with photos):
 *  - Edit the `projectGallery.items` array below
 *  - Each item has: title, image (URL), description
 *  - Just add/remove objects to show/hide projects
 *
 *  LAB GALLERY (Cisco Packet Tracer simulations):
 *  - Edit the `labGallery.items` array below
 *  - Each item has: title, image (URL), description
 *  - Just add/remove objects to show/hide labs
 *
 *  PROJECTS LIST (Technical projects with tech stack):
 *  - Edit the `projects.fallback.projects` array at the bottom
 *  - These appear on the main Projects section
 *
 * ============================================================
 */

import type { Project } from './types';

export const siteConfig = {
  // ---- Personal Info ----
  name: 'Colin J',
  title: 'Cybersecurity Student @ ITE',
  tagline: 'Learning. Building. Breaking. Fixing.',
  bio: 'ITE student and aspiring cybersecurity professional building hands-on skills in networking, security, and lab environments.',

  // ---- Hero Section ----
  hero: {
    greeting: 'Hello, I\'m',
    terminalLines: [
      '$ whoami',
      'cybersec-intern',
      '$ cat skills.txt',
      'Networking | Linux | Python | Cisco',
      '$ pwd',
      '/home/intern/ite',
      '$ echo $GOAL',
      '"Get better every day"',
    ],
  },

  // ---- Navigation ----
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Portfolio', href: '#project-gallery' },
    { label: 'Lab Work', href: '#lab-gallery' },
  ],

  // ---- PROJECT GALLERY ----
  // Edit this to show your project photos
  projectGallery: {
    title: 'Portfolio',
    subtitle: 'Project work and demonstrations.',
    items: [
      {
        title: 'Raspberry Pi 3 (14)',
        image: 'https://ibb.co/RTFWnR9g',
        description: 'Add your project description here. Edit this in src/lib/site-config.ts',
      },
      {
        title: 'Project 2',
        image: 'https://images.pexels.com/photos/60504/security-hacker-network-technology-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Add your project description here. Edit this in src/lib/site-config.ts',
      },
      {
        title: 'Project 3',
        image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Add your project description here. Edit this in src/lib/site-config.ts',
      },
      // Add more projects here - just copy a block above and modify
    ],
  },

  // ---- LAB GALLERY ----
  // Edit this to show your Cisco Packet Tracer labs
  labGallery: {
    title: 'Lab Work',
    subtitle: 'Cisco Packet Tracer simulations and network configurations.',
    items: [
      {
        title: 'Lab 1: Basic Network Setup',
        image: 'https://images.pexels.com/photos/1378090/pexels-photo-1378090.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Add your lab description here. Edit this in src/lib/site-config.ts',
      },
      {
        title: 'Lab 2: Switching & VLANs',
        image: 'https://images.pexels.com/photos/60504/security-hacker-network-technology-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Add your lab description here. Edit this in src/lib/site-config.ts',
      },
      {
        title: 'Lab 3: Routing Protocols',
        image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'Add your lab description here. Edit this in src/lib/site-config.ts',
      },
      // Add more labs here - just copy a block above and modify
    ],
  },

  // ---- FALLBACK PROJECTS DATA ----
  // Technical projects list (shown on main Projects section)
  fallback: {
    projects: [
      {
        id: '1',
        title: 'Network Vulnerability Scanner',
        description: 'Built a Python script that scans local networks for open ports and common misconfigurations. Uses Nmap and socket libraries to generate readable reports.',
        tech_stack: ['Python', 'Nmap', 'Socket'],
        category: 'tool',
        github_url: 'https://github.com',
        live_url: '',
        featured: true,
        sort_order: 1,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
      {
        id: '2',
        title: 'Pi-Hole Home Lab Setup',
        description: 'Deployed Pi-Hole on Raspberry Pi for network-wide ad blocking. Configured DNS-over-HTTPS, custom blocklists, and a monitoring dashboard.',
        tech_stack: ['Raspberry Pi', 'Pi-Hole', 'DNS', 'Linux'],
        category: 'homelab',
        github_url: 'https://github.com',
        live_url: '',
        featured: true,
        sort_order: 2,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
      {
        id: '3',
        title: 'Log Analysis Dashboard',
        description: 'Intern project that parses Apache/Nginx access logs and visualizes traffic patterns, error rates, and potential security events using Python and Grafana.',
        tech_stack: ['Python', 'Grafana', 'Regex', 'Bash'],
        category: 'tool',
        github_url: 'https://github.com',
        live_url: '',
        featured: true,
        sort_order: 3,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
      {
        id: '4',
        title: 'TryHackMe Writeups',
        description: 'Documented walkthroughs for TryHackMe rooms covering OWASP Top 10, privilege escalation, and network enumeration techniques.',
        tech_stack: ['Markdown', 'Linux', 'Burp Suite', 'Nmap'],
        category: 'learning',
        github_url: 'https://github.com',
        live_url: '',
        featured: false,
        sort_order: 4,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
      {
        id: '5',
        title: 'Automated Backup Script',
        description: 'Bash script that automates encrypted backups of lab VMs and config files to a local NAS. Runs via cron with email notifications on failure.',
        tech_stack: ['Bash', 'GPG', 'Cron', 'Rsync'],
        category: 'tool',
        github_url: 'https://github.com',
        live_url: '',
        featured: false,
        sort_order: 5,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
      {
        id: '6',
        title: 'Firewall Rule Generator',
        description: 'Python tool that generates iptables rules from a simple YAML config. Helps me practice network security concepts and infrastructure-as-code principles.',
        tech_stack: ['Python', 'iptables', 'YAML'],
        category: 'tool',
        github_url: 'https://github.com',
        live_url: '',
        featured: false,
        sort_order: 6,
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      },
    ] as Project[],
  },
};

export type SiteConfig = typeof siteConfig;
