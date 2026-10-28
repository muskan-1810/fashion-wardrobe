import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl">Project Not Found</h1>
        <p className="text-sm text-[#7E7569]">
          The portfolio case study you requested does not exist or has been archived.
        </p>
        <Link
          to="/portfolio"
          className="inline-block px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest mt-4"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const prevProject = projects.find(p => p.slug === project.prevSlug) || projects[0];
  const nextProject = projects.find(p => p.slug === project.nextSlug) || projects[projects.length - 1];

  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#7E7569] uppercase tracking-wider">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <Link to="/portfolio" className="hover:text-black">Portfolio</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <span className="text-black">{project.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-6 mb-12 border-b border-[#E8E4DC] pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#7E7569]">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span className="text-black font-medium">{project.role}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal leading-tight text-[#171717]">
          {project.title}
        </h1>

        <p className="text-base md:text-lg text-[#524B41] font-light max-w-3xl leading-relaxed">
          {project.brief}
        </p>
      </div>

      {/* Full-width Hero Cover Image */}
      <div className="relative aspect-[16/9] w-full bg-[#ECE8E1] overflow-hidden mb-16 shadow-sm">
        <ImageWithFallback
          src={project.coverImage}
          alt={project.title}
          fallbackTitle={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-[#171717]/85 backdrop-blur-xs text-white px-3 py-1 text-[10px] uppercase tracking-widest font-mono">
          Campaign Cover · {project.clientOrBrand}
        </div>
      </div>

      {/* Project Narrative: Concept & Process (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 border-b border-[#E8E4DC] pb-16">
        <div className="md:col-span-6 space-y-4">
          <span className="editorial-subheading">01. Creative Concept</span>
          <h2 className="font-serif text-2xl uppercase tracking-tight font-normal text-[#171717]">
            The Spatial Narrative
          </h2>
          <p className="text-sm text-[#544D44] font-light leading-relaxed">
            {project.concept}
          </p>
        </div>

        <div className="md:col-span-6 space-y-4">
          <span className="editorial-subheading">02. Design Process</span>
          <h2 className="font-serif text-2xl uppercase tracking-tight font-normal text-[#171717]">
            Execution &amp; Methodology
          </h2>
          <p className="text-sm text-[#544D44] font-light leading-relaxed">
            {project.process}
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="mb-20 space-y-8">
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
          <span className="editorial-subheading">Visual Plates &amp; Studies</span>
          <span className="text-xs text-[#7E7569] uppercase tracking-wider">
            {project.galleryImages.length} Plates
          </span>
        </div>

        <div className="space-y-12">
          {project.galleryImages.map((img, idx) => {
            const aspectClass =
              img.aspectRatio === 'landscape'
                ? 'aspect-[16/10]'
                : img.aspectRatio === 'square'
                ? 'aspect-square max-w-2xl mx-auto'
                : 'aspect-[4/5] max-w-3xl mx-auto';

            return (
              <figure key={idx} className="space-y-3">
                <div className={`relative ${aspectClass} w-full bg-[#ECE8E1] overflow-hidden`}>
                  <ImageWithFallback
                    src={img.url}
                    alt={img.caption || `${project.title} study ${idx + 1}`}
                    fallbackTitle={`${project.title} Plate ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {img.caption && (
                  <figcaption className="text-xs text-[#7E7569] font-light tracking-wide text-center">
                    Plate 0{idx + 1} — {img.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </section>

      {/* Credits Block */}
      {project.credits && (
        <section className="mb-20 p-8 bg-[#F4F1EA] border border-[#E8E4DC] max-w-3xl mx-auto space-y-6">
          <div className="border-b border-[#DDD7CD] pb-3">
            <span className="editorial-subheading">Production Credits</span>
            <h3 className="font-serif text-lg uppercase tracking-tight mt-1">
              Creative Collaborators
            </h3>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
            {project.credits.photographer && (
              <div>
                <dt className="uppercase tracking-widest text-[#7E7569] text-[10px]">Photography</dt>
                <dd className="font-medium text-black mt-0.5">{project.credits.photographer}</dd>
              </div>
            )}
            {project.credits.artDirection && (
              <div>
                <dt className="uppercase tracking-widest text-[#7E7569] text-[10px]">Art Direction</dt>
                <dd className="font-medium text-black mt-0.5">{project.credits.artDirection}</dd>
              </div>
            )}
            {project.credits.styling && (
              <div>
                <dt className="uppercase tracking-widest text-[#7E7569] text-[10px]">Styling</dt>
                <dd className="font-medium text-black mt-0.5">{project.credits.styling}</dd>
              </div>
            )}
            {project.credits.model && (
              <div>
                <dt className="uppercase tracking-widest text-[#7E7569] text-[10px]">Model</dt>
                <dd className="font-medium text-black mt-0.5">{project.credits.model}</dd>
              </div>
            )}
            {project.credits.location && (
              <div className="sm:col-span-2">
                <dt className="uppercase tracking-widest text-[#7E7569] text-[10px]">Location</dt>
                <dd className="font-medium text-black mt-0.5">{project.credits.location}</dd>
              </div>
            )}
          </dl>
        </section>
      )}

      {/* Previous / Next Project Navigation */}
      <div className="pt-10 border-t border-[#E8E4DC] flex items-center justify-between text-xs uppercase tracking-widest text-[#7E7569]">
        <Link
          to={`/portfolio/${prevProject.slug}`}
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: {prevProject.title}</span>
        </Link>

        <Link
          to={`/portfolio/${nextProject.slug}`}
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <span>Next: {nextProject.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#E8E4DC]">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <span className="editorial-subheading">Archive Continuity</span>
              <h3 className="font-serif text-2xl uppercase tracking-tight text-[#171717] mt-1">
                Related Creative Works
              </h3>
            </div>
            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-wider underline text-[#7E7569] hover:text-black"
            >
              All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map(p => (
              <Link
                key={p.slug}
                to={`/portfolio/${p.slug}`}
                className="group flex flex-col space-y-3"
              >
                <div className="relative aspect-[16/10] bg-[#ECE8E1] overflow-hidden">
                  <ImageWithFallback
                    src={p.coverImage}
                    alt={p.title}
                    fallbackTitle={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#7E7569]">
                  <span>{p.category}</span>
                  <span className="font-mono">{p.year}</span>
                </div>
                <h4 className="font-serif text-xl font-normal group-hover:underline">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
