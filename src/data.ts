import { Service, ExtraProduct, Partner, Stat, LocationPin } from "./types";

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Premium, responsive web applications built using Next.js, React, and Tailwind CSS for ultimate speed and pixel-perfect conversions.",
    iconName: "Code",
    gradient: "from-blue-600 to-cyan-400",
    textColor: "text-blue-400",
    features: [
      "Custom React & Next.js architectures",
      "Dynamic Headless CMS integrations",
      "SEO & Core Web Vitals optimization",
      "Interactive micro-frontends & custom APIs"
    ]
  },
  {
    id: "cloud-eng",
    title: "Cloud Engineering",
    description: "Architecting secure, auto-scaling cloud infrastructure on AWS, Google Cloud, and Microsoft Azure to ensure high availability.",
    iconName: "Globe",
    gradient: "from-violet-600 to-fuchsia-400",
    textColor: "text-violet-400",
    features: [
      "Serverless setups & container orchestration",
      "Robust microservices & database clusters",
      "Zero-downtime infrastructure design",
      "Terraform & IaC automation pipelines"
    ]
  },
  {
    id: "app-dev",
    title: "Mobile App Development",
    description: "Immersive iOS & Android applications designed to perform natively, supporting complex off-line Sync and real-time state.",
    iconName: "Smartphone",
    gradient: "from-pink-500 to-rose-400",
    textColor: "text-pink-400",
    features: [
      "Native iOS Swift & Android Kotlin builds",
      "Cross-platform Flutter & React Native setups",
      "Offline-first client-side synchronization",
      "Secure biometrics & unified payment gateways"
    ]
  },
  {
    id: "software-sol",
    title: "Custom Software Solutions",
    description: "Tailored enterprise systems designed to automate workflows and unify legacy corporate frameworks into one unified system.",
    iconName: "Monitor",
    gradient: "from-amber-500 to-yellow-300",
    textColor: "text-amber-400",
    features: [
      "Centralized ERP & custom business pipelines",
      "High-throughput internal web portals",
      "Secure custom database structures",
      "Advanced AI models & algorithmic automation"
    ]
  },
  {
    id: "ui-ux-design",
    title: "Brand Design & UI/UX",
    description: "Elegant layout pairings, bespoke brand identity designs, typography, and beautiful interactions that build trust and tell your brand's unique story.",
    iconName: "Palette",
    gradient: "from-purple-500 to-indigo-400",
    textColor: "text-purple-400",
    features: [
      "Bespoke brand design guidelines & logos",
      "High-fidelity visual mockups & interactive prototypes",
      "Modern animation & sound feedback systems",
      "Comprehensive design systems for unified scale"
    ]
  },
  {
    id: "crypto-systems",
    title: "Crypto Ecosystems & Token Creation",
    description: "Designing premium token economies, secure audited Solidity smart contracts, decentralized applications (dApps), and custom Web3 integrations.",
    iconName: "Cpu",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    textColor: "text-amber-400",
    features: [
      "Custom ERC-20 / BEP-20 / NFT token creation",
      "Audited Solidity smart contract development",
      "Decentralized wallet & exchange (DEX) integrations",
      "Custom tokenomics architecture & ecosystem modeling"
    ]
  },
  {
    id: "devops-cicd",
    title: "DevOps & CI/CD Automation",
    description: "Optimizing code delivery speed with fast compilation, rigorous automated testing, and automated deployment architectures.",
    iconName: "Briefcase",
    gradient: "from-emerald-500 to-teal-400",
    textColor: "text-emerald-400",
    features: [
      "Dockerized development configurations",
      "Automated testing & linting checks",
      "Secure secrets & environment variables",
      "Continuous git-integrated deployment"
    ]
  }
];

export const EXTRA_PRODUCTS: ExtraProduct[] = [
  {
    id: "cloud-clusters",
    title: "Dedicated DevOps Orchestration",
    description: "Get full-time elite site reliability engineers to configure automated kubernetes clusters, secrets storage, and monitoring tools.",
    iconName: "ShieldCheck",
    badge: "Enterprise",
    priceEstimate: "Custom SRE Support"
  },
  {
    id: "dedicated-squads",
    title: "Dedicated Engineering Squads",
    description: "Highly trained senior software developers integrated into your agile sprint cycles, delivering flawless commits every day.",
    iconName: "Users",
    badge: "Scale Fast",
    priceEstimate: "Monthly retainer"
  },
  {
    id: "safe-secure",
    title: "24/7 Support & SLA Maintenance",
    description: "Guaranteed uptime SLAs with active health checks, database backups, and rapid incident resolution for mission-critical web applications.",
    iconName: "Clock",
    badge: "100% Reliable",
    priceEstimate: "Full Coverage"
  }
];

export const PARTNERS: Partner[] = [
  { name: "Google Cloud", iconName: "Globe" },
  { name: "Microsoft Azure", iconName: "Cpu" },
  { name: "AWS", iconName: "Cloud" },
  { name: "Vercel", iconName: "Triangle" },
  { name: "GitHub", iconName: "Github" },
  { name: "Netlify", iconName: "Zap" }
];

export const STATS: Stat[] = [
  { id: "clients", value: "350+", label: "Corporate Clients", iconName: "Smile" },
  { id: "projects", value: "850+", label: "Production Deployments", iconName: "Award" },
  { id: "uptime", value: "99.99%", label: "Average Server Uptime", iconName: "Shield" },
  { id: "support", value: "15 Min", label: "Incident SLA Response", iconName: "Clock" }
];

export const WORLD_PINS: LocationPin[] = [
  { id: "na", name: "United States (NY Office)", x: 25, y: 35, status: "Active Node", ipRange: "104.244.42.1" },
  { id: "sa", name: "Brazil (LATAM Hub)", x: 35, y: 72, status: "Active Node", ipRange: "177.105.12.9" },
  { id: "eu", name: "United Kingdom (London HQ)", x: 48, y: 28, status: "Primary Gate", ipRange: "185.86.151.3" },
  { id: "af", name: "Nigeria (Lagos Hub)", x: 50, y: 58, status: "Active Node", ipRange: "102.89.34.205" },
  { id: "as", name: "Singapore (APAC Gateway)", x: 78, y: 56, status: "Active Node", ipRange: "210.14.99.18" },
  { id: "au", name: "Australia (Sydney Office)", x: 88, y: 80, status: "Active Node", ipRange: "203.0.113.50" }
];
