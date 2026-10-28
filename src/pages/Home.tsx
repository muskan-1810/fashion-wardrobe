import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { collections } from '../data/collections';
import { projects } from '../data/projects';
import { ProductCard } from '../components/ProductCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717]">
      {/* 1. Cinematic Hero Section (85-90vh) */}
      <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-end pb-16 md:pb-24 pt-32 px-6 md:px-12 overflow-hidden border-b border-[#E8E4DC]">
        {/* Full-width editorial background image with subtle scrim */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=2000&q=85"
            alt="Atelier Noir Autumn Winter Campaign"
            fallbackTitle="Atelier Noir Campaign"
            className="w-full h-full object-cover object-top filter brightness-[0.88]"
          />
          {/* Subtle editorial gradient scrim ensuring 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/40 to-black/30" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#E0D9CE] font-medium">
              <span>Issue No. 04</span>
              <span aria-hidden="true" className="text-[#A3998D]">·</span>
              <span>Autumn / Winter 2026</span>
              <span aria-hidden="true" className="text-[#A3998D]">·</span>
              <span>Atelier Edition</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight uppercase leading-[1.05] text-[#FDFCF9]">
              FORM, FABRIC &amp; IDENTITY.
            </h1>

            <p className="text-base md:text-lg text-[#E3DDD4] font-light leading-relaxed max-w-xl">
              An exploration of contemporary fashion, personal expression, and timeless design through architectural silhouettes and rare natural fibers.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="px-7 py-3.5 bg-[#F8F6F1] text-[#171717] hover:bg-white text-xs uppercase tracking-[0.2em] font-medium transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/portfolio"
                className="px-7 py-3.5 border border-white/60 text-white hover:bg-white/10 hover:border-white text-xs uppercase tracking-[0.2em] font-medium transition-colors backdrop-blur-xs"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-6 md:right-12 z-10 hidden sm:flex items-center gap-2 text-white/80 text-[11px] uppercase tracking-[0.2em]">
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 2. Featured Collections Editorial Panel (4 cards asymmetrical) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#E8E4DC] pb-6">
          <div>
            <span className="editorial-subheading">Curated Editions</span>
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight font-normal text-[#171717] mt-1">
              Seasonal Architecture
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-[0.2em] text-[#635B50] hover:text-black transition-colors inline-flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical 4-Panel Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Panel 1: New Season (Large col-span-7) */}
          <div className="md:col-span-7 group relative aspect-[4/3] md:aspect-[16/10] bg-[#ECE8E1] overflow-hidden">
            <Link to="/collections/form-and-void" className="block w-full h-full relative">
              <ImageWithFallback
                src={collections[0].coverImage}
                alt="Form and Void"
                fallbackTitle="Form & Void"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-10 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8CFBF] mb-1">
                  New Season · 2026
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal leading-tight">
                  Form &amp; Void
                </h3>
                <p className="text-xs md:text-sm text-[#E0D9CE] font-light max-w-md mt-1 line-clamp-2">
                  Sculptural tailoring cut from 850gsm Italian virgin wools and heavy raw silk twills.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] underline underline-offset-4 group-hover:text-[#F8F6F1]">
                  <span>Discover Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Panel 2: Essential Pieces (col-span-5) */}
          <div className="md:col-span-5 group relative aspect-[4/3] md:aspect-auto bg-[#ECE8E1] overflow-hidden">
            <Link to="/collections/permanent-archive" className="block w-full h-full relative">
              <ImageWithFallback
                src={collections[3].coverImage}
                alt="The Permanent Archive"
                fallbackTitle="Permanent Archive"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8CFBF] mb-1">
                  Perennial Editions
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight">
                  Essential Pieces
                </h3>
                <p className="text-xs text-[#E0D9CE] font-light mt-1">
                  Lifelong uniforms crafted from Mongolian cashmere and Tuscan leather.
                </p>
              </div>
            </Link>
          </div>

          {/* Panel 3: Contemporary Forms (col-span-5) */}
          <div className="md:col-span-5 group relative aspect-[4/3] md:aspect-auto bg-[#ECE8E1] overflow-hidden">
            <Link to="/collections/tactile-monoliths" className="block w-full h-full relative">
              <ImageWithFallback
                src={collections[1].coverImage}
                alt="Tactile Monoliths"
                fallbackTitle="Tactile Monoliths"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8CFBF] mb-1">
                  Spring / Summer
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-normal leading-tight">
                  Contemporary Forms
                </h3>
                <p className="text-xs text-[#E0D9CE] font-light mt-1">
                  Washed Belgian linens and architectural cotton gabardines.
                </p>
              </div>
            </Link>
          </div>

          {/* Panel 4: The Lookbook (col-span-7) */}
          <div className="md:col-span-7 group relative aspect-[4/3] md:aspect-[16/10] bg-[#ECE8E1] overflow-hidden">
            <Link to="/portfolio/ethereal-drapery" className="block w-full h-full relative">
              <ImageWithFallback
                src={collections[2].coverImage}
                alt="The Lookbook"
                fallbackTitle="The Lookbook"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-10 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8CFBF] mb-1">
                  Editorial Monograph
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal leading-tight">
                  The Lookbook
                </h3>
                <p className="text-xs md:text-sm text-[#E0D9CE] font-light max-w-md mt-1">
                  Visual stories, silhouette studies, and spatial compositions captured in natural daylight.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] underline underline-offset-4 group-hover:text-[#F8F6F1]">
                  <span>Enter the Lookbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Grid (6 pieces) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#E8E4DC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="editorial-subheading">Ready to Wear</span>
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight font-normal text-[#171717] mt-1">
              Curated Garments
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.2em] text-[#635B50] hover:text-black transition-colors inline-flex items-center gap-1 group"
          >
            <span>View All Pieces ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Designer Introduction (2-Column Editorial) */}
      <section className="py-24 px-6 md:px-12 bg-[#F2EFE8] border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait / Creative Atelier Space */}
          <div className="md:col-span-5 aspect-[4/5] bg-[#E5E0D6] overflow-hidden relative shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
              alt="Designer Atelier Workspace"
              fallbackTitle="Atelier Studio"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/80 backdrop-blur-xs text-white p-3 text-[11px] uppercase tracking-widest flex justify-between items-center">
              <span>The Creative Studio</span>
              <span className="font-mono text-[#D8CFBF]">Zurich / Paris</span>
            </div>
          </div>

          {/* Right Column: Editorial Statement */}
          <div className="md:col-span-7 space-y-6 md:pl-6">
            <span className="editorial-subheading">Atelier Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight font-normal leading-[1.1] text-[#171717]">
              DESIGNED WITH INTENTION.
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#524B41] font-light leading-relaxed">
              <p>
                Every silhouette created under Atelier Noir begins not with an arbitrary trend, but with an intimate interrogation of fiber, drape, and structural presence.
              </p>
              <p>
                Drawing inspiration from brutalist architecture, modern sculpture, and ancient monastic drapery, our work balances severe geometric discipline with unforced human movement. We reject disposable seasonal turnover in favor of enduring, heirloom-grade textiles crafted in partnership with multi-generational European mills.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link
                to="/about"
                className="px-7 py-3 bg-[#171717] text-[#F8F6F1] hover:bg-black text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2 group"
              >
                <span>Discover My Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="text-xs uppercase tracking-[0.2em] text-[#635B50] hover:text-black underline underline-offset-4 transition-colors"
              >
                Collaborations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Portfolio Highlight (3 selected creative projects) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#E8E4DC] pb-6">
          <div>
            <span className="editorial-subheading">Creative Direction &amp; Styling</span>
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight font-normal text-[#171717] mt-1">
              Selected Works
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="text-xs uppercase tracking-[0.2em] text-[#635B50] hover:text-black transition-colors inline-flex items-center gap-1 group"
          >
            <span>Explore Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="group flex flex-col text-left space-y-4"
            >
              <div className="relative aspect-[4/5] bg-[#ECE8E1] overflow-hidden">
                <ImageWithFallback
                  src={project.coverImage}
                  alt={project.title}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-xs text-white px-2.5 py-1 text-[9px] uppercase tracking-widest">
                  {project.category}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#7E7569]">
                  <span className="font-mono">{project.year}</span>
                  <span className="text-[11px] uppercase tracking-wider">{project.role}</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-[#171717] group-hover:text-[#635B50] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#6B6357] font-light line-clamp-2 leading-relaxed">
                  {project.brief}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-black underline underline-offset-4 pt-1">
                  View Project
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Editorial Lookbook Strip */}
      <section className="relative py-28 bg-[#171717] text-[#F8F6F1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5A99A]">
            Editorial Monograph Series
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal max-w-3xl mx-auto leading-tight">
            “THE SILHOUETTE IS A MONOLOGUE BETWEEN SPACE AND FORM.”
          </h2>
          <p className="text-sm md:text-base text-[#D0C7BC] max-w-xl mx-auto font-light leading-relaxed">
            Immerse yourself in our continuous lookbook visual journals capturing seasonal gestures, draping sessions, and gallery installations.
          </p>
          <div className="pt-4">
            <Link
              to="/collections/form-and-void"
              className="px-8 py-3.5 bg-[#F8F6F1] text-[#171717] hover:bg-white text-xs uppercase tracking-[0.2em] font-medium transition-all inline-flex items-center gap-2 group"
            >
              <span>Enter the Lookbook</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Ambient background photograph */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=70"
            alt="Lookbook strip background"
            fallbackTitle="Lookbook Monograph"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};
