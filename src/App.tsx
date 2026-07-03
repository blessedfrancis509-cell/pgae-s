import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, Smartphone, Monitor, Palette, Briefcase, Megaphone, 
  PhoneCall, Share2, ShieldCheck, Globe, Smile, Award, Clock, 
  ArrowRight, ChevronRight, Check, Phone, Shield, Users, 
  Star, Send, Sparkles, MessageSquare, Menu, X, ArrowUpRight, Lock, CheckCircle2, Zap, Cpu,
  Layers, ExternalLink, Terminal
} from "lucide-react";

import { SERVICES, EXTRA_PRODUCTS, PARTNERS, STATS } from "./data";
import { Service } from "./types";
import { Mockups } from "./components/Mockups";
import { LeadModal } from "./components/LeadModal";
import { TeamMemberModal } from "./components/TeamMemberModal";
import { FloatingParticles } from "./components/FloatingParticles";

const FAQS = [
  {
    question: "What are your average cloud deployment and infrastructure setup times?",
    answer: "For standard web applications, initial environments are configured and live within 48 to 72 hours. For complex enterprise clusters requiring Kubernetes orchestration, multi-region load balancing, or full tokenomics integration, setup ranges from 1 to 2 weeks, backed by continuous deployment automation."
  },
  {
    question: "Do you design and deploy custom cryptocurrency ecosystems and tokens?",
    answer: "Yes. We design end-to-end token economies (tokenomics), craft and deploy custom utility or gas tokens (including ERC-20, BEP-20, and custom smart contract architectures), and build fully audited Solidity smart contracts. We also build secure decentralized application (dApp) interfaces that connect with external Web3 wallets seamlessly."
  },
  {
    question: "How experienced is the engineering and creative team?",
    answer: "Our elite team is led by Blessed Francis (CEO & Lead Software Architect) and senior technologists. Each team member has 8+ years of production experience in React, Next.js, Kubernetes, and Web3 environments. We pride ourselves on clean code, SRE standards, and pixel-perfect brand identity layouts."
  },
  {
    question: "What is your approach to brand identity and UI/UX design?",
    answer: "We treat brand design as the bedrock of digital products. We craft bespoke brand guidelines, corporate logos, color theories, custom display typography, and high-fidelity interactive user interfaces. Our designs focus on modern Swiss-minimalist aesthetics, spacious layouts, and smooth motion animations."
  },
  {
    question: "Do you provide custom pricing packages and retainer options?",
    answer: "Absolutely. We offer flexible plans tailored to your growth stage, including fixed-bid project agreements for concrete scopes, monthly retainers for dedicated engineering/design sprints, and SLA-backed maintenance packages for continuous operations."
  }
];

