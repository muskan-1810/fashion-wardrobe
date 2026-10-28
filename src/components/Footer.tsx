import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../data/navigation';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-[#F8F6F1] pt-20 pb-12 border-t border-[#292826]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2C2926]">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-6">
            <span className="font-serif tracking-[0.25em] text-2xl uppercase font-normal text-[#F8F6F1] block">
              ATELIER NOIR
            </span>
            <p className="text-sm leading-relaxed text-[#B5A99A] max-w-md font-light">
              An understated luxury fashion editorial monograph and contemporary online boutique exploring the dialogue between architectural form, tactile materials, and timeless identity.
            </p>
            <div className="pt-2 text-xs uppercase tracking-widest text-[#8A8175] space-y-1">
              <p>Creative Direction &amp; Tailoring Atelier</p>
              <p className="text-[#B5A99A]">Permanent Archives &amp; Limited Seasonal Editions</p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#F8F6F1]">
              Boutique
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#A3998D]">
              {footerLinks.boutique.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-[#F8F6F1] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#F8F6F1]">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#A3998D]">
              {footerLinks.portfolio.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-[#F8F6F1] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#F8F6F1]">
              Atelier &amp; Contact
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#A3998D]">
              {footerLinks.atelier.map(link => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F8F6F1] transition-colors inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="hover:text-[#F8F6F1] transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-widest text-[#7E7569] block mb-1">
                Direct Studio Concierge
              </span>
              <a
                href="mailto:concierge@atelier-noir.com"
                className="text-xs text-[#E0D9CE] hover:underline"
              >
                concierge@atelier-noir.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#7E7569]">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} ATELIER NOIR. All rights reserved.
            </p>
            <p className="text-[11px] text-[#696156]">
              Designed &amp; built as an editorial fashion portfolio prototype for Muskan.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase text-[#8A8175]">
            <Link to="/about" className="hover:text-[#F8F6F1] transition-colors">
              Philosophy
            </Link>
            <span aria-hidden="true" className="text-[#423E39]">·</span>
            <Link to="/contact" className="hover:text-[#F8F6F1] transition-colors">
              Commissions
            </Link>
            <span aria-hidden="true" className="text-[#423E39]">·</span>
            <a
              href="https://github.com/muskan-1810"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8F6F1] transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
