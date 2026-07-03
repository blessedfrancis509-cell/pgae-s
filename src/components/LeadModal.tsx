import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight, ShieldCheck, Clipboard, MessageSquare, Send, Calendar, Star, Mail, Phone, Copy, CheckCircle2 } from "lucide-react";
import { SERVICES, EXTRA_PRODUCTS } from "../data";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, preselectedProduct }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSolution, setSelectedSolution] = useState(preselectedProduct || SERVICES[0].title);
  const [customMsg, setCustomMsg] = useState("");
  const [status, setStatus] = useState<"form" | "success">("form");
  const [ticketId, setTicketId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [directEmail, setDirectEmail] = useState("");
  const [directPhone, setDirectPhone] = useState("");
  const [showDirectInfo, setShowDirectInfo] = useState(false);

  // Auto-fill solution state when preselectedProduct changes
  React.useEffect(() => {
    if (preselectedProduct) {
      setSelectedSolution(preselectedProduct);
    }
  }, [preselectedProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Generate a beautiful fintech ticket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const generatedTicket = `VTX-2026-${randomHex}`;
    setTicketId(generatedTicket);
    setStatus("success");
  };

  const copyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build the live WhatsApp API redirect URL
  const getWhatsAppUrl = () => {
    const defaultText = `Hello Vertex Fintech Ltd,\n\nMy name is *${name}*.\nI would like to order/consult on: *${selectedSolution}*\n\n*Contact Details*:\n- Phone: ${phone}\n- Email: ${email || "Not provided"}\n\n*Additional Message*:\n"${customMsg || "I would like to receive more information and get started."}"\n\n*System Ticket Ref*: *${ticketId}*`;
    return `https://wa.me/2348158432605?text=${encodeURIComponent(defaultText)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white text-neutral-900 rounded-3xl w-full max-w-lg shadow-2xl border border-neutral-100 overflow-hidden z-10 p-5 sm:p-7"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-950 p-1.5 rounded-full hover:bg-neutral-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "form" ? (
              <div>
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-purple-600 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" /> Book Consultation
                  </div>
                  <h4 className="text-xl font-extrabold text-neutral-900 mt-1">
                    Get Started with Vertex
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Describe your digital goals, and our professional consultants will guide you through setup.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 815 843 2605"
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. johndoe@company.com"
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-colors"
                    />
                  </div>

                  {/* Solution selector */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Selected Digital Solution
                    </label>
                    <select
                      value={selectedSolution}
                      onChange={(e) => setSelectedSolution(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-colors"
                    >
                      <optgroup label="Core Solutions">
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Additional Provisions">
                        {EXTRA_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.title}>{p.title}</option>
                        ))}
                      </optgroup>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>

                  {/* Custom Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Tell us about your brand / business goals
                    </label>
                    <textarea
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                      placeholder="e.g. I need a modern web application for my retail startup and virtual phone numbers for registrations."
                      rows={3}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-purple-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-colors resize-none"
                    />
                  </div>

                  {/* Guarantee Stamp */}
                  <div className="flex items-center gap-1.5 bg-neutral-50 rounded-xl p-2.5 border border-neutral-200/60 text-[10px] text-neutral-500">
                    <ShieldCheck className="w-4.5 h-4.5 text-purple-600 flex-shrink-0" />
                    <span>Your data is strictly encrypted. Vertex Guarantee: No spam, only solutions.</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-neutral-100 hover:bg-neutral-200 hover:scale-103 text-neutral-700 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 hover:scale-103 hover:-translate-y-0.5 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/10 hover:shadow-purple-900/30 transition-all duration-300 active:scale-95"
                    >
                      Register Request
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h4 className="text-lg font-extrabold text-neutral-900">Request Successfully Registered!</h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                  We've initialized your professional consultation ticket. To accelerate processing, click below to connect directly with our active managers via WhatsApp.
                </p>

                {/* Ticket Reference Panel */}
                <div className="bg-neutral-50 rounded-2xl p-4.5 border border-neutral-200 my-4 max-w-sm mx-auto">
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                    <span>FINTECH TRANSACTION REFERENCE</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-3 py-2 mt-1.5 font-mono text-sm shadow-sm">
                    <span className="font-bold text-neutral-800">{ticketId}</span>
                    <button
                      onClick={copyTicket}
                      className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <Clipboard className="w-3.5 h-3.5" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Chat Trigger Button */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-sm bg-emerald-500 hover:bg-emerald-600 hover:scale-103 hover:-translate-y-0.5 text-white font-bold py-3 px-4 rounded-xl text-xs items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/35 transition-all duration-300 active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  Continue & Complete on WhatsApp
                  <Send className="w-3.5 h-3.5" />
                </a>

                <div className="mt-3 text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Vertex Hotline: 08158432605</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
