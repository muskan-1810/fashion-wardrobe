import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category = 'Garments' }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const sizeChartCm = [
    { size: 'XS', it: '38', bust: '80-84', waist: '60-64', hip: '86-90', sleeve: '59' },
    { size: 'S', it: '40', bust: '84-88', waist: '64-68', hip: '90-94', sleeve: '60' },
    { size: 'M', it: '42', bust: '88-92', waist: '68-72', hip: '94-98', sleeve: '61' },
    { size: 'L', it: '44', bust: '92-96', waist: '72-76', hip: '98-102', sleeve: '62' },
    { size: 'XL', it: '46', bust: '96-102', waist: '76-82', hip: '102-108', sleeve: '63' },
  ];

  const sizeChartIn = [
    { size: 'XS', it: '38', bust: '31.5-33', waist: '23.5-25', hip: '34-35.5', sleeve: '23.2' },
    { size: 'S', it: '40', bust: '33-34.5', waist: '25-27', hip: '35.5-37', sleeve: '23.6' },
    { size: 'M', it: '42', bust: '34.5-36', waist: '27-28.5', hip: '37-38.5', sleeve: '24' },
    { size: 'L', it: '44', bust: '36-38', waist: '28.5-30', hip: '38.5-40', sleeve: '24.4' },
    { size: 'XL', it: '46', bust: '38-40', waist: '30-32.5', hip: '40-42.5', sleeve: '24.8' },
  ];

  const currentChart = unit === 'cm' ? sizeChartCm : sizeChartIn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Size & Proportions Guide"
      className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#F8F6F1] text-[#171717] p-6 md:p-8 border border-[#E8E4DC] shadow-2xl space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#7E7569]" />
            <div>
              <h3 className="font-serif text-xl tracking-wide uppercase font-medium">
                Atelier Proportions &amp; Sizing
              </h3>
              <span className="text-[11px] text-[#7E7569] uppercase tracking-wider">
                Category: {category}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#544D44] hover:text-black transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#635B50]">
            Measurements represent body dimensions. All silhouettes are tailored with intentional ease.
          </p>

          <div className="flex items-center border border-[#D5CFC5] p-0.5 bg-white text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'cm' ? 'bg-[#171717] text-white' : 'text-[#7E7569] hover:text-black'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 font-medium transition-colors ${
                unit === 'in' ? 'bg-[#171717] text-white' : 'text-[#7E7569] hover:text-black'
              }`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#D5CFC5] text-[11px] uppercase tracking-wider text-[#7E7569]">
                <th className="py-2.5 pr-4 font-semibold">Standard</th>
                <th className="py-2.5 px-3 font-semibold">IT / EU</th>
                <th className="py-2.5 px-3 font-semibold">Bust / Chest</th>
                <th className="py-2.5 px-3 font-semibold">Waist</th>
                <th className="py-2.5 px-3 font-semibold">Hip</th>
                <th className="py-2.5 pl-3 font-semibold">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4DC] font-mono tabular-nums text-[#2C2926]">
              {currentChart.map(row => (
                <tr key={row.size} className="hover:bg-[#F2EFE8] transition-colors">
                  <td className="py-3 pr-4 font-sans font-semibold text-black">{row.size}</td>
                  <td className="py-3 px-3">{row.it}</td>
                  <td className="py-3 px-3">{row.bust} {unit}</td>
                  <td className="py-3 px-3">{row.waist} {unit}</td>
                  <td className="py-3 px-3">{row.hip} {unit}</td>
                  <td className="py-3 pl-3">{row.sleeve} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Advice */}
        <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs text-[#635B50]">
          <h4 className="font-serif text-sm font-medium uppercase text-black">
            Tailoring Philosophy &amp; Advice
          </h4>
          <p className="leading-relaxed">
            Our coats and knitwear are drafted with sculpted drop shoulders and relaxed armscyes. If you prefer a tailored profile closer to classical European suiting, consider taking one size down.
          </p>
          <p className="text-[11px] text-[#8C8377]">
            For bespoke garment measurements or custom alterations advice, contact concierge@atelier-noir.com.
          </p>
        </div>
      </div>
    </div>
  );
};