const PROJECTS = [
  {
    id: "apexdex",
    title: "ApexDEX AMM Protocol",
    category: "DeFi Ecosystem & Token Creation",
    description: "Formulated a robust token economy structure and deployed custom ERC-20 utility tokens with custom Solidity smart contracts. Integrated an interactive real-time crypto analytical dashboard with wallet connection capabilities.",
    metric: "$4.2M+ Audited Volume",
    tech: ["Solidity", "ERC-20 Token", "React", "Ethers.js"],
    color: "from-amber-500 via-orange-500 to-yellow-400",
    iconName: "Cpu",
    imageSrc: "/src/assets/images/apexdex_website_mockup_1783108355071.jpg",
    specs: [
      { label: "Contract Audited By", value: "ConsenSys Diligence" },
      { label: "AMM Formula Type", value: "Constant Product (x * y = k)" },
      { label: "Standard Implemented", value: "ERC-20 & ERC-2612 Permits" },
      { label: "Gas Optimization Level", value: "98.4% Yul Optimizer" }
    ],
    codeSnippet: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ApexToken is ERC20, ReentrancyGuard {
    address public immutable governor;
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;

    constructor(address _gov) ERC20("Apex Utility Token", "APX") {
        governor = _gov;
        _mint(_gov, MAX_SUPPLY);
    }
}`
  },
  {
    id: "cloudscale",
    title: "CloudScale SRE Orchestrator",
    category: "Resilient Cloud Infrastructure",
    description: "Designed multi-region serverless Kubernetes clusters running custom load-balanced microservices. Implemented end-to-end automated CI/CD pipelines with prometheus metrics.",
    metric: "99.99% Cloud Uptime SLA",
    tech: ["Kubernetes", "GCP Cloud", "Terraform", "Docker"],
    color: "from-purple-500 via-indigo-500 to-blue-600",
    iconName: "Terminal",
    imageSrc: "/src/assets/images/cloudscale_panel_mockup_1783108366421.jpg",
    specs: [
      { label: "Cluster Type", value: "Multi-Region GKE Autopilot" },
      { label: "Infrastructure Code", value: "Terraform 1.5 Modular State" },
      { label: "CI/CD Deployment Speed", value: "Trigger to Production in 114s" },
      { label: "Telemetry & Logs", value: "Prometheus + Grafana + Loki Stack" }
    ],
    codeSnippet: `resource "google_container_cluster" "primary" {
  name     = "cloudscale-production-cluster"
  location = "europe-west2"
  
  enable_autopilot = true
  ip_allocation_policy {}

  release_channel {
    channel = "STABLE"
  }
}`
  },
  {
    id: "equinox",
    title: "Equinox Brand & Identity System",
    category: "Bespoke Brand & Asset Design",
    description: "Engineered a luxury corporate brand blueprint, including logo designs, customized display typography palettes, spatial grid standards, and fluid motion design guidelines.",
    metric: "140% User Engagement Growth",
    tech: ["Brand Guidelines", "Logo design", "Framer Motion", "UI System"],
    color: "from-pink-500 via-rose-500 to-purple-600",
    iconName: "Palette",
    imageSrc: "/src/assets/images/equinox_brand_mockup_1783108377728.jpg",
    specs: [
      { label: "Design Grid Standard", value: "8px Spatial Subgrid System" },
      { label: "Color Space Selection", value: "Bespoke DCI-P3 High-Contrast" },
      { label: "Contrast Compliance", value: "WCAG 2.1 AAA Compliant Standards" },
      { label: "Motion Physics", value: "Custom GSAP & CSS Bezier Loops" }
    ],
    codeSnippet: `@theme {
  --font-display: "Space Grotesk", sans-serif;
  --font-editorial: "Playfair Display", serif;
  
  --color-brand-gold: #e5c158;
  --color-brand-charcoal: #0e0d10;
  
  --spacing-grid-gap: clamp(1rem, 4vw, 3.5rem);
}`
  },
  {
    id: "velopay",
    title: "VeloPay Enterprise Gateway",
    category: "High-Performance Web Application",
    description: "Constructed a secure, supercharged online banking panel. Designed micro-frontend components, custom database caching systems, and serverless edge functions for sub-100ms speeds.",
    metric: "0.1s Fast Render Speed",
    tech: ["Next.js", "Node.js", "Redis Caching", "Tailwind CSS"],
    color: "from-cyan-500 via-teal-500 to-blue-600",
    iconName: "Layers",
    imageSrc: "/src/assets/images/velopay_saas_mockup_1783108390567.jpg",
    specs: [
      { label: "Edge Response Latency", value: "Sub-12ms Memory Lookups" },
      { label: "Gateway Encryptions", value: "HMAC SHA-256 Signatures" },
      { label: "Primary Database", value: "Distributed CockroachDB Cluster" },
      { label: "Client Bundle Footprint", value: "72KB Gzipped Core Entry" }
    ],
    codeSnippet: `import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-velopay-signature");
  const payload = await req.json();
  
  const expected = createHmac("sha256", process.env.HMAC_SECRET!)
    .update(JSON.stringify(payload))
    .digest("hex");
    
  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid Sign" }, { status: 401 });
  }
}`
  }
];

// Reusable High-Fidelity Custom SVG Logo for Vertex Fintech Ltd
export const VertexLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gradientV1" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="gradientV2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4f46e5" floodOpacity="0.25" />
      </filter>
    </defs>
    
    {/* Stylized, overlapping multi-segment V */}
    <g filter="url(#shadow)">
      {/* Background swoosh */}
      <path
        d="M20,30 Q35,85 55,95 T100,30"
        stroke="url(#gradientV1)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Overlapping foreground segment */}
      <path
        d="M38,38 Q55,78 62,82 T90,32"
        stroke="url(#gradientV2)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
    </g>

    {/* Elegant floating accent circles representing digital fintech nodes */}
    <circle cx="20" cy="20" r="5" fill="#f59e0b" className="animate-pulse" />
    <circle cx="100" cy="20" r="5" fill="#ec4899" />
    <circle cx="55" cy="105" r="4" fill="#3b82f6" />
    <circle cx="78" cy="65" r="3" fill="#a855f7" />
  </svg>
);

const TEAM_MEMBERS = [
  {
    id: "eren-utsalo",
    name: "Eren Utsalo",
    role: "CEO & Lead Software Architect",
    tagline: "Founder & CEO",
    image: "/src/assets/images/ceo-photo.jpg",
    bio: "Directs software vision, core systems scaling, and digital engineering standards. Devoted to high-fidelity code.",
    detailedBio: "Eren Utsalo is the visionary behind Vertex Fintech Ltd. With over a decade of deep technical experience across distributed networks, scalable database clusters, and secure Web3 ecosystems, Eren oversees the architectural blueprint of all key client deployments. He is a passionate advocate of clean type-safe TypeScript, robust CI/CD, and highly optimized serverless pipelines.",
    color: "amber",
    colorClass: "from-amber-500 to-yellow-400",
    textClass: "text-amber-400",
    borderHover: "hover:border-amber-400/30 shadow-amber-400/5",
    skills: ["Next.js", "Cloud SRE", "System Arch", "TypeScript", "Solidity", "Kubernetes"],
    achievements: [
      "Led the architecture of ApexDEX with $4.2M+ audited token volume",
      "Architected secure cloud infrastructures for 350+ enterprises globally",
      "Pioneered serverless TypeScript pipelines that reduced render latency to 0.1s"
    ]
  },
  {
    id: "jeremiah-obazee",
    name: "Jeremiah Obazee",
    role: "Head of Cloud & DevOps",
    tagline: "Co-Founder / CTO",
    image: "/src/assets/images/jeremiah-photo.jpg",
    bio: "Kubernetes automation expert. Specializes in multi-cloud setups, secure vaults, and serverless clusters.",
    detailedBio: "Jeremiah is a seasoned DevOps SRE and systems automation lead with extensive expertise in Google Cloud Platform (GCP), AWS, and multi-region Kubernetes clusters. He is responsible for securing client infrastructure, establishing zero-downtime continuous delivery pipelines, and implementing real-time Prometheus monitoring arrays.",
    color: "purple",
    colorClass: "from-purple-500 to-indigo-500",
    textClass: "text-purple-400",
    borderHover: "hover:border-purple-400/30 shadow-purple-400/5",
    skills: ["Kubernetes", "Terraform", "AWS / GCP", "Docker", "SRE", "Prometheus"],
    achievements: [
      "Designed and deployed 120+ resilient Kubernetes cloud environments",
      "Automated continuous-deployment pipelines saving 40+ hours per sprint",
      "Achieved a consistent 99.99% system uptime record across all enterprise SLAs"
    ]
  },
  {
    id: "abel-johnson",
    name: "Abel Johnson",
    role: "Principal Frontend Engineer",
    tagline: "UI Principal",
    image: null,
    bio: "Develops high-speed interfaces with Tailwind CSS and Framer Motion for pixel-perfect user engagement.",
    detailedBio: "Abel is an award-winning creative technologist specializing in bespoke user experiences, spatial design systems, and responsive interactive web graphics. He bridges the gap between complex brand design parameters and efficient React implementation, ensuring gorgeous visual styling without sacrificing performance.",
    color: "pink",
    colorClass: "from-pink-500 to-rose-500",
    textClass: "text-pink-400",
    borderHover: "hover:border-pink-400/30 shadow-pink-400/5",
    skills: ["React / Vite", "Tailwind CSS", "Design Tokens", "Framer Motion", "UI/UX", "Brand Design"],
    achievements: [
      "Crafted bespoke design guidelines and logos for Equinox luxury project",
      "Optimized client frontend bundles to achieve perfect 100/100 Lighthouse scores",
      "Created highly modular component libraries adopted across all in-house products"
    ]
  },
  {
    id: "adebayo-faruq",
    name: "Adebayo Faruq",
    role: "Senior Fullstack Developer",
    tagline: "Lead Full-Stack",
    image: null,
    bio: "Designs high-throughput backend APIs, integrates serverless database modeling, and guarantees speed.",
    detailedBio: "Adebayo is a brilliant backend-heavy fullstack developer with a focus on fast database querying, secure API authentication, and serverless microservices. He has integrated payment gateways, distributed database systems, and robust notification hubs for clients across Europe and Africa.",
    color: "cyan",
    colorClass: "from-cyan-500 to-blue-500",
    textClass: "text-cyan-400",
    borderHover: "hover:border-cyan-400/30 shadow-cyan-400/5",
    skills: ["Node / Express", "PostgreSQL", "REST / GraphQL", "Redis Caching", "API Security", "NoSQL"],
    achievements: [
      "Architected backend microservices handling 50k+ daily API requests securely",
      "Integrated secure financial transaction layers with Stripe and multi-currency gateways",
      "Designed real-time database schemas that scaled seamlessly under high-volume spikes"
    ]
  }
];

export default function App() {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  // Monitor page scroll to apply blur effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Splash screen effect
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('vertex-splash-seen');
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('vertex-splash-seen', 'true');
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openOrderModal = (productName: string) => {
    setPreselectedProduct(productName);
    setIsModalOpen(true);
  };

  const testimonials = [
    {
      quote: "Vertex Technology Ltd transformed our entire cloud setup and web presence. They migrated our legacy monolith to a Next.js serverless architecture with a zero-downtime CI/CD pipeline. Unbelievably fast and professional.",
      author: "Farhan K.",
      role: "CTO, Apex Enterprise Systems",
      stars: 5
    },
    {
      quote: "The web development and custom UI system Vertex built gave our SaaS platform a tier-1 premium look that rivals Stripe. Our page load speeds dropped to 0.1s and user signups immediately increased by 40%!",
      author: "Chinedu O.",
      role: "Founder, PayBreeze Tech",
      stars: 5
    },
    {
      quote: "Exceptional engineering quality and robust DevOps design. They didn't just build a beautiful web frontend; they set up our secure cloud databases, automated backups, and multi-zone AWS clusters.",
      author: "Elena R.",
      role: "Head of Product, FinFlow Europe",
      stars: 5
    },
    {
      quote: "Vertex team delivered an outstanding, highly secure ERC-20 token economy and Solidity contracts within record time. Their architectural insights into liquidity pools and Web3 integrations saved us weeks of audit iterations.",
      author: "Marcus Y.",
      role: "Lead Web3 Developer, Apex DeFi Labs",
      stars: 5
    },
    {
      quote: "The cloud migration Jeremiah and his DevOps squad executed was flawless. Our continuous-deployment builds now take under 2 minutes, and our auto-scaling group seamlessly handled a 300% traffic surge on launch day.",
      author: "Amelie M.",
      role: "Director of Engineering, CloudScale Logistics",
      stars: 5
    },
    {
      quote: "Vertex redefined our luxury branding from the ground up, providing responsive grid layouts and fluid motion assets that perfectly capture our haute couture identity. Elegant, high-performance, and exquisite.",
      author: "Julian B.",
      role: "Creative Director, Equinox Couture",
      stars: 5
    }
  ];

  return (
    <div>

      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
      ) : (
        <div className="min-h-screen bg-[#FAF9FC] text-neutral-900 font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden relative z-0">
          
          {/* Sleek Interface Background Blobs */}
          <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 via-pink-500 via-orange-400 via-yellow-300 to-cyan-500 rounded-full blur-[110px] opacity-25 pointer-events-none -z-10 animate-gradient-loop animate-float-slow" />
          <div className="absolute top-[800px] left-[-100px] w-[450px] h-[450px] bg-gradient-to-tr from-blue-600 via-cyan-400 via-purple-500 to-pink-500 rounded-full blur-[110px] opacity-20 pointer-events-none -z-10 animate-gradient-loop animate-float-reverse" />
          <div className="absolute top-[1800px] right-[-100px] w-[550px] h-[550px] bg-gradient-to-tr from-pink-500 via-orange-400 via-yellow-400 to-cyan-500 rounded-full blur-[130px] opacity-15 pointer-events-none -z-10 animate-gradient-loop animate-float-slow" />
          <div className="absolute bottom-[200px] left-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 via-blue-500 via-cyan-400 to-pink-500 rounded-full blur-[120px] opacity-20 pointer-events-none -z-10 animate-gradient-loop animate-float-reverse" />

          {/* Background Particle layer behind header/hero */}
          <div className="absolute top-0 left-0 w-full h-[850px] overflow-hidden pointer-events-none -z-10">
            <FloatingParticles />
          </div>

          {/* 1. NAVIGATION BAR */}
          <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-40 transition-all duration-300 ${
            scrolled ? "top-2" : "top-4"
          }`}>
          <div className={`w-full rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all ${
            scrolled 
              ? "bg-[#160b33]/92 backdrop-blur-md border border-[#2e1d5e] shadow-xl" 
              : "bg-[#21104D]/95 border border-white/5 shadow-lg"
          }`}>
            {/* Logo Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <VertexLogo className="w-8 h-8 sm:w-9 sm:w-9" />
              </div>
              <div className="text-left">
                <span className="block text-white font-extrabold text-xs sm:text-sm tracking-widest font-sans uppercase transition-colors duration-300 group-hover:text-amber-400">
                  Vertex
                </span>
                <span className="block text-amber-400 font-mono text-[8px] sm:text-[9px] font-bold tracking-widest leading-none">
                  FINTECH LTD
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-neutral-200">
              {
            { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            { label: "Services", action: () => scrollToId("services") },
            { label: "Products", action: () => scrollToId("products") },
            { label: "About Us", action: () => scrollToId("about") },
            { label: "Why Us", action: () => scrollToId("why-us") },
            { label: "Portfolio", action: () => scrollToId("portfolio") },
            { label: "FAQ", action: () => scrollToId("faq") },
            { label: "Contact", action: () => scrollToId("contact") }
          ].map((link, idx) => (
            <button
              key={idx}
              onClick={link.action}
              className="hover:text-amber-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative py-1 text-neutral-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openOrderModal("General Consulting / Getting Started")}
            className="bg-amber-400 hover:bg-amber-500 hover:scale-105 hover:-translate-y-0.5 text-neutral-950 px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-lg shadow-amber-400/10 hover:shadow-amber-400/30 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 lg:hidden transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute top-16 left-0 right-0 bg-[#160b33]/95 backdrop-blur-xl border border-[#2e1d5e] rounded-2xl p-5 flex flex-col gap-3 shadow-2xl lg:hidden text-sm z-30"
            >
              {/* Header with Title and explicit Close button */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-1">
                <span className="font-bold text-amber-400 font-mono text-[10px] uppercase tracking-widest">Navigation Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>

              <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">Home</button>
              <button onClick={() => { scrollToId("services"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">Services</button>
              <button onClick={() => { scrollToId("products"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">Products</button>
              <button onClick={() => { scrollToId("about"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">About Us</button>
              <button onClick={() => { scrollToId("why-us"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">Why Us</button>
              <button onClick={() => { scrollToId("portfolio"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">Portfolio</button>
              <button onClick={() => { scrollToId("faq"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium border-b border-white/5">FAQ</button>
              <button onClick={() => { scrollToId("contact"); setMobileMenuOpen(false); }} className="text-left text-neutral-200 hover:text-amber-400 py-1.5 font-medium">Contact</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO CONTAINER (DEEP PURPLE ROUNDED BOX WITH ANIMATED GRADIENT) */}
      <main className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-tr from-[#160a33] via-[#21104D] via-[#33114d] via-[#10143a] via-[#1c0f42] to-[#160a33] animate-gradient-loop rounded-[40px] lg:rounded-[48px] p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Ambient Purple Grid Overlay & Glowing Circles */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(113,63,252,0.25),transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#ec4899]/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Main Hero grid split (Left Content with Headings, Right Device Showcase) */}
          <div className="grid grid-cols-12 gap-3 sm:gap-6 md:gap-10 items-center relative z-10">
            
            {/* Left Side Info column */}
            <div className="col-span-7 text-left space-y-3 sm:space-y-5 lg:space-y-7">
              
              {/* Badge with simples design write up */}
              <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[8px] xs:text-[10px] sm:text-xs font-semibold text-[#fcd34d] font-mono uppercase tracking-wider shadow-sm hover:scale-105 transition-transform duration-300">
                Premium Web Craftsmanship
              </div>

              {/* Headings */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-sans leading-none sm:leading-tight">
                  We Build.<br />
                  We Design.<br />
                  <span className="bg-gradient-to-r from-orange-400 via-pink-500 via-purple-400 via-cyan-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-gradient-loop text-gradient-shimmer">
                    We Grow.
                  </span>
                </h1>
              </div>

              {/* Paragraph tailored to web development */}
              <p className="text-[10px] sm:text-sm md:text-base text-neutral-300/90 leading-relaxed max-w-xl font-sans">
                Vertex Fintech Ltd designs and delivers high-performance web applications, resilient financial tech, cloud systems, and bespoke digital solutions built to scale.
              </p>

              {/* Responsive Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  onClick={() => scrollToId("services")}
                  className="bg-amber-400 hover:bg-amber-500 hover:scale-105 hover:-translate-y-0.5 text-neutral-950 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-extrabold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-lg shadow-amber-400/10 hover:shadow-amber-400/30 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Explore Services
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
                <a
                  href="https://wa.me/2348158432605?text=Hello%20Vertex%20Technology%20Ltd,%20I'd%20like%20to%20consult%20on%20your%20web%20development%20and%20cloud%20engineering%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-0.5 text-white border border-white/10 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-2 active:scale-95 transition-all duration-300"
                >
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span>Consult</span>
                  <span className="font-mono text-amber-300 hidden xs:inline">08158432605</span>
                </a>
              </div>
            </div>

            {/* Right: Device Showcase Component (sitting right next to the heading text) */}
            <div className="col-span-5 w-full flex items-center justify-center overflow-visible h-[140px] xs:h-[180px] sm:h-[260px] md:h-[320px] lg:h-[420px] animate-float-slow">
              <div className="scale-[0.38] xs:scale-[0.5] sm:scale-[0.68] md:scale-[0.85] lg:scale-100 origin-center transform transition-all duration-300 pointer-events-auto">
                <Mockups 
                  activeService={activeService} 
                  onSelectService={setActiveService}
                  services={SERVICES}
                />
              </div>
            </div>

          </div>

          {/* Quick Tip Bar at bottom of Hero removed */}

        </div>
      </main>

      {/* 3. PARTNERS / MARQUEE ROW */}
      <section className="py-8 bg-white border-b border-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold font-mono">
            Trusted By Clients Worldwide
          </p>
          
          {/* Flex wrap list of clean text partners */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-4 text-neutral-400 select-none">
            {PARTNERS.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors duration-300 filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 font-sans font-extrabold text-base sm:text-lg tracking-tight"
              >
                <div className="w-5 h-5 bg-neutral-100 rounded p-0.5 text-neutral-500">
                  <CheckCircle2 className="w-full h-full text-neutral-500" />
                </div>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER SECTION */}
      <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-purple-600 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Innovative Digital Solutions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans">
            What We Offer
          </h2>
          {/* Wave Accent Line */}
          <div className="w-16 h-1.5 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full mx-auto mt-3" />
          <p className="text-xs sm:text-sm text-neutral-500 mt-4 leading-relaxed">
            Professional global digital solutions customized perfectly to streamline your operations and grow your digital presence.
          </p>
        </div>

        {/* Main interactive row split: Services grid on left, "We Also Provide" products list on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Grid (6 Core Cards) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service) => {
              const isActive = activeService.id === service.id;
              
              // Icon Map
              const renderServiceIcon = (name: string) => {
                const props = { className: `w-5 h-5 ${service.textColor}` };
                switch (name) {
                  case "Code": return <Code {...props} />;
                  case "Smartphone": return <Smartphone {...props} />;
                  case "Monitor": return <Monitor {...props} />;
                  case "Palette": return <Palette {...props} />;
                  case "Briefcase": return <Briefcase {...props} />;
                  case "Megaphone": return <Megaphone {...props} />;
                  case "Cpu": return <Cpu {...props} />;
                  default: return <Code {...props} />;
                }
              };

              return (
                <motion.div
                  key={service.id}
                  onClick={() => {
                    setActiveService(service);
                    // Light scroll to device mockup to help see the screen change if on mobile
                    if (window.innerWidth < 1024) {
                      window.scrollTo({ top: 150, behavior: "smooth" });
                    }
                  }}
                  className={`cursor-pointer text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover-premium ${
                    isActive
                      ? "bg-white border-purple-500 shadow-xl ring-2 ring-purple-100 animate-glow-pulse"
                      : "bg-white border-neutral-100 hover:border-purple-500/30 shadow-sm"
                  }`}
                >
                  {/* Subtle colored card light highlight */}
                  <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${service.gradient}`} />
                  
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-neutral-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {renderServiceIcon(service.iconName)}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 group-hover:text-purple-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Bullet micro features inside card */}
                  <div className="space-y-1.5 mb-4 border-t border-neutral-50 pt-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Button inside Card */}
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <span className="text-neutral-400 font-mono text-[10px] uppercase">Vertex Premium Svc</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openOrderModal(service.title);
                      }}
                      className="bg-neutral-50 hover:bg-purple-600 hover:scale-105 active:scale-95 text-neutral-700 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 border border-neutral-200/80 hover:border-purple-600 text-[10px] flex items-center gap-1 hover:shadow-md hover:shadow-purple-600/15"
                    >
                      Order Setup
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: We Also Provide Column */}
          <div id="products" className="lg:col-span-4 space-y-4">
            
            {/* Box container */}
            <div className="bg-[#1C0F42]/95 text-white rounded-3xl p-6 border border-white/10 shadow-2xl text-left backdrop-blur-md hover-premium-dark">
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Exclusive Provisions
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-sans mt-2 mb-1 text-white">
                We Also Provide
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-5">
                Acquire pre-verified assets, country phone numbers, and social business channels optimized directly for global ad operations.
              </p>

              {/* Extra products lists */}
              <div className="space-y-3.5">
                {EXTRA_PRODUCTS.map((prod) => {
                  return (
                    <div
                      key={prod.id}
                      onClick={() => openOrderModal(prod.title)}
                      className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between hover-premium-dark"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-400/10 p-2 rounded-xl text-amber-300 group-hover:scale-110 transition-transform duration-300">
                          {prod.iconName === "PhoneCall" ? (
                            <PhoneCall className="w-5 h-5" />
                          ) : prod.iconName === "Share2" ? (
                            <Share2 className="w-5 h-5" />
                          ) : (
                            <ShieldCheck className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-neutral-100 group-hover:text-amber-300 transition-colors duration-300">
                              {prod.title}
                            </span>
                            <span className="bg-white/5 text-neutral-400 text-[8px] px-1.5 rounded font-mono border border-white/5">
                              {prod.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-300 mt-0.5 max-w-[210px] leading-tight">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-neutral-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Secure escrows callout */}
              <div className="mt-5 bg-neutral-950/60 rounded-xl p-3 border border-neutral-800/80 text-[10px] text-neutral-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
                <span>Escrow integrations active. Every transaction is 100% verified and secure.</span>
              </div>
            </div>

            {/* Micro FAQ promo card */}
            <div className="bg-gradient-to-tr from-purple-900 via-indigo-950 to-[#2A0845] rounded-3xl p-5 border border-purple-800/30 text-white text-left shadow-lg relative overflow-hidden animate-gradient-loop hover-premium-dark">
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 font-mono">Verified SLA Speed</h4>
              <p className="text-sm font-extrabold mt-1">Instant Activation Promise</p>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Our automated phone and social account pipelines initiate instantly. 24/7 technical chat assist handles secure handovers.
              </p>
              <button
                onClick={() => openOrderModal("Verified Accounts & Phone Provisions")}
                className="mt-3.5 bg-white hover:bg-amber-400 hover:text-neutral-950 text-purple-950 px-3.5 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20"
              >
                Inquire Rates
                <ArrowRight className="w-3 h-3 text-purple-950 transition-transform duration-300" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* 5. MEET OUR EXECUTIVE LEADERSHIP & TECH ARCHITECTS */}
      <section id="team" className="py-20 bg-gradient-to-tr from-neutral-900 via-[#1C0F42] to-neutral-950 animate-gradient-loop text-white relative overflow-hidden border-t border-b border-white/5">
        
        {/* Decorative background visualizers */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              Expert Technical Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 font-sans">
              Meet Our Visionary Architects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Our elite team combines decades of experience in React ecosystems, Kubernetes containerization, and advanced software modeling.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                onClick={() => {
                  setSelectedTeamMember(member);
                  setIsTeamModalOpen(true);
                }}
                className={`bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:scale-103 cursor-pointer transition-all duration-300 group relative overflow-hidden flex flex-col justify-between ${member.borderHover} hover:shadow-2xl`}
              >
                <div>
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                      <span className={`text-[10px] font-mono ${member.textClass}`}>{member.tagline}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white font-sans group-hover:text-white transition-colors flex items-center justify-center gap-1">
                    {member.name}
                  </h3>
                  <p className={`text-xs ${member.textClass} font-mono tracking-wider font-semibold uppercase mt-0.5`}>{member.role}</p>
                  <p className="text-[11px] text-neutral-400 mt-2.5 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                
                {/* Skill Badges & Interactive Link indicator */}
                <div>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-4 pt-4 border-t border-white/5">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-neutral-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-neutral-400 group-hover:text-amber-400 transition-colors flex items-center justify-center gap-1">
                    <span>View Profile Details</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. ABOUT VERTEX & WHY CHOOSE US */}
      <section id="about" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful brand pillars */}
          <div className="lg:col-span-5 text-left space-y-5">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
              About Vertex Technology Ltd
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans leading-tight">
              Empowering Brands<br />
              With Digital Excellence
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Founded with the vision to blend high-fidelity software engineering with robust cloud deployments, Vertex Technology Ltd has grown into a trusted partner for 350+ corporate enterprises, fast-growing startups, and global agencies.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-1 rounded-lg mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900">Enterprise SLA Standards</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500">We pledge 99.99% system uptime for cloud networks and continuous maintenance support.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-1 rounded-lg mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900">Custom High-Performance Tech Stack</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500">Websites & mobile applications built exclusively using modern serverless architectures and frameworks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-1 rounded-lg mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900">Continuous Delivery Integration</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500">Blazing-fast automated CI/CD configurations ensure zero-downtime deployment pipelines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Why Choose Us - Bento Trust Panel */}
          <div id="why-us" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Bento 1: Testimonials Carousel */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm sm:col-span-2 text-left relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] text-purple-600 font-mono font-bold uppercase">Client Testimonial</span>
                <div className="flex text-amber-400">
                  {[...Array(testimonials[testimonialIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="min-h-[100px] flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                    "{testimonials[testimonialIndex].quote}"
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-neutral-50 pt-2.5">
                    <div>
                      <p className="font-bold text-xs text-neutral-900">{testimonials[testimonialIndex].author}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{testimonials[testimonialIndex].role}</p>
                    </div>
                    {/* Tiny index indicators */}
                    <div className="flex gap-1">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setTestimonialIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            testimonialIndex === i ? "bg-purple-600 w-3" : "bg-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bento 2: Speed metric */}
            <div className="bg-gradient-to-br from-purple-600 via-[#5B21B6] via-[#B91C1C] to-purple-600 animate-gradient-loop text-white rounded-3xl p-5 text-left relative overflow-hidden hover-premium-dark">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
              <Award className="w-6 h-6 text-amber-300" />
              <p className="text-2xl font-black font-mono mt-3">0.1 Seconds</p>
              <h4 className="font-bold text-xs mt-1">Average Page Load Speed</h4>
              <p className="text-[10px] text-purple-100 mt-1 leading-tight">
                Our highly-optimized web applications achieve flawless Lighthouse scores and outstanding client engagement.
              </p>
            </div>

            {/* Bento 3: Secure guarantee */}
            <div className="bg-gradient-to-br from-neutral-900 via-purple-950 via-[#1C0F42] to-neutral-950 animate-gradient-loop text-white rounded-3xl p-5 text-left relative overflow-hidden hover-premium-dark">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
              <Shield className="w-6 h-6 text-emerald-400" />
              <p className="text-2xl font-black font-mono mt-3">99.99%</p>
              <h4 className="font-bold text-xs mt-1">Uptime SLA Guaranteed</h4>
              <p className="text-[10px] text-neutral-400 mt-1 leading-tight">
                Enterprise-grade Kubernetes orchestrations and multi-region load balancers mean zero downtimes.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6.5. PORTFOLIO & ENGINEERED CASE STUDIES */}
      <section id="portfolio" className="py-20 sm:py-28 bg-[#100729] text-white relative overflow-hidden border-t border-b border-purple-950/40">
        {/* Abstract background blobs for high-end feel */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="bg-purple-900/40 border border-purple-500/30 text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              Proven Digital Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-4 font-sans leading-tight">
              Our Engineered <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Case Studies.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed">
              Explore four of our flagship deployments showcasing enterprise web craftsmanship, smart contract creation, custom brand architectures, and robust cloud configurations.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {PROJECTS.map((project) => {
              // Custom project icon renderer
              const getIcon = () => {
                const props = { className: "w-6 h-6 text-white" };
                switch (project.iconName) {
                  case "Cpu": return <Cpu {...props} />;
                  case "Terminal": return <Terminal {...props} />;
                  case "Palette": return <Palette {...props} />;
                  case "Layers": return <Layers {...props} />;
                  default: return <Code {...props} />;
                }
              };

              return (
                <div 
                  key={project.id}
                  className="group bg-gradient-to-b from-[#130B2E] to-[#0A051B] border border-white/5 hover:border-purple-500/30 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] text-left"
                >
                  {/* Glowing thin top-border line to feel premium and bespoke */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.color} opacity-80 z-20`} />

                  {/* Subtle decorative layout line grids like a CAD viewport */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

                  {/* Colorful Top Corner Ambient Light */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.color} opacity-[0.06] group-hover:opacity-15 blur-2xl transition-all duration-500 pointer-events-none`} />

                  <div>
                    {/* Header: Category and Micro System Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} animate-pulse`} />
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                          {project.category}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500 tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        [ SYSTEM-0{project.id === "apexdex" ? "1" : project.id === "cloudscale" ? "2" : project.id === "equinox" ? "3" : "4"} // SECURE ]
                      </span>
                    </div>

                    {/* Title with elegant icon block */}
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${project.color} shadow-lg shadow-purple-500/5 transition-transform duration-300 group-hover:scale-110`}>
                        {getIcon()}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-[10px] font-mono text-amber-400 font-bold mt-0.5">
                          KPI Metric: {project.metric}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 text-left relative z-10">
                      {project.description}
                    </p>

                    {/* BESPOKE SIMULATED VIEWPORT CONTAINER */}
                    <div className="w-full h-44 sm:h-52 rounded-2xl bg-[#090418] border border-white/5 overflow-hidden my-5 flex flex-col relative group/preview shadow-2xl transition-all duration-300">
                      
                      {/* Simulated Web Browser Header */}
                      <div className="w-full h-7 bg-[#11092e] border-b border-white/5 px-3 flex items-center justify-between flex-shrink-0 relative z-20">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/40" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
                          <span className="w-2 h-2 rounded-full bg-green-500/40" />
                        </div>
                        <div className="bg-neutral-950/60 px-2.5 py-0.5 rounded text-[8px] sm:text-[9px] text-neutral-400 font-mono w-40 sm:w-48 text-center truncate select-none border border-white/5">
                          {project.id === "apexdex" && "apexdex.io/swap-exchange"}
                          {project.id === "cloudscale" && "cloudscale.sh/infrastructure-status"}
                          {project.id === "equinox" && "equinox-couture.com/editorial-2026"}
                          {project.id === "velopay" && "velopay.com/enterprise-dashboard"}
                        </div>
                        <span className="text-[8px] font-mono text-neutral-500 select-none">PORT: 443</span>
                      </div>

                      {/* Simulated Website Content Canvas */}
                      <div className="flex-1 overflow-hidden text-left relative">
                        {/* High-Fidelity Website Picture Design as full-bleed background */}
                        <img 
                          src={project.imageSrc} 
                          alt={`${project.title} Website Design`}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-105"
                        />
                        
                        {/* Dark/color gradient overlay */}
                        <div className="absolute inset-0 bg-neutral-950/30 group-hover/preview:bg-neutral-950/60 transition-all duration-300 z-10" />
                        
                        {/* Interactive overlay widgets for a high-tech hybrid look */}
                        <div className="absolute inset-0 z-10 p-3 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="bg-[#0b051b]/90 backdrop-blur-md border border-white/10 text-white text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                              VERIFIED STABLE
                            </span>
                            <span className="bg-[#0b051b]/90 backdrop-blur-md border border-white/10 text-amber-400 text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-md">
                              {project.id === "apexdex" && "Gas Price: 12 Gwei"}
                              {project.id === "cloudscale" && "Node Load: Balanced"}
                              {project.id === "equinox" && "FPS Standard: 60fps"}
                              {project.id === "velopay" && "PCI-DSS Level 1"}
                            </span>
                          </div>

                          {/* Futuristic interactive metrics overlay at the bottom */}
                          <div className="transform translate-y-2 opacity-0 group-hover/preview:translate-y-0 group-hover/preview:opacity-100 transition-all duration-300 bg-neutral-950/90 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[9px] text-neutral-300 space-y-1">
                            <p className="font-bold text-white text-[10px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
                              System Deployment Diagnostics
                            </p>
                            <p className="text-[8.5px] text-neutral-400 leading-tight font-mono">
                              {project.id === "apexdex" && "DeFi Core: Constant product liquidity pool structures with smart transaction gas routing strategies."}
                              {project.id === "cloudscale" && "Container Topology: Automated replication controller states, service mesh boundaries, and live pods."}
                              {project.id === "equinox" && "Brand Physics: Custom micro-animations, design grids, high-fidelity color models, and modern display elements."}
                              {project.id === "velopay" && "Fintech Base: Dynamic cash balances, instant cache lookups, transaction pipelines, and secure data tunnels."}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                  <div>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-5">
                      {project.tech.map((t, idx) => (
                        <span 
                          key={idx}
                          className="text-[9px] font-mono text-neutral-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* New Interactive Expandable Specs Section & CTA Row */}
                    <div className="space-y-4">
                      
                      {/* Interactive Expand Toggler Button */}
                      <button 
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="w-full flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 hover:border-purple-500/20 px-4 py-2.5 rounded-xl text-[10px] font-mono text-neutral-300 transition-all cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                          {expandedProject === project.id ? "Hide Tech Blueprint" : "View System Tech Blueprint"}
                        </span>
                        <span className="text-amber-400 font-bold hover:underline">
                          {expandedProject === project.id ? "[ - CLOSE ]" : "[ + INSPECT ]"}
                        </span>
                      </button>

                      {/* Expandable Technical Terminal Board */}
                      {expandedProject === project.id && (
                        <div className="bg-[#05020c] border border-white/10 rounded-2xl p-4 sm:p-5 relative animate-fade-in text-left space-y-4">
                          <div className="absolute top-3 right-3 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Terminal Active</span>
                          </div>

                          {/* Dual Columns: Specs on Left, Code Snippet IDE on Right */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
                            
                            {/* Left Specs List */}
                            <div className="lg:col-span-5 space-y-2">
                              <h4 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold border-b border-white/5 pb-1">
                                System Specifications
                              </h4>
                              <div className="space-y-1.5">
                                {project.specs?.map((spec, sIdx) => (
                                  <div key={sIdx} className="bg-white/5 border border-white/5 p-1.5 rounded-lg flex flex-col justify-between">
                                    <span className="text-[8px] text-neutral-400 uppercase font-mono">{spec.label}</span>
                                    <span className="text-[10px] text-white font-mono font-bold mt-0.5">{spec.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right Code Block Scroll Pane */}
                            <div className="lg:col-span-7 flex flex-col">
                              <div className="flex items-center justify-between bg-[#11092a] px-3 py-1.5 rounded-t-lg border-t border-x border-white/10">
                                <span className="text-[8.5px] font-mono text-neutral-300 flex items-center gap-1">
                                  <Code className="w-3 h-3 text-purple-400" />
                                  {project.id === "apexdex" && "ApexToken.sol"}
                                  {project.id === "cloudscale" && "cluster-config.tf"}
                                  {project.id === "equinox" && "brand-tokens.css"}
                                  {project.id === "velopay" && "route.ts"}
                                </span>
                                <span className="text-[8px] font-mono text-neutral-500">READ_ONLY</span>
                              </div>
                              <pre className="flex-1 bg-black/80 border-b border-x border-white/10 rounded-b-lg p-3 overflow-x-auto text-[9.5px] font-mono text-emerald-400 max-h-[170px] leading-normal scrollbar-thin">
                                <code>{project.codeSnippet}</code>
                              </pre>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* Footer Row: Inquire Button & Case index */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-neutral-500">
                          // CASE_STUDY_0{project.id === "apexdex" ? "1" : project.id === "cloudscale" ? "2" : project.id === "equinox" ? "3" : "4"}
                        </span>
                        <button 
                          onClick={() => openOrderModal(`Consultation regarding: ${project.title}`)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-amber-300 transition-colors group/btn cursor-pointer"
                        >
                          Inquire System Setup
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Live Platform Stats Callout */}
          <div className="mt-16 bg-gradient-to-r from-purple-950/40 via-[#1C0F42]/80 to-purple-950/40 border border-purple-500/20 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl pointer-events-none" />
            
            <p className="font-mono text-amber-300 text-[10px] sm:text-xs tracking-widest font-extrabold uppercase">
              // PRODUCTION ENVIRONMENT GUARANTEE
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-2 mb-3">
              Ready to deploy your next custom crypto ecosystem or high-end platform?
            </h3>
            <p className="text-xs text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Our architects write production-grade TypeScript, Solidity, and cloud deployment manifests backed by 24/7 dedicated container support. Your ideas, engineered flawlessly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => openOrderModal("New Custom System Proposal")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:scale-105 active:scale-95 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                Inquire Project Scope
              </button>
              <a
                href="https://wa.me/2348158432605?text=Hello%20Vertex%20Technology%20Ltd,%20I'd%20like%20to%20discuss%20a%20new%20project%20with%20your%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Chat with Founder on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 sm:py-28 bg-[#FAF9FF] border-t border-b border-neutral-100 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-50/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Section Header with Sticky layout */}
            <div className="lg:col-span-5 text-left space-y-4 lg:sticky lg:top-28 lg:h-fit">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 font-sans leading-tight">
                Frequently Asked<br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
                  Inquiries.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-md">
                Learn more about our development pipelines, professional team experience, pricing models, and specialized Crypto and Brand systems.
              </p>
              
              <div className="pt-4">
                <a
                  href="https://wa.me/2348158432605?text=Hello%20Vertex%20Technology%20Ltd,%20I'd%20like%20to%20ask%20a%20question%20regarding%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 hover:-translate-y-0.5 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Have a custom query? Ask on WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Accordion Items */}
            <div className="lg:col-span-7 space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? "border-purple-200 shadow-lg shadow-purple-500/5 ring-1 ring-purple-100" 
                        : "border-neutral-200/60 hover:border-neutral-300 hover:shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 py-4 sm:py-5 flex items-center justify-between text-left gap-4 transition-colors group"
                    >
                      <span className={`font-sans font-semibold text-xs sm:text-sm transition-colors ${
                        isOpen ? "text-purple-700" : "text-neutral-800 group-hover:text-purple-600"
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        isOpen ? "bg-purple-50 text-purple-600 rotate-90" : "bg-neutral-50 text-neutral-400 group-hover:bg-neutral-100"
                      }`}>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className="px-5 pb-5 pt-1 text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-sans border-t border-neutral-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 8. LOWER STATS RIBBON FOOTER */}
      <section className="bg-gradient-to-r from-[#1E0B36] via-[#2F155C] to-[#110729] text-white py-8 border-t border-b border-purple-900/60 animate-gradient-loop">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            {STATS.map((stat) => {
              const IconComponent = stat.id === "clients" ? Smile :
                                    stat.id === "projects" ? Award :
                                    stat.id === "uptime" ? Shield : Clock;
              return (
                <div key={stat.id} className="space-y-1">
                  <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center mx-auto text-amber-400">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-neutral-300">{stat.label}</p>
                </div>
              );
            })}

            {/* Stat 5 (Phone Support Link) */}
            <a
              href="https://wa.me/2348158432605"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 md:col-span-1 bg-white/5 hover:bg-white/10 rounded-2xl p-2 border border-white/5 flex flex-col items-center justify-center gap-1 hover:scale-103 transition-all"
            >
              <Phone className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
              <p className="text-xs font-bold text-white font-mono">08158432605</p>
              <p className="text-[9px] text-neutral-300 uppercase tracking-widest leading-none font-mono font-bold">Call / WhatsApp</p>
            </a>

          </div>
        </div>
      </section>

      {/* 8. MAIN BRAND FOOTER */}
      <footer id="contact" className="bg-[#110729] text-white pt-16 pb-12 border-t border-[#1d0e40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
            
            {/* Logo & Info column */}
            <div className="md:col-span-5 text-left space-y-4">
              <div className="flex items-center gap-2.5">
                <VertexLogo className="w-10 h-10" />
                <div>
                  <span className="block text-white font-extrabold text-base sm:text-lg tracking-wider font-sans uppercase">
                    Vertex
                  </span>
                  <span className="block text-amber-400 font-mono text-[9px] font-bold tracking-widest leading-none">
                    TECHNOLOGY LTD
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Vertex Technology Ltd designs and delivers robust, high-performance web applications, resilient cloud infrastructure, and custom software systems designed to scale enterprise operations.
              </p>
              <div className="text-xs text-neutral-400 space-y-1.5 font-mono">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Support Line: +234 815 843 2605</span>
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <span>Regulatory ID: Registered Global Entity</span>
                </p>
              </div>
            </div>

            {/* Navigation links columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              
              {/* Col 1 */}
              <div>
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">Core Solutions</h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  <li><button onClick={() => { scrollToId("services"); setActiveService(SERVICES[0]); }} className="hover:text-amber-400 transition-colors">Web Development</button></li>
                  <li><button onClick={() => { scrollToId("services"); setActiveService(SERVICES[1]); }} className="hover:text-amber-400 transition-colors">Cloud Engineering</button></li>
                  <li><button onClick={() => { scrollToId("services"); setActiveService(SERVICES[2]); }} className="hover:text-amber-400 transition-colors">App Development</button></li>
                  <li><button onClick={() => { scrollToId("services"); setActiveService(SERVICES[3]); }} className="hover:text-amber-400 transition-colors">Custom Software Solutions</button></li>
                </ul>
              </div>

              {/* Col 2 */}
              <div>
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">Premium Provisions</h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  <li><button onClick={() => scrollToId("products")} className="hover:text-amber-400 transition-colors">Dedicated DevOps SREs</button></li>
                  <li><button onClick={() => scrollToId("products")} className="hover:text-amber-400 transition-colors">Scalable Cloud Clusters</button></li>
                  <li><button onClick={() => scrollToId("faq")} className="hover:text-amber-400 transition-colors">General FAQ Accordion</button></li>
                  <li><button onClick={() => openOrderModal("General Consultation")} className="hover:text-amber-400 transition-colors">Technical Consulting</button></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">Immediate Actions</h4>
                <div className="space-y-2.5">
                  <button
                    onClick={() => openOrderModal("General Consulting / Getting Started")}
                    className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 hover:-translate-y-0.5 text-white py-2 px-3 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 shadow-md shadow-purple-900/15 hover:shadow-purple-900/35 transition-all duration-300"
                  >
                    Request Consultation
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <a
                    href="https://wa.me/2348158432605"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 hover:scale-105 hover:-translate-y-0.5 text-white py-2 px-3 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 shadow-md shadow-emerald-500/15 hover:shadow-emerald-500/35 transition-all duration-300"
                  >
                    Quick WhatsApp Chat
                    <MessageSquare className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Footer bottom legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>© 2026 Vertex Fintech Ltd. All Rights Reserved. Innovate • Create • Elevate.</p>
            <div className="flex gap-4">
              <span className="hover:text-amber-400 cursor-pointer">SLA Agreement</span>
              <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-amber-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 9. LEAD CONSULTATION MODAL POPUP */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedProduct={preselectedProduct}
      />

      {/* 10. TEAM MEMBER DETAIL POPUP MODAL */}
      <TeamMemberModal
        isOpen={isTeamModalOpen}
        onClose={() => {
          setIsTeamModalOpen(false);
          setSelectedTeamMember(null);
        }}
        member={selectedTeamMember}
      />

    </div>
  );
}
