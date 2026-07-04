import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, MessageSquare, Briefcase, Award, Sparkles, Send } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  image: string | null;
  bio: string;
  detailedBio: string;
  color: string;
  colorClass: string;
  textClass: string;
  skills: string[];
  achievements: string[];
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ isOpen, onClose, member }) => {
  if (!member) return null;

  // Render gradient background based on member color
  const getGradientBorder = () => {
    switch (member.color) {
      case "amber":
        return "border-amber-400/30 shadow-amber-400/10";
      case "purple":
        return "border-purple-400/30 shadow-purple-400/10";
      case "pink":
        return "border-pink-400/30 shadow-pink-400/10";
      case "cyan":
        return "border-cyan-400/30 shadow-cyan-400/10";
      default:
        return "border-purple-400/30 shadow-purple-400/10";
    }
  };

  const getWhatsAppUrl = () => {
    const text = `Hello Vertex Technology Ltd, I am looking to consult with *${member.name}* (${member.role}) regarding a digital engineering project.`;
    return `https://wa.me/2348158432605?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark overlay backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative bg-[#160a33] text-white rounded-[32px] w-full max-w-2xl shadow-2xl border ${getGradientBorder()} overflow-hidden z-10`}
          >
            {/* Top Corner Colorful Highlight */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${member.colorClass} opacity-10 blur-3xl pointer-events-none`} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Left: Beautiful Photo & Tag */}
                <div className="md:col-span-5 text-center md:text-left space-y-4">
                  <div className={`relative w-40 h-40 mx-auto md:mx-0 rounded-[24px] overflow-hidden border-2 border-white/15 shadow-2xl bg-neutral-900 group`}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-bold font-mono text-neutral-500">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-3">
                      <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${member.textClass}`}>
                        {member.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-center md:text-left">
                    <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono text-purple-300 uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 text-amber-400" /> ACTIVE MEMBER
                    </span>
                    <h4 className="text-xl font-black text-white tracking-tight mt-1">{member.name}</h4>
                    <p className={`text-xs font-mono font-bold ${member.textClass} mt-0.5 uppercase`}>{member.role}</p>
                  </div>
                </div>

                {/* Right: Detailed professional stats */}
                <div className="md:col-span-7 text-left space-y-6">
                  
                  {/* Detailed Biography */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <Briefcase className="w-3.5 h-3.5" /> Professional Bio
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {member.detailedBio}
                    </p>
                  </div>

                  {/* Core Technical Expertise */}
                  <div className="space-y-2.5">
                    <div className="text-neutral-400 text-xs font-mono font-bold uppercase tracking-wider">
                      // core expertise
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-[10px] sm:text-xs font-mono bg-[#21124d] border border-[#3c2583]/50 text-neutral-200 px-3 py-1 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Major Project Milestones */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Milestones & Achievements
                    </div>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-2.5 bg-white/5 border border-white/5 p-2.5 rounded-xl">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${member.textClass}`} />
                          <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Action and Footer block */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SLA Guarantee Enabled</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Close Profile
                  </button>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    Consult {member.name.split(" ")[0]}
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
