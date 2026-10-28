import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Scissors, Layers, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Header */}
      <div className="mb-16 border-b border-[#E8E4DC] pb-10 space-y-4">
        <span className="editorial-subheading">Designer Monograph</span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal leading-[1.08] text-[#171717] max-w-4xl">
          “CLOTHING IS A LANGUAGE. DESIGN IS HOW I SPEAK.”
        </h1>
        <p className="text-sm md:text-base text-[#635B50] max-w-2xl font-light leading-relaxed">
          Atelier Noir is a personal fashion design laboratory and creative direction studio exploring architectural drapery, tactile monoliths, and honest craftsmanship.
        </p>
      </div>

      {/* Main Two-Column Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Studio Portrait Column (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[4/5] bg-[#ECE8E1] overflow-hidden shadow-sm">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80"
              alt="Designer Atelier Portrait"
              fallbackTitle="Designer Portrait"
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/85 backdrop-blur-xs text-white p-3 text-[11px] uppercase tracking-widest flex justify-between items-center">
              <span>Studio Founder &amp; Director</span>
              <span className="font-mono text-[#D8CFBF]">Muskan</span>
            </div>
          </div>

          <div className="p-4 bg-[#F2EFE8] border border-[#E8E4DC] text-xs text-[#635B50] space-y-1">
            <p className="font-semibold text-black uppercase tracking-wider text-[11px]">
              Studio Location &amp; Inquiries
            </p>
            <p>Atelier Noir Creative Studies</p>
            <p className="text-[#8C8377]">Direct inquiries: concierge@atelier-noir.com</p>
          </div>
        </div>

        {/* Narrative & Philosophy Column (col-span-7) */}
        <div className="lg:col-span-7 space-y-8 lg:pl-6 text-[#4A453F] font-light leading-relaxed">
          <div className="space-y-4">
            <span className="editorial-subheading">Personal Introduction</span>
            <h2 className="font-serif text-3xl font-normal text-[#171717] tracking-tight uppercase">
              The Tension Between Form and Ease
            </h2>
            <p className="text-base text-[#2C2926]">
              I approach fashion not as a seasonal novelty, but as a spatial boundary between the wearer and their environment. Clothing is tactile sculpture in motion.
            </p>
            <p>
              Trained through pattern cutting, tactile textile analysis, and modern art direction, my work centers on the discipline of subtraction: removing unnecessary ornamentation so that raw proportion, texture, and posture take center stage.
            </p>
          </div>

          {/* Creative Philosophy Box */}
          <div id="philosophy" className="p-8 bg-[#F4F1EA] border-l-2 border-[#171717] space-y-4">
            <h3 className="font-serif text-xl uppercase tracking-wide text-[#171717] font-medium">
              Four Core Studio Principles
            </h3>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <span className="font-serif font-semibold text-black shrink-0">01.</span>
                <span><strong>Material Truth:</strong> We select only pure fibers—raw tussah silk, Biella virgin wool, and Belgian flax—celebrating their organic textures rather than masking them.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-serif font-semibold text-black shrink-0">02.</span>
                <span><strong>Architectural Integrity:</strong> Silhouettes are engineered from within using internal canvas, sculpted darts, and natural gravity rather than artificial stiffeners.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-serif font-semibold text-black shrink-0">03.</span>
                <span><strong>Perennial Relevance:</strong> Every piece is designed to be worn across years and decades, gaining character and patina with each wear.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-serif font-semibold text-black shrink-0">04.</span>
                <span><strong>Editorial Storytelling:</strong> A garment is complete only when captured in natural light, documenting its relationship with space and movement.</span>
              </li>
            </ul>
          </div>

          {/* Areas of Expertise */}
          <div className="space-y-4 pt-4">
            <span className="editorial-subheading">Disciplines &amp; Craft</span>
            <h3 className="font-serif text-2xl uppercase tracking-tight text-[#171717]">
              Areas of Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-[#E8E4DC] bg-white space-y-1">
                <h4 className="font-serif text-base font-medium text-black">Tailoring &amp; Silhouette Engineering</h4>
                <p className="text-xs text-[#7E7569]">Pattern drafting, canvassed jackets, and volumetric trouser cuts.</p>
              </div>

              <div className="p-4 border border-[#E8E4DC] bg-white space-y-1">
                <h4 className="font-serif text-base font-medium text-black">Campaign Art Direction</h4>
                <p className="text-xs text-[#7E7569]">Visual concept development, location curation, and lighting design.</p>
              </div>

              <div className="p-4 border border-[#E8E4DC] bg-white space-y-1">
                <h4 className="font-serif text-base font-medium text-black">Textile &amp; Fiber Sourcing</h4>
                <p className="text-xs text-[#7E7569]">Direct partnerships with European heritage mills and natural dye houses.</p>
              </div>

              <div className="p-4 border border-[#E8E4DC] bg-white space-y-1">
                <h4 className="font-serif text-base font-medium text-black">Lookbook &amp; Publication Design</h4>
                <p className="text-xs text-[#7E7569]">Sequential visual pacing, monograph typography, and object packaging.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 flex items-center gap-6">
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-[#171717] text-[#F8F6F1] hover:bg-black text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2 group"
            >
              <span>Initiate Collaboration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-[0.16em] text-[#635B50] hover:text-black underline underline-offset-4 transition-colors"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
