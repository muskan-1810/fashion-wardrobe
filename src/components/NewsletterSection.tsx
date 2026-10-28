import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { isValidEmail } from '../utils/commerceLogic';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 px-6 md:px-10 border-t border-[#E8E4DC] bg-[#F4F1EA]">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="editorial-subheading">Dispatch from the Studio</span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#171717] tracking-tight uppercase font-normal">
          LETTERS FROM THE ATELIER.
        </h2>
        <p className="text-sm md:text-base text-[#6B6357] max-w-lg mx-auto font-light leading-relaxed">
          New collections, visual stories, and occasional notes from the studio. Issued sparingly with intention.
        </p>

        {isSubmitted ? (
          <div className="p-6 bg-[#EBE7DE] border border-[#DDD7CD] max-w-md mx-auto text-center space-y-2 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 text-[#2C2926]">
              <CheckCircle2 className="w-5 h-5 text-[#2B593F]" />
              <span className="font-serif text-base font-medium">Invitation Recorded</span>
            </div>
            <p className="text-xs text-[#736B60] leading-relaxed">
              Thank you for subscribing with <span className="font-mono text-black">{email}</span>. You will receive private announcements prior to public releases.
            </p>
            <p className="text-[10px] text-[#9A9184] italic">
              (Demo notification: No marketing spam will be sent)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex border-b border-[#171717] bg-transparent focus-within:border-black transition-colors">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address"
                className="w-full py-3 px-1 text-sm bg-transparent placeholder:text-[#9A9184] text-[#171717] focus:outline-none"
                aria-label="Email address for atelier letters"
              />
              <button
                type="submit"
                className="px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-black flex items-center gap-1.5 transition-colors group shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-[#B91C1C] text-left pt-1" role="alert">
                {error}
              </p>
            )}

            <p className="text-[11px] text-[#8C8377] text-left pt-1 font-light">
              We respect your privacy. Unsubscribe at any time with a single click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
