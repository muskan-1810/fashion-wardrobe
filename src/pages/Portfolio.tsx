import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { portfolioCategories } from '../data/navigation';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Header */}
      <div className="mb-12 border-b border-[#E8E4DC] pb-8 space-y-4">
        <span className="editorial-subheading">Selected Works &amp; Art Direction</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal text-[#171717]">
          PORTFOLIO ARCHIVE.
        </h1>
        <p className="text-sm md:text-base text-[#635B50] max-w-2xl font-light leading-relaxed">
          A curated archive of fashion campaigns, editorial styling, visual identities, and spatial lookbooks created with an emphasis on brutalist geometry and tactile material storytelling.
        </p>

        {/* Category Filter Controls */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          {portfolioCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-[#F8F6F1]'
                  : 'bg-[#ECE8E1] text-[#4A453F] hover:bg-[#E2DDD5] hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento / Masonry Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {filteredProjects.map((project, idx) => {
          // Asymmetrical Bento spans: every 3rd project is wider
          const isWide = idx % 3 === 0;
          const colSpan = isWide ? 'md:col-span-8' : 'md:col-span-4';
          const aspectRatio = isWide ? 'aspect-[16/10]' : 'aspect-[4/5]';

          return (
            <article
              key={project.id}
              className={`${colSpan} group flex flex-col space-y-4`}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className={`relative ${aspectRatio} w-full bg-[#ECE8E1] overflow-hidden block`}
              >
                <ImageWithFallback
                  src={project.coverImage}
                  alt={project.title}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-xs text-white px-2.5 py-1 text-[9px] uppercase tracking-widest font-medium">
                  {project.category}
                </div>
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs text-black px-2 py-0.5 text-[10px] font-mono tabular-nums">
                  {project.year}
                </div>
              </Link>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#7E7569]">
                  <span className="uppercase tracking-wider">{project.role}</span>
                  <span className="text-[11px]">{project.clientOrBrand}</span>
                </div>

                <h2 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#635B50] transition-colors">
                  <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
                </h2>

                <p className="text-xs text-[#544D44] font-light leading-relaxed line-clamp-2">
                  {project.brief}
                </p>

                <div className="pt-2">
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-black font-medium group-hover:underline underline-offset-4"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
