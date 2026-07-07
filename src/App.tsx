import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code, Smartphone, Monitor, Palette, Briefcase, Megaphone,
  PhoneCall, ShieldCheck, ArrowRight, ChevronRight, Check, Phone, Shield, Award,
  Star, MessageSquare, Menu, X, ArrowUpRight, Cpu,
  Layers, Terminal, CheckCircle2, Clock, Users
} from "lucide-react";
import { SERVICES, EXTRA_PRODUCTS } from "./data";
import { Service } from "./types";
import { LeadModal } from "./components/LeadModal";
import { TeamMemberModal } from "./components/TeamMemberModal";

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
    answer: "Our elite team is led by Eren Utsalo (CEO & Lead Software Architect) and senior technologists. Each team member has 8+ years of production experience in React, Next.js, Kubernetes, and Web3 environments. We pride ourselves on clean code, SRE standards, and pixel-perfect brand identity layouts."
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
    specs: [
      { label: "Contract Audited By", value: "ConsenSys Diligence" },
      { label: "AMM Formula Type", value: "Constant Product (x * y = k)" },
      { label: "Standard Implemented", value: "ERC-20 & ERC-2612 Permits" },
      { label: "Gas Optimization Level", value: "98.4% Yul Optimizer" }
    ],
    codeSnippet: `contract ApexToken is ERC20, ReentrancyGuard {
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
  release_channel { channel = "STABLE" }
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
    specs: [
      { label: "Edge Response Latency", value: "Sub-12ms Memory Lookups" },
      { label: "Gateway Encryptions", value: "HMAC SHA-256 Signatures" },
      { label: "Primary Database", value: "Distributed CockroachDB Cluster" },
      { label: "Client Bundle Footprint", value: "72KB Gzipped Core Entry" }
    ],
    codeSnippet: `export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const payload = await req.json();
  const expected = createHmac("sha256", process.env.HMAC_SECRET!)
    .update(JSON.stringify(payload))
    .digest("hex");
  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }
}`
  }
];

const TEAM_MEMBERS = [
  {
    id: "eren-utsalo",
    name: "Eren Utsalo",
    role: "CEO & Lead Software Architect",
    tagline: "Founder & CEO",
    image: "/images/ceo-photo.jpg",
    bio: "Directs software vision, core systems scaling, and digital engineering standards. Devoted to high-fidelity code.",
    detailedBio: "Eren Utsalo is the visionary behind Vertex Fintech Ltd. With over a decade of deep technical experience across distributed networks, scalable database clusters, and secure Web3 ecosystems, Eren oversees the architectural blueprint of all key client deployments. He is a passionate advocate of clean type-safe TypeScript, robust CI/CD, and highly optimized serverless pipelines.",
    color: "amber",
    colorClass: "from-amber-500 to-yellow-400",
    textClass: "text-amber-400",
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
    image: "/images/jeremiah-photo.jpg",
    bio: "Kubernetes automation expert. Specializes in multi-cloud setups, secure vaults, and serverless clusters.",
    detailedBio: "Jeremiah is a seasoned DevOps SRE and systems automation lead with extensive expertise in Google Cloud Platform (GCP), AWS, and multi-region Kubernetes clusters. He is responsible for securing client infrastructure, establishing zero-downtime continuous delivery pipelines, and implementing real-time Prometheus monitoring arrays.",
    color: "purple",
    colorClass: "from-purple-500 to-indigo-500",
    textClass: "text-purple-400",
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
    skills: ["Node / Express", "PostgreSQL", "REST / GraphQL", "Redis Caching", "API Security", "NoSQL"],
    achievements: [
      "Architected backend microservices handling 50k+ daily API requests securely",
      "Integrated secure financial transaction layers with Stripe and multi-currency gateways",
      "Designed real-time database schemas that scaled seamlessly under high-volume spikes"
    ]
  }
];

const VertexLogoSvg: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="vg1" x1="0" y1="0" x2="120" y2="130" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b3ff0"/>
        <stop offset="45%" stopColor="#6b21e8"/>
        <stop offset="100%" stopColor="#f7b32b"/>
      </linearGradient>
      <linearGradient id="vg2" x1="0" y1="0" x2="120" y2="130" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22d3ee"/>
        <stop offset="100%" stopColor="#8b3ff0"/>
      </linearGradient>
    </defs>
    <path d="M14 20 C4 20 -2 34 8 46 L46 96 C56 108 70 108 80 96 L106 62" stroke="url(#vg1)" strokeWidth="13" strokeLinecap="round" fill="none"/>
    <path d="M40 30 L64 62 L98 20" stroke="url(#vg2)" strokeWidth="15" strokeLinecap="round" fill="none"/>
    <circle cx="12" cy="66" r="4" fill="#f7b32b"/>
    <circle cx="104" cy="90" r="4" fill="#22d3ee"/>
  </svg>
);

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (80 / 24);
        if (next >= 80) {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(100);
            setTimeout(onComplete, 300);
          }, 300);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background:'var(--navy-950)'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96" style={{background:'rgba(139,63,240,.2)', borderRadius:'50%', filter:'blur(80px)'}} />
        <div className="absolute bottom-0 right-0 w-96 h-96" style={{background:'rgba(236,30,121,.2)', borderRadius:'50%', filter:'blur(80px)'}} />
      </div>
      <div className="relative text-center z-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-6">
          <VertexLogoSvg className="w-20 h-20 mx-auto" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-2xl font-bold text-white mb-2" style={{fontFamily:'var(--font-display)'}}>
          Vertex Fintech
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-sm font-mono tracking-wider uppercase" style={{color:'var(--ink-dim)'}}>
          Premium Digital Solutions
        </motion.p>
        <div className="mt-8 w-64 mx-auto">
          <div className="relative h-1 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,.1)'}}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} className="absolute top-0 left-0 h-full" style={{background:'linear-gradient(90deg,#8b3ff0,#ec1e79,#f7b32b)'}} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono" style={{color:'rgba(182,172,217,.5)'}}>
            <span>READY</span>
            <span>INITIALIZING</span>
            <span>SYSTEMS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

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

  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openOrderModal = (productName: string) => {
    setPreselectedProduct(productName);
    setIsModalOpen(true);
  };

  const testimonials = [
    { quote: "Vertex Technology Ltd transformed our entire cloud setup and web presence. They migrated our legacy monolith to a Next.js serverless architecture with a zero-downtime CI/CD pipeline. Unbelievably fast and professional.", author: "Farhan K.", role: "CTO, Apex Enterprise Systems", stars: 5 },
    { quote: "The web development and custom UI system Vertex built gave our SaaS platform a tier-1 premium look that rivals Stripe. Our page load speeds dropped to 0.1s and user signups immediately increased by 40%!", author: "Chinedu O.", role: "Founder, PayBreeze Tech", stars: 5 },
    { quote: "Exceptional engineering quality and robust DevOps design. They didn't just build a beautiful web frontend; they set up our secure cloud databases, automated backups, and multi-zone AWS clusters.", author: "Elena R.", role: "Head of Product, FinFlow Europe", stars: 5 },
    { quote: "Vertex team delivered an outstanding, highly secure ERC-20 token economy and Solidity contracts within record time. Their architectural insights into liquidity pools and Web3 integrations saved us weeks of audit iterations.", author: "Marcus Y.", role: "Lead Web3 Developer, Apex DeFi Labs", stars: 5 },
    { quote: "The cloud migration Jeremiah and his DevOps squad executed was flawless. Our continuous-deployment builds now take under 2 minutes, and our auto-scaling group seamlessly handled a 300% traffic surge on launch day.", author: "Amelie M.", role: "Director of Engineering, CloudScale Logistics", stars: 5 },
    { quote: "Vertex redefined our luxury branding from the ground up, providing responsive grid layouts and fluid motion assets that perfectly capture our haute couture identity. Elegant, high-performance, and exquisite.", author: "Julian B.", role: "Creative Director, Equinox Couture", stars: 5 }
  ];

  const renderServiceIcon = (name: string, color: string) => {
    const className = "w-5 h-5 text-white";
    switch (name) {
      case "Code": return <Code className={className} />;
      case "Globe": return <GlobeIcon className={className} />;
      case "Smartphone": return <Smartphone className={className} />;
      case "Monitor": return <Monitor className={className} />;
      case "Palette": return <Palette className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Megaphone": return <Megaphone className={className} />;
      default: return <Code className={className} />;
    }
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          {/* ============ BRANDMARK ============ */}
          <div className="brandmark">
            <VertexLogoSvg className="w-[120px] h-[130px] mx-auto" />
            <h1>VERTEX <span style={{fontWeight:800}}>FINTECH LTD</span></h1>
            <p className="tagline">INNOVATE &middot; CREATE &middot; ELEVATE</p>
          </div>

          {/* ============ HEADER / HERO ============ */}
          <header>
            <div className="wrap">
              <nav>
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  <svg width="30" height="32" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M14 20 C4 20 -2 34 8 46 L46 96 C56 108 70 108 80 96 L106 62" stroke="url(#vg1)" strokeWidth="15" strokeLinecap="round" fill="none"/>
                    <path d="M40 30 L64 62 L98 20" stroke="url(#vg2)" strokeWidth="17" strokeLinecap="round" fill="none"/>
                  </svg>
                  <span>VERTEX<span className="logo-sub">FINTECH LTD</span></span>
                </a>
                <ul className="navlinks">
                  <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button></li>
                  <li><button onClick={() => scrollToId("services")}>Services</button></li>
                  <li><button onClick={() => scrollToId("products")}>Products</button></li>
                  <li><button onClick={() => scrollToId("about")}>About Us</button></li>
                  <li><button onClick={() => scrollToId("why")}>Why Us</button></li>
                  <li><button onClick={() => scrollToId("contact")}>Contact</button></li>
                </ul>
                <div className="navbar-cta">
                  <a href="#contact" className="btn btn-gold" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <button className="nav-toggle p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </nav>

              {mobileMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mobile-nav mb-4">
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false); }}>Home</button>
                  <button onClick={() => { scrollToId("services"); setMobileMenuOpen(false); }}>Services</button>
                  <button onClick={() => { scrollToId("products"); setMobileMenuOpen(false); }}>Products</button>
                  <button onClick={() => { scrollToId("about"); setMobileMenuOpen(false); }}>About Us</button>
                  <button onClick={() => { scrollToId("why"); setMobileMenuOpen(false); }}>Why Us</button>
                  <button onClick={() => { scrollToId("contact"); setMobileMenuOpen(false); }}>Contact</button>
                </motion.div>
              )}
            </div>

            {/* ============ HERO ============ */}
            <div className="hero">
              <div className="wrap">
                <div className="hero-grid">
                  <div className="hero-copy">
                    <span className="eyebrow">🌐 Global. Trusted. Recognized.</span>
                    <h2>We Build. We Design.<br />We <span className="accent-pink">Grow</span> <span className="accent-gold">Brands.</span></h2>
                    <p>Vertex Fintech Ltd provides professional digital solutions that help businesses and individuals thrive globally.</p>
                    <div className="hero-cta">
                      <a href="#services" className="btn btn-gold" onClick={(e) => { e.preventDefault(); scrollToId("services"); }}>
                        Explore Services <ArrowRight className="w-4 h-4" />
                      </a>
                      <a href="tel:08158432605" className="btn btn-ghost">📞 08158432605</a>
                    </div>
                  </div>

                  <div className="device-stage">
                    <div className="floating-icon fi-1 animate-float"><Code className="w-5 h-5 text-white" /></div>
                    <div className="floating-icon fi-2 animate-float"><GlobeIcon className="w-5 h-5 text-white" /></div>
                    <div className="floating-icon fi-3 animate-float"><Smartphone className="w-5 h-5 text-white" /></div>
                    <div className="floating-icon fi-4 animate-float"><Shield className="w-5 h-5 text-white" /></div>

                    <div className="phone">
                      <div className="phone-body">
                        <div className="phone-screen">
                          <VertexLogoSvg className="w-[38px] h-[42px]" />
                          <span className="screen-word">VERTEX</span>
                          <span className="screen-sub">FINTECH LTD</span>
                        </div>
                      </div>
                    </div>

                    <div className="laptop">
                      <div className="laptop-screen">
                        <div className="laptop-screen-inner">
                          <VertexLogoSvg className="w-16 h-[70px]" />
                          <span className="screen-word" style={{fontSize:'20px'}}>VERTEX</span>
                          <span className="screen-sub" style={{fontSize:'9px'}}>FINTECH LTD</span>
                        </div>
                      </div>
                      <div className="laptop-base"></div>
                    </div>
                  </div>

                  <div className="trust-panel">
                    <div>
                      <span className="eyebrow">Registered &amp; Recognized</span>
                      <h3>As a global business worldwide</h3>
                      <div className="trust-stats" style={{marginTop:22}}>
                        <div className="trust-stat">
                          <Shield className="w-5 h-5" />
                          <span><b>Registered</b>Business</span>
                        </div>
                        <div className="trust-stat">
                          <GlobeIcon className="w-5 h-5" />
                          <span><b>Global</b>Recognition</span>
                        </div>
                        <div className="trust-stat">
                          <CheckCircle2 className="w-5 h-5" />
                          <span><b>Trusted</b>Worldwide</span>
                        </div>
                        <div className="trust-stat">
                          <Users className="w-5 h-5" />
                          <span><b>Serving</b>Clients Globally</span>
                        </div>
                      </div>
                    </div>
                    <div className="worldmap">
                      <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                        <g fill="rgba(255,255,255,.12)">
                          <ellipse cx="70" cy="60" rx="45" ry="26"/>
                          <ellipse cx="150" cy="90" rx="30" ry="22"/>
                          <ellipse cx="230" cy="55" rx="50" ry="28"/>
                          <ellipse cx="320" cy="85" rx="42" ry="24"/>
                        </g>
                      </svg>
                      <div className="pin" style={{background:'var(--pink-500)', left:'16%', top:'20%'}} />
                      <div className="pin" style={{background:'var(--cyan-400)', left:'36%', top:'8%'}} />
                      <div className="pin" style={{background:'var(--gold-400)', left:'58%', top:'44%'}} />
                      <div className="pin" style={{background:'#1665c9', left:'80%', top:'14%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ============ WHAT WE OFFER ============ */}
          <section className="section" id="services">
            <div className="wrap">
              <div className="section-head">
                <span className="wig">〜</span>
                <h3>What We Offer</h3>
                <span className="wig">〜</span>
              </div>

              <div className="services-layout">
                <div className="services-grid">
                  {SERVICES.map((service) => (
                    <div
                      key={service.id}
                      className={`service-card${activeService.id === service.id ? ' active' : ''}`}
                      onClick={() => setActiveService(service)}
                    >
                      <div className="service-icon" style={{background: service.gradient.includes('purple') ? 'linear-gradient(135deg,#6b21e8,#8b3ff0)' : service.gradient.includes('pink') ? 'linear-gradient(135deg,#ec1e79,#f0508f)' : service.gradient.includes('amber') || service.gradient.includes('yellow') ? 'linear-gradient(135deg,#f7b32b,#ffd45c)' : service.gradient.includes('cyan') || service.gradient.includes('teal') ? 'linear-gradient(135deg,#22d3ee,#0fb8ac)' : service.gradient.includes('violet') || service.gradient.includes('fuchsia') ? 'linear-gradient(135deg,#6b21e8,#8b3ff0)' : service.gradient.includes('emerald') ? 'linear-gradient(135deg,#10b981,#34d399)' : 'linear-gradient(135deg,#6b21e8,#8b3ff0)'}}>
                        {renderServiceIcon(service.iconName, service.textColor)}
                      </div>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                  ))}
                </div>

                <div className="provide-panel" id="products">
                  <h3>We Also Provide</h3>
                  {EXTRA_PRODUCTS.map((prod, idx) => (
                    <div className="provide-item" key={prod.id} style={{cursor:'pointer'}} onClick={() => openOrderModal(prod.title)}>
                      <div className="provide-icon" style={{background: idx === 0 ? '#1665c9' : idx === 1 ? '#ec1e79' : '#f7b32b'}}>
                        {idx === 0 ? <PhoneCall className="w-[18px] h-[18px] text-white" /> : idx === 1 ? <Users className="w-[18px] h-[18px] text-white" /> : <Shield className="w-[18px] h-[18px] text-white" />}
                      </div>
                      <div>
                        <h5>{prod.title}</h5>
                        <p>{prod.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============ TRUSTED BY ============ */}
          <div className="trusted-strip">
            <div className="wrap">
              <div className="wrap-inner">
                <span className="label">Trusted By Clients Worldwide</span>
                <div className="trusted-logos">
                  <span>Google</span>
                  <span>Microsoft</span>
                  <span>Airbnb</span>
                  <span>Amazon</span>
                  <span>Shopify</span>
                  <span>Meta</span>
                  <span>TikTok</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============ STATS BAR ============ */}
          <div className="stats-bar">
            <div className="wrap">
              <div className="stats-row">
                <div className="stat">
                  <div className="stat-icon"><SmileIcon className="w-5 h-5 text-white" /></div>
                  <div><b>1500+</b><span>Happy Clients</span></div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><Award className="w-5 h-5 text-white" /></div>
                  <div><b>2500+</b><span>Projects Completed</span></div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><GlobeIcon className="w-5 h-5 text-white" /></div>
                  <div><b>50+</b><span>Countries Served</span></div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><Clock className="w-5 h-5 text-white" /></div>
                  <div><b>24/7</b><span>Customer Support</span></div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><Phone className="w-5 h-5 text-white" /></div>
                  <div><b>08158432605</b><span>Call / WhatsApp</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ TEAM SECTION ============ */}
          <section className="team-section" id="team">
            <div className="wrap">
              <div className="text-center mb-12">
                <span className="eyebrow justify-center" style={{color:'var(--gold-400)'}}>Expert Technical Leadership</span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-3" style={{fontFamily:'var(--font-display)'}}>Meet Our Visionary Architects</h2>
                <p style={{color:'var(--ink-dim)', fontSize:'14px', maxWidth:520, margin:'0 auto', lineHeight:1.6}}>
                  Our elite team combines decades of experience in React ecosystems, Kubernetes containerization, and advanced software modeling.
                </p>
              </div>
              <div className="team-grid">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="team-card" onClick={() => { setSelectedTeamMember(member); setIsTeamModalOpen(true); }}>
                    <div className="team-avatar">
                      {member.image ? (
                        <img src={member.image} alt={member.name} referrerPolicy="no-referrer" />
                      ) : (
                        <div className="initials">{member.name.charAt(0)}</div>
                      )}
                    </div>
                    <h4>{member.name}</h4>
                    <p className="role" style={{color:'var(--gold-400)'}}>{member.role}</p>
                    <p className="bio">{member.bio}</p>
                    <div className="team-skills">
                      {member.skills.slice(0, 3).map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ ABOUT SECTION ============ */}
          <section className="about-section" id="about">
            <div className="wrap">
              <div className="about-grid">
                <div className="about-left">
                  <span className="eyebrow" style={{color:'var(--gold-400)', color:'#b8860b'}}>About Vertex Fintech Ltd</span>
                  <h2>Empowering Brands<br />With Digital Excellence</h2>
                  <p>
                    Founded with the vision to blend high-fidelity software engineering with robust cloud deployments, Vertex Fintech Ltd has grown into a trusted partner for 350+ corporate enterprises, fast-growing startups, and global agencies.
                  </p>
                  <div className="about-features">
                    <div className="about-feature">
                      <div className="about-feature-icon" style={{background:'rgba(16,185,129,.1)'}}><Check className="w-[18px] h-[18px]" style={{color:'#10b981'}} /></div>
                      <div>
                        <h4 style={{fontSize:'14px', fontWeight:700, color:'var(--navy-950)'}}>Enterprise SLA Standards</h4>
                        <p style={{fontSize:'12.5px', color:'#6b6483', lineHeight:1.5}}>We pledge 99.99% system uptime for cloud networks and continuous maintenance support.</p>
                      </div>
                    </div>
                    <div className="about-feature">
                      <div className="about-feature-icon" style={{background:'rgba(16,185,129,.1)'}}><Check className="w-[18px] h-[18px]" style={{color:'#10b981'}} /></div>
                      <div>
                        <h4 style={{fontSize:'14px', fontWeight:700, color:'var(--navy-950)'}}>Custom High-Performance Tech Stack</h4>
                        <p style={{fontSize:'12.5px', color:'#6b6483', lineHeight:1.5}}>Websites & mobile applications built exclusively using modern serverless architectures and frameworks.</p>
                      </div>
                    </div>
                    <div className="about-feature">
                      <div className="about-feature-icon" style={{background:'rgba(16,185,129,.1)'}}><Check className="w-[18px] h-[18px]" style={{color:'#10b981'}} /></div>
                      <div>
                        <h4 style={{fontSize:'14px', fontWeight:700, color:'var(--navy-950)'}}>Continuous Delivery Integration</h4>
                        <p style={{fontSize:'12.5px', color:'#6b6483', lineHeight:1.5}}>Blazing-fast automated CI/CD configurations ensure zero-downtime deployment pipelines.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="about-right" id="why">
                  <div className="testimonial-card mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <span style={{fontSize:'10px', fontWeight:700, fontFamily:'var(--font-mono)', color:'var(--purple-600)', textTransform:'uppercase', letterSpacing:'0.05em'}}>Client Testimonial</span>
                      <div className="flex" style={{color:'var(--gold-400)'}}>
                        {[...Array(testimonials[testimonialIndex].stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div key={testimonialIndex} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{minHeight:100, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                        <p style={{fontSize:'13px', color:'#4a4263', lineHeight:1.6, fontStyle:'italic'}}>"{testimonials[testimonialIndex].quote}"</p>
                        <div style={{marginTop:12, paddingTop:10, borderTop:'1px solid #ece8f7', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <div>
                            <p style={{fontWeight:700, fontSize:'12px', color:'var(--navy-950)'}}>{testimonials[testimonialIndex].author}</p>
                            <p style={{fontSize:'10px', color:'#6b6483', fontFamily:'var(--font-mono)'}}>{testimonials[testimonialIndex].role}</p>
                          </div>
                          <div className="flex gap-1">
                            {testimonials.map((_, i) => (
                              <button key={i} onClick={() => setTestimonialIndex(i)} style={{width: testimonialIndex === i ? 12 : 6, height:6, borderRadius:'50%', border:'none', background: testimonialIndex === i ? 'var(--purple-600)' : '#d6cee8', transition:'all .2s', cursor:'pointer'}} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                    <div style={{background:'linear-gradient(135deg,#6b21e8,#8b3ff0)', borderRadius:'var(--radius-lg)', padding:20, color:'white'}}>
                      <Award className="w-6 h-6" style={{color:'var(--gold-300)'}} />
                      <p style={{fontSize:'24px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:12}}>0.1 Seconds</p>
                      <h4 style={{fontWeight:700, fontSize:'12px', marginTop:4}}>Average Page Load Speed</h4>
                      <p style={{fontSize:'10px', opacity:.8, marginTop:4, lineHeight:1.4}}>Highly-optimized web applications achieve flawless Lighthouse scores.</p>
                    </div>
                    <div style={{background:'linear-gradient(135deg,#1d0f4a,#160b3a)', borderRadius:'var(--radius-lg)', padding:20, color:'white'}}>
                      <Shield className="w-6 h-6" style={{color:'#34d399'}} />
                      <p style={{fontSize:'24px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:12}}>99.99%</p>
                      <h4 style={{fontWeight:700, fontSize:'12px', marginTop:4}}>Uptime SLA Guaranteed</h4>
                      <p style={{fontSize:'10px', opacity:.7, marginTop:4, lineHeight:1.4}}>Enterprise-grade K8s orchestrations mean zero downtimes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ PORTFOLIO ============ */}
          <section className="portfolio-section" id="portfolio">
            <div className="wrap">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="eyebrow justify-center" style={{color:'var(--gold-400)', justifyContent:'center'}}>Proven Digital Excellence</span>
                <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4" style={{fontFamily:'var(--font-display)', lineHeight:1.15}}>
                  Our Engineered <span style={{background:'linear-gradient(90deg,var(--gold-400),var(--pink-500),var(--cyan-400))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Case Studies.</span>
                </h2>
                <p style={{color:'rgba(182,172,217,.7)', fontSize:'14px', lineHeight:1.6}}>
                  Explore our flagship deployments showcasing enterprise web craftsmanship, smart contract creation, custom brand architectures, and robust cloud configurations.
                </p>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(480px, 1fr))', gap:32}}>
                {PROJECTS.map((project) => {
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
                    <div key={project.id} className="rounded-[32px] p-6 sm:p-8 text-left" style={{background:'linear-gradient(180deg,#130B2E,#0A051B)', border:'1px solid rgba(255,255,255,.05)'}}>
                      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
                        <div style={{padding:'10px', borderRadius:'16px', background:`linear-gradient(135deg,${project.color.includes('amber') ? '#f7b32b' : project.color.includes('purple') ? '#6b21e8' : project.color.includes('pink') ? '#ec1e79' : '#22d3ee'},${project.color.includes('amber') ? '#ffd45c' : project.color.includes('purple') ? '#8b3ff0' : project.color.includes('pink') ? '#f0508f' : '#0fb8ac'})`}}>
                          {getIcon()}
                        </div>
                        <div>
                          <h3 style={{fontSize:'18px', fontWeight:800, color:'white'}}>{project.title}</h3>
                          <p style={{fontSize:'10px', fontFamily:'var(--font-mono)', color:'var(--gold-400)', fontWeight:700}}>KPI: {project.metric}</p>
                        </div>
                      </div>
                      <p style={{fontSize:'13px', color:'rgba(182,172,217,.7)', lineHeight:1.6, marginBottom:12}}>{project.description}</p>

                      <div style={{display:'flex', flexWrap:'wrap', gap:6, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.05)', marginBottom:12}}>
                        {project.tech.map((t, i) => (
                          <span key={i} style={{fontSize:'10px', fontFamily:'var(--font-mono)', padding:'4px 10px', background:'rgba(255,255,255,.05)', borderRadius:6, color:'rgba(182,172,217,.6)'}}>{t}</span>
                        ))}
                      </div>

                      <button onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)} style={{width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', color:'rgba(182,172,217,.6)', fontSize:'11px', fontFamily:'var(--font-mono)', cursor:'pointer'}}>
                        <span>{expandedProject === project.id ? 'Hide Tech Blueprint' : 'View System Tech Blueprint'}</span>
                        <span style={{color:'var(--gold-400)'}}>{expandedProject === project.id ? '[ - CLOSE ]' : '[ + INSPECT ]'}</span>
                      </button>

                      {expandedProject === project.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{marginTop:12, background:'#05020c', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:16}}>
                          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                            <div>
                              <h4 style={{fontSize:'10px', fontFamily:'var(--font-mono)', color:'var(--gold-400)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.08em'}}>System Specifications</h4>
                              {project.specs?.map((spec, sIdx) => (
                                <div key={sIdx} style={{background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.05)', borderRadius:8, padding:'6px 10px', marginBottom:6}}>
                                  <span style={{fontSize:'8px', color:'rgba(182,172,217,.4)', textTransform:'uppercase', fontFamily:'var(--font-mono)'}}>{spec.label}</span>
                                  <p style={{fontSize:'10px', color:'white', fontFamily:'var(--font-mono)', fontWeight:700, marginTop:2}}>{spec.value}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 10px', background:'rgba(17,9,42,.8)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'8px 8px 0 0'}}>
                                <span style={{fontSize:'9px', fontFamily:'var(--font-mono)', color:'rgba(182,172,217,.6)'}}>Code</span>
                                <span style={{fontSize:'8px', fontFamily:'var(--font-mono)', color:'rgba(182,172,217,.3)'}}>READ_ONLY</span>
                              </div>
                              <pre style={{background:'rgba(0,0,0,.6)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'0 0 8px 8px', padding:12, fontSize:'9px', fontFamily:'var(--font-mono)', color:'#34d399', overflowX:'auto', maxHeight:160, lineHeight:1.5, margin:0}}><code>{project.codeSnippet}</code></pre>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
                        <span style={{fontSize:'10px', fontFamily:'var(--font-mono)', color:'rgba(182,172,217,.3)'}}>{`// CASE_STUDY_0${project.id === 'apexdex' ? '1' : project.id === 'cloudscale' ? '2' : project.id === 'equinox' ? '3' : '4'}`}</span>
                        <button onClick={() => openOrderModal(`Consultation regarding: ${project.title}`)} style={{background:'none', border:'none', display:'flex', alignItems:'center', gap:6, color:'rgba(182,172,217,.6)', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>
                          Inquire System Setup <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{marginTop:48, background:'linear-gradient(90deg,rgba(107,33,232,.2),rgba(28,15,66,.8),rgba(107,33,232,.2))', border:'1px solid rgba(139,63,240,.2)', borderRadius:24, padding:'32px 24px', textAlign:'center', maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
                <p style={{fontSize:'10px', fontFamily:'var(--font-mono)', color:'var(--gold-400)', textTransform:'uppercase', letterSpacing:'0.12em', fontWeight:700}}>// PRODUCTION ENVIRONMENT GUARANTEE</p>
                <h3 style={{fontSize:'20px', fontWeight:700, color:'white', marginTop:8, marginBottom:12}}>Ready to deploy your next custom crypto ecosystem or high-end platform?</h3>
                <p style={{fontSize:'13px', color:'rgba(182,172,217,.6)', maxWidth:500, margin:'0 auto 20px', lineHeight:1.6}}>
                  Our architects write production-grade TypeScript, Solidity, and cloud deployment manifests backed by 24/7 dedicated container support.
                </p>
                <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
                  <button onClick={() => openOrderModal("New Custom System Proposal")} className="btn btn-gold" style={{fontSize:'13px', padding:'12px 24px'}}>
                    Inquire Project Scope <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href="https://wa.me/2348158432605?text=Hello%20Vertex%20Technology%20Ltd,%20I'd%20like%20to%20discuss%20a%20new%20project%20with%20your%20team." target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{fontSize:'13px', padding:'12px 24px'}}>
                    <MessageSquare className="w-4 h-4" /> Chat with Founder on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ============ FAQ ============ */}
          <section className="faq-section" id="faq">
            <div className="wrap">
              <div className="faq-grid">
                <div className="faq-left">
                  <span className="eyebrow" style={{color:'var(--purple-600)', marginBottom:12, display:'inline-flex'}}>Got Questions?</span>
                  <h2>Frequently Asked<br /><span style={{background:'linear-gradient(90deg,var(--purple-600),var(--pink-500),var(--gold-400))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Inquiries.</span></h2>
                  <p style={{color:'#6b6483', fontSize:'14px', lineHeight:1.6, marginTop:12, maxWidth:360}}>
                    Learn more about our development pipelines, professional team experience, pricing models, and specialized Crypto and Brand systems.
                  </p>
                  <div style={{marginTop:24}}>
                    <a href="https://wa.me/2348158432605?text=Hello%20Vertex%20Technology%20Ltd,%20I'd%20like%20to%20ask%20a%20question%20regarding%20your%20services." target="_blank" rel="noopener noreferrer" className="btn" style={{background:'var(--navy-950)', color:'white', fontSize:'13px', padding:'12px 20px', borderRadius:12}}>
                      <MessageSquare className="w-4 h-4" style={{color:'var(--gold-400)'}} />
                      Have a custom query? Ask on WhatsApp
                    </a>
                  </div>
                </div>
                <div>
                  {FAQS.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="faq-item" style={{borderColor: isOpen ? 'var(--purple-600)' : '#e0d9f0'}}>
                        <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} style={{width:'100%', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, background:'none', textAlign:'left', cursor:'pointer', border:'none'}}>
                          <span style={{fontSize:'13px', fontWeight:600, color: isOpen ? 'var(--purple-600)' : 'var(--navy-950)'}}>{faq.question}</span>
                          <div style={{width:24, height:24, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background: isOpen ? 'rgba(107,33,232,.08)' : '#f5f3fa', transform: isOpen ? 'rotate(90deg)' : 'none', transition:'transform .2s'}}>
                            <ChevronRight className="w-4 h-4" style={{color: isOpen ? 'var(--purple-600)' : '#6b6483'}} />
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial="collapsed" animate="open" exit="collapsed" variants={{open:{opacity:1,height:'auto'},collapsed:{opacity:0,height:0}}} transition={{duration:.3}}>
                              <div style={{padding:'0 20px 16px', fontSize:'12.5px', color:'#6b6483', lineHeight:1.6, borderTop:'1px solid #f0edf7', paddingTop:12}}>
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

          {/* ============ LOWER STATS ============ */}
          <div className="lower-stats">
            <div className="wrap">
              <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16, textAlign:'center'}}>
                <div>
                  <SmileIcon className="w-6 h-6 mx-auto" style={{color:'var(--gold-400)'}} />
                  <p style={{fontSize:'20px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:4}}>350+</p>
                  <p style={{fontSize:'11px', opacity:.7}}>Corporate Clients</p>
                </div>
                <div>
                  <Award className="w-6 h-6 mx-auto" style={{color:'var(--gold-400)'}} />
                  <p style={{fontSize:'20px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:4}}>850+</p>
                  <p style={{fontSize:'11px', opacity:.7}}>Production Deployments</p>
                </div>
                <div>
                  <Shield className="w-6 h-6 mx-auto" style={{color:'var(--gold-400)'}} />
                  <p style={{fontSize:'20px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:4}}>99.99%</p>
                  <p style={{fontSize:'11px', opacity:.7}}>Average Server Uptime</p>
                </div>
                <div>
                  <Clock className="w-6 h-6 mx-auto" style={{color:'var(--gold-400)'}} />
                  <p style={{fontSize:'20px', fontWeight:800, fontFamily:'var(--font-mono)', marginTop:4}}>15 Min</p>
                  <p style={{fontSize:'11px', opacity:.7}}>Incident SLA Response</p>
                </div>
                <a href="https://wa.me/2348158432605" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                  <Phone className="w-6 h-6 mx-auto" style={{color:'#34d399'}} />
                  <p style={{fontSize:'12px', fontWeight:700, fontFamily:'var(--font-mono)', marginTop:4, color:'white'}}>08158432605</p>
                  <p style={{fontSize:'11px', opacity:.7, color:'white'}}>Call / WhatsApp</p>
                </a>
              </div>
            </div>
          </div>

          {/* ============ FOOTER ============ */}
          <footer className="vertex-footer" id="contact">
            <div className="wrap">
              <div className="footer-grid">
                <div className="footer-brand">
                  <div className="logo">
                    <svg width="30" height="32" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 20 C4 20 -2 34 8 46 L46 96 C56 108 70 108 80 96 L106 62" stroke="url(#vg1)" strokeWidth="15" strokeLinecap="round" fill="none"/>
                      <path d="M40 30 L64 62 L98 20" stroke="url(#vg2)" strokeWidth="17" strokeLinecap="round" fill="none"/>
                    </svg>
                    <span style={{color:'white'}}>VERTEX<span className="logo-sub">FINTECH LTD</span></span>
                  </div>
                  <p>We build, design, and grow brands for businesses and individuals thriving globally.</p>
                </div>
                <div className="footer-col">
                  <h6>Company</h6>
                  <button onClick={() => scrollToId("about")}>About Us</button>
                  <button onClick={() => scrollToId("why")}>Why Us</button>
                  <button onClick={() => scrollToId("services")}>Services</button>
                  <button onClick={() => scrollToId("products")}>Products</button>
                </div>
                <div className="footer-col">
                  <h6>Services</h6>
                  <button onClick={() => scrollToId("services")}>Web Development</button>
                  <button onClick={() => scrollToId("services")}>App Development</button>
                  <button onClick={() => scrollToId("services")}>Digital Branding</button>
                  <button onClick={() => scrollToId("services")}>Marketing</button>
                </div>
                <div className="footer-col">
                  <h6>Get In Touch</h6>
                  <a href="tel:08158432605">📞 08158432605</a>
                  <a href="mailto:hello@vertexfintech.com">✉️ hello@vertexfintech.com</a>
                  <span style={{color:'var(--ink-dim)', fontSize:'13.5px'}}>📍 Serving clients worldwide</span>
                </div>
              </div>
              <div className="footer-bottom">
                <span>© 2026 Vertex Fintech Ltd. All rights reserved.</span>
                <span>Innovate · Create · Elevate</span>
              </div>
            </div>
          </footer>

          {/* ============ MODALS ============ */}
          <LeadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            preselectedProduct={preselectedProduct}
          />
          <TeamMemberModal
            isOpen={isTeamModalOpen}
            onClose={() => { setIsTeamModalOpen(false); setSelectedTeamMember(null); }}
            member={selectedTeamMember}
          />
        </>
      )}
    </div>
  );
}

function GlobeIcon(props: { className?: string }) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>
    </svg>
  );
}

function SmileIcon(props: { className?: string }) {
  const { className } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  );
}
