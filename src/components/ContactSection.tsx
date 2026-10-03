import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Send, Loader2 } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState(
    initialService ? `Hi Mateo, I'd like to collaborate on a ${initialService} project.` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading and Promises */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4625] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </span>
              <span className="text-neutral-300">Let's Work Together</span>
            </div>

            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Let’s collaborate on your next video project.
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
              Enter your details below and I’ll get back to you as soon as possible.
            </p>
          </div>

          {/* Guarantee Badges */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="text-[#FF4625] font-bold">✦</span>
              <span>24/7 Full Time Support</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="text-[#FF4625] font-bold">✦</span>
              <span>Available Worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="lg:col-span-6">
          {isSubmitted ? (
            <div className="bg-[#121212] border border-emerald-500/30 rounded-2xl p-8 sm:p-10 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                Thank you, <span className="text-white font-medium">{name}</span>. I've received your request and will reply to <span className="text-white font-medium">{email}</span> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setDetails('');
                }}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4625] transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4625] transition-colors"
                  required
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Write more details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4625] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#FF4625] hover:bg-[#ff5738] active:scale-[0.99] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FF4625]/25 transition-all duration-150 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
