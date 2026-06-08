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
        description: 'I used my Raspberry pi to host a website ',
      },
     ,

  // ---- LAB GALLERY ----
  // Edit this to show your Cisco Packet Tracer labs
  labGallery: {
    title: 'Lab Work',
    subtitle: 'Cisco Packet Tracer simulations and network configurations.',
    items: [
      ],
  },

  // ---- FALLBACK PROJECTS DATA ----
  // Technical projects list (shown on main Projects section)
  fallback: {
    projects: [
      
    ] as Project[],
  },
};

export type SiteConfig = typeof siteConfig;
