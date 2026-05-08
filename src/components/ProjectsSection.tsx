import { useEffect, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { siteConfig } from '../lib/site-config';
import type { Project } from '../lib/types';
import SectionHeader from './SectionHeader';

const categoryLabels: Record<string, string> = {
  tool: 'Security Tool',
  framework: 'Framework',
  homelab: 'Home Lab',
  learning: 'Learning',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!isSupabaseConfigured || !supabase) {
        setProjects(siteConfig.fallback.projects);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      setProjects(data || siteConfig.fallback.projects);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="projects"
          command="ls -la ~/projects/"
          title="Projects"
          subtitle="Security tools, frameworks, and home lab builds that I've developed and maintain."
        />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-900/50 rounded-lg border border-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
              >
                {project.featured && (
                  <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    featured
                  </span>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <Folder className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono bg-gray-800 text-gray-400 rounded border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
