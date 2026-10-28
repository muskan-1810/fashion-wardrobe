import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { isValidEmail } from '../utils/commerceLogic';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Brand Collaboration',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    'Brand Collaboration',
    'Creative Direction',
    'Editorial Styling',
    'Private Commission',
    'Press & Publications',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details regarding your inquiry.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Header */}
      <div className="mb-16 border-b border-[#E8E4DC] pb-8 space-y-4">
        <span className="editorial-subheading">Commissions &amp; Dialogues</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal text-[#171717]">
          STUDIO INQUIRIES.
        </h1>
        <p className="text-sm md:text-base text-[#635B50] max-w-2xl font-light leading-relaxed">
          For creative direction, brand collaborations, custom garment commissions, or press monographs, please submit your inquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Studio Details (col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#F4F1EA] border border-[#E8E4DC] space-y-6">
            <div>
              <span className="editorial-subheading">Direct Contact</span>
              <h3 className="font-serif text-2xl uppercase tracking-tight text-[#171717] mt-1">
                Atelier Concierge
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7E7569] shrink-0 mt-0.5" />
                <div>
                  <span className="uppercase tracking-widest text-[#7E7569] block text-[10px]">
                    General &amp; Editorial Inquiries
                  </span>
                  <a
                    href="mailto:concierge@atelier-noir.com"
                    className="font-medium text-black hover:underline"
                  >
                    concierge@atelier-noir.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7E7569] shrink-0 mt-0.5" />
                <div>
                  <span className="uppercase tracking-widest text-[#7E7569] block text-[10px]">
                    Studio &amp; Showroom Location
                  </span>
                  <p className="text-[#4A453F]">
                    Atelier Noir Design Laboratory<br />
                    Available by private appointment for seasonal fittings.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDD7CD] space-y-2 text-xs">
              <span className="uppercase tracking-widest text-[#7E7569] block text-[10px]">
                Digital Archive &amp; Code
              </span>
              <a
                href="https://github.com/muskan-1810"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-black hover:underline font-medium"
              >
                <span>github.com/muskan-1810</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-6 bg-[#EBE7DE] border border-[#DDD7CD] text-xs text-[#544D44] space-y-2">
            <h4 className="font-serif text-sm font-medium uppercase text-black">
              Response Commitment
            </h4>
            <p className="leading-relaxed">
              We personally review all commission proposals. Inquiries typically receive a response within 48 studio business hours.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form (col-span-7) */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="p-8 md:p-12 bg-[#F4F1EA] border border-[#E8E4DC] text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#171717] text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <span className="editorial-subheading">Inquiry Transmitted</span>
              <h2 className="font-serif text-3xl uppercase tracking-tight text-[#171717]">
                Thank You, {formData.name}.
              </h2>

              <p className="text-sm text-[#544D44] max-w-md mx-auto font-light leading-relaxed">
                Your inquiry regarding <strong>{formData.inquiryType}</strong> has been received by the atelier. We will reach back to you at <span className="font-mono text-black">{formData.email}</span>.
              </p>

              <div className="p-3 bg-[#EAE5DB] border border-[#D5CFC5] max-w-sm mx-auto text-[11px] text-[#736B60] italic">
                (Demo mode: This is a front-end presentation prototype. Messages are safely validated without dispatching external SMTP traffic.)
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', inquiryType: 'Brand Collaboration', message: '' });
                }}
                className="mt-4 px-6 py-2.5 border border-[#171717] text-xs uppercase tracking-widest hover:bg-[#171717] hover:text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#171717]"
                >
                  Full Name <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Lindqvist"
                  className={`w-full p-3.5 bg-white border text-sm text-[#171717] focus:outline-none focus:border-black transition-colors ${
                    errors.name ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-[#B91C1C]" role="alert">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#171717]"
                >
                  Email Address <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className={`w-full p-3.5 bg-white border text-sm text-[#171717] focus:outline-none focus:border-black transition-colors ${
                    errors.email ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-[#B91C1C]" role="alert">{errors.email}</p>
                )}
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-type"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#171717]"
                >
                  Nature of Inquiry
                </label>
                <select
                  id="contact-type"
                  value={formData.inquiryType}
                  onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full p-3.5 bg-white border border-[#D5CFC5] text-sm text-[#171717] focus:outline-none focus:border-black cursor-pointer"
                >
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#171717]"
                >
                  Project Details or Message <span className="text-[#B91C1C]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the scope, timeline, desired garments or creative deliverables..."
                  className={`w-full p-3.5 bg-white border text-sm text-[#171717] focus:outline-none focus:border-black transition-colors ${
                    errors.message ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-[#B91C1C]" role="alert">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#171717] hover:bg-black text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[11px] text-[#7E7569] text-center font-light">
                Your private contact details are never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
