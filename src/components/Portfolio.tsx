import React, { useState } from 'react';
import { ExternalLink, Eye, Monitor, Smartphone, Tablet, X, Sparkles, Layers } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  startingPrice: string;
  tags: string[];
  features: string[];
  mockupUrl: string;
}

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const projects: ProjectItem[] = [
    {
      id: 'aura-academy',
      name: 'Aura Advanced STEM Academy',
      category: 'educational',
      categoryLabel: 'Educational Website',
      description:
        'A comprehensive education portal featuring interactive course curriculum previews, student admissions pathway, module timelines, and direct tutor contact.',
      image: '/src/assets/images/edu_website_mockup_1794295241467.jpg',
      startingPrice: '₹2,100 (Dynamic)',
      tags: ['Course Catalog', 'Timelines', 'Vercel Subdomain'],
      features: ['Syllabus Module Viewer', 'WhatsApp Admission Lead Bot', 'Mobile Responsive'],
      mockupUrl: 'https://aura-academy.vercel.app',
    },
    {
      id: 'ignite-fitness',
      name: 'Ignite Athletic Performance Gym',
      category: 'fitness',
      categoryLabel: 'Fitness Website',
      description:
        'High-energy, bold athletic training facility website with membership tier pricing, coach roster spotlight, workout schedules, and class inquiry routing.',
      image: '/src/assets/images/fitness_website_mockup_1794295242558.jpg',
      startingPrice: '₹1,700 (Static)',
      tags: ['Membership Tiers', 'Trainer Profiles', 'Schedule'],
      features: ['Tiered Pricing Cards', 'Google Maps Gym Locator', 'Instant Trial Booking'],
      mockupUrl: 'https://ignite-fit.vercel.app',
    },
    {
      id: 'astra-ventures',
      name: 'Astra Strategic Tech Advisory',
      category: 'business',
      categoryLabel: 'Business Website',
      description:
        'A dark-themed corporate presence with futuristic particle ambiance, service capability bento-grids, verified case statistics, and advisory consult booking.',
      image: '/src/assets/images/business_website_mockup_1794295243043.jpg',
      startingPrice: '₹2,100 (Dynamic)',
      tags: ['Corporate', 'Consultancy', 'B2B Leads'],
      features: ['Interactive Service Tabs', 'Impact Stats Counters', 'Consultation Form'],
      mockupUrl: 'https://astra-ventures.vercel.app',
    },
    {
      id: 'luxe-atelier',
      name: 'Lumière Aesthetics & Spa',
      category: 'salon',
      categoryLabel: 'Salon & Spa Website',
      description:
        'Sophisticated, warm luxury aesthetic salon concept with service treatment menu, stylist lookbook, price list, and 1-tap WhatsApp appointment scheduling.',
      image: '/src/assets/images/business_website_mockup_1794295243043.jpg', // fallback image
      startingPrice: '₹1,700 (Static)',
      tags: ['Treatment Menu', 'Lookbook', 'Appointments'],
      features: ['Service Price Cards', 'Stylist Portfolio', 'WhatsApp Booking Button'],
      mockupUrl: 'https://lumiere-spa.vercel.app',
    },
    {
      id: 'rohan-visuals',
      name: 'Rohan Roy Cinematic Studio',
      category: 'portfolio',
      categoryLabel: 'Portfolio Website',
      description:
        'Minimalist visual artist and director showcase with full-bleed responsive masonry gallery, project breakdown sheets, and client contact channel.',
      image: '/src/assets/images/edu_website_mockup_1794295241467.jpg', // fallback image
      startingPrice: '₹1,700 (Static)',
      tags: ['Creative Portfolio', 'Full-Bleed', 'Masonry'],
      features: ['Interactive Project Viewer', 'Social Links', 'Direct Commission Form'],
      mockupUrl: 'https://rohan-roy.vercel.app',
    },
    {
      id: 'zenith-custom',
      name: 'Zenith Logistics & Dispatch',
      category: 'custom',
      categoryLabel: 'Custom Website',
      description:
        'Custom web solution featuring real-time shipping quote calculator, fleet vehicle spec sheets, route coverage map, and automated dispatch contact routing.',
      image: '/src/assets/images/fitness_website_mockup_1794295242558.jpg', // fallback image
      startingPrice: '₹2,800 (Custom)',
      tags: ['Freight Logistics', 'Cost Estimator', 'Fleet Specs'],
      features: ['Distance Cost Estimator', 'WhatsApp Order Handoff', 'Multi-city Route Matrix'],
      mockupUrl: 'https://zenith-logistics.vercel.app',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'educational', label: 'Educational' },
    { id: 'fitness', label: 'Fitness & Gym' },
    { id: 'salon', label: 'Salon & Spa' },
    { id: 'business', label: 'Business & Tech' },
    { id: 'portfolio', label: 'Portfolios' },
    { id: 'custom', label: 'Custom' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            Real Experience Blueprints
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            OUR WORK <span className="text-gradient-fire">SPEAKS FOR ITSELF.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Browse through production-grade design concepts built for actual commercial niches. Click any project to launch the interactive live viewport.
          </p>
        </div>

        {/* Filter Bar (Functional buttons with clean segmented styles) */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/20'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF5A1F]/15"
            >
              <div>
                {/* 3D Browser Mockup Header */}
                <div className="px-4 py-2.5 bg-[#1b1b1b] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-[10px] text-neutral-400 truncate max-w-[160px]">
                      {project.id}.vercel.app
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#FF7A00] font-semibold">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Screenshot Container with 3D Tilt & Hover Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer"
                  onClick={() => setPreviewProject(project)}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} live preview`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5A1F] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF5A1F]/40 hover:bg-[#FF7A00] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Interactive Preview</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6">
                  {/* Category and starting price */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-mono text-[#FFC857]">{project.startingPrice}</span>
                    <span className="text-neutral-500 font-mono text-[11px]">Turnaround: 48h</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF7A00] transition-colors font-['Outfit']">
                    {project.name}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Feature Tags (clean text separators per anti-pill rule) */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    {project.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {i < project.tags.length - 1 && <span className="text-neutral-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setPreviewProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF5A1F]/40 text-xs font-semibold text-neutral-200 transition-all cursor-pointer"
                >
                  <span>Inspect Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF7A00]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Top Control Bar */}
            <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/90" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
                  <span className="w-3 h-3 rounded-full bg-green-500/90" />
                </div>
                <div className="ml-2 font-mono text-xs text-white font-bold truncate">
                  {previewProject.name} — Live Demonstration
                </div>
              </div>

              {/* Responsive Device Switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded ${
                    previewDevice === 'desktop' ? 'bg-[#FF5A1F] text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded ${
                    previewDevice === 'tablet' ? 'bg-[#FF5A1F] text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded ${
                    previewDevice === 'mobile' ? 'bg-[#FF5A1F] text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setPreviewProject(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Live Screen Viewer */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a] flex items-center justify-center">
              <div
                className={`transition-all duration-300 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#111111] ${
                  previewDevice === 'desktop'
                    ? 'w-full max-w-4xl'
                    : previewDevice === 'tablet'
                    ? 'w-[640px]'
                    : 'w-[360px]'
                }`}
              >
                <img
                  src={previewProject.image}
                  alt={previewProject.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Modal Footer Specs & Booking Action */}
            <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-400">Package Equivalent:</span>
                <span className="ml-2 text-sm font-bold text-white font-mono">{previewProject.startingPrice}</span>
                <span className="ml-3 text-xs text-neutral-500">Delivered by Mehul Roy</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Mehul! I saw the ${previewProject.name} project on WEBX and would like a similar website for my business.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:from-[#FF8F1F] hover:to-[#FF682B] transition-all"
                >
                  Order a Website Like This
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
