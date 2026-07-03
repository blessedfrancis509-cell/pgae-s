import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Palette, Cpu, Globe, Smartphone, Cloud, ArrowRight, Shield, CheckCircle, Terminal } from "lucide-react";
import { Service } from "../types";

interface MockupsProps {
  activeService: Service;
  onSelectService: (service: Service) => void;
  services: Service[];
}

export const Mockups: React.FC<MockupsProps> = ({ activeService, onSelectService, services }) => {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center select-none overflow-visible">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/25 to-purple-500/25 blur-3xl -z-10" />

      {/* Floating 3D-like Badge Cards */}
      {/* 1. Code Badge */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-6 md:left-12 bg-blue-600/90 text-white p-3 rounded-2xl shadow-xl border border-blue-400/40 flex items-center gap-2 z-20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelectService(services.find(s => s.id === "web-dev") || services[0])}
      >
        <div className="bg-blue-500/50 p-1.5 rounded-lg">
          <Code className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">Service</p>
          <p className="text-xs font-semibold">Web Craft</p>
        </div>
      </motion.div>

      {/* 2. UI/UX Design Badge */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-12 right-6 md:right-12 bg-pink-600/95 text-white p-3 rounded-2xl shadow-xl border border-pink-400/40 flex items-center gap-2 z-20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelectService(services.find(s => s.id === "ui-ux-design") || services[0])}
      >
        <div className="bg-pink-500/50 p-1.5 rounded-lg">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-[10px] text-pink-200 uppercase tracking-widest font-mono">Design</p>
          <p className="text-xs font-semibold">Interactive UI</p>
        </div>
      </motion.div>

      {/* 3. Cloud Systems Badge */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-6 right-8 md:right-20 bg-violet-600/90 text-white p-3 rounded-2xl shadow-xl border border-violet-400/40 flex items-center gap-2 z-20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelectService(services.find(s => s.id === "cloud-eng") || services[0])}
      >
        <div className="bg-violet-500/50 p-1.5 rounded-lg">
          <Cloud className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-[10px] text-violet-200 uppercase tracking-widest font-mono">Infrastructure</p>
          <p className="text-xs font-semibold">Cloud SRE</p>
        </div>
      </motion.div>

      {/* 4. DevOps Terminal Badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-28 left-2 md:left-6 bg-emerald-600/90 text-white p-3 rounded-2xl shadow-xl border border-emerald-300/40 flex items-center gap-2 z-20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelectService(services.find(s => s.id === "devops-cicd") || services[0])}
      >
        <div className="bg-emerald-400/50 p-1.5 rounded-lg">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-mono">Pipelines</p>
          <p className="text-xs font-semibold">CI/CD Engine</p>
        </div>
      </motion.div>

      {/* MAIN LAPTOP MOCKUP CONTAINER */}
      <div className="relative w-[280px] sm:w-[360px] md:w-[480px] h-[200px] sm:h-[260px] md:h-[330px] flex flex-col items-center justify-center z-10">
        {/* Laptop Screen Frame */}
        <div className="relative w-full h-[88%] bg-neutral-900 rounded-t-2xl p-1.5 sm:p-2.5 md:p-3.5 shadow-2xl border border-neutral-700/80 flex flex-col justify-between overflow-hidden">
          
          {/* Inner Display Screen */}
          <div className="relative w-full h-full rounded-lg bg-neutral-950 overflow-hidden flex flex-col">
            
            {/* Display Header */}
            <div className="w-full h-5 sm:h-7 bg-neutral-900 border-b border-neutral-800 px-2 sm:px-3 flex items-center justify-between">
              <div className="flex gap-1 sm:gap-1.5">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-500/80" />
                <span className="w-1.5 sm:w-2 h-Yellow-500 bg-yellow-500/80 rounded-full" />
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-neutral-950/80 px-2 rounded text-[8px] sm:text-[10px] text-neutral-400 font-mono w-28 sm:w-44 text-center truncate">
                vertexdev.io/services/{activeService.id}
              </div>
              <div className="w-4" />
            </div>

            {/* Display Content (Changes with activeService) */}
            <div className="flex-1 p-2 sm:p-4 text-white overflow-hidden relative flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col justify-between text-left"
                >
                  {/* Small custom design content on laptop */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono">Console Active</span>
                      </div>
                      <h4 className="text-xs sm:text-base font-bold text-neutral-100 mt-1">
                        {activeService.title}
                      </h4>
                    </div>
                    {/* Tiny custom graphic logo inside */}
                    <div className="flex items-center gap-1 bg-purple-400/10 text-purple-400 border border-purple-400/20 px-1.5 py-0.5 rounded text-[8px] font-mono">
                      <Shield className="w-2 h-2" /> VERTEX
                    </div>
                  </div>

                  {/* Dynamic Inner Preview representation based on service */}
                  <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2 flex-1 my-1.5 sm:my-3 flex flex-col justify-center overflow-hidden">
                    {activeService.id === "web-dev" && (
                      <div className="space-y-1 sm:space-y-1.5 font-mono text-[8px] sm:text-[10px] text-emerald-400">
                        <p className="text-neutral-500">// Compiling modern high-speed bundle...</p>
                        <p><span className="text-pink-400">import</span> {`{ React }`} <span className="text-pink-400">from</span> 'react';</p>
                        <p><span className="text-pink-400">const</span> App = () =&gt; <span className="text-yellow-300">optimizeMetrics</span>()</p>
                        <p className="text-cyan-400">✓ Build Succeeded. Core Vitals score: 100/100</p>
                      </div>
                    )}
                    {activeService.id === "cloud-eng" && (
                      <div className="space-y-1 sm:space-y-1.5 font-mono text-[8px] sm:text-[10px] text-purple-300 text-left">
                        <p className="text-neutral-500"># Terraform cluster setup</p>
                        <p>resource "aws_eks_cluster" "prod" &#123;</p>
                        <p className="pl-3">scaling_config &#123; desired_size = 8 &#125;</p>
                        <p>&#125;</p>
                        <p className="text-emerald-400">✓ Cluster provisioned. All regional pods healthy.</p>
                      </div>
                    )}
                    {activeService.id === "app-dev" && (
                      <div className="flex gap-2 items-center">
                        <div className="w-8 h-12 bg-neutral-950 rounded-md border border-neutral-800 flex flex-col justify-between p-1">
                          <span className="w-full h-0.5 bg-neutral-800 rounded" />
                          <div className="space-y-0.5">
                            <span className="block w-full h-1 bg-pink-500 rounded-sm" />
                            <span className="block w-3 h-1 bg-neutral-800 rounded-sm" />
                          </div>
                          <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full mx-auto" />
                        </div>
                        <div className="flex-1 space-y-1 text-left text-[8px] sm:text-[10px]">
                          <p className="font-semibold text-neutral-200">Mobile iOS & Android</p>
                          <p className="text-neutral-400 text-[7px] sm:text-[9px]">Push notification registers & secure offline-first sync enabled.</p>
                        </div>
                      </div>
                    )}
                    {activeService.id === "software-sol" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[7px] sm:text-[9px] text-neutral-400 font-mono">
                          <span>Db Queries</span>
                          <span className="text-amber-400 font-bold animate-pulse">Sync Active</span>
                        </div>
                        <div className="flex items-end gap-1 h-8 sm:h-12 bg-neutral-950/40 rounded border border-neutral-800 p-1">
                          <span className="bg-amber-500 w-full h-[40%] rounded-t-sm" />
                          <span className="bg-yellow-400 w-full h-[65%] rounded-t-sm animate-pulse" />
                          <span className="bg-amber-400 w-full h-[85%] rounded-t-sm" />
                          <span className="bg-neutral-800 w-full h-[30%] rounded-t-sm" />
                          <span className="bg-yellow-500 w-full h-[95%] rounded-t-sm" />
                        </div>
                      </div>
                    )}
                    {activeService.id === "ui-ux-design" && (
                      <div className="flex items-center justify-between gap-2 h-full">
                        <div className="flex-1 flex flex-wrap gap-1">
                          <span className="px-1 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[7px] sm:text-[9px]">#BrandSystem</span>
                          <span className="px-1 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[7px] sm:text-[9px]">#Vectors</span>
                          <span className="px-1 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[7px] sm:text-[9px]">#DesignTokens</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-400/40 flex items-center justify-center animate-spin-slow">
                          <Palette className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                    )}
                    {activeService.id === "crypto-systems" && (
                      <div className="space-y-1 sm:space-y-1.5 font-mono text-[8px] sm:text-[10px] text-amber-400 text-left">
                        <p className="text-neutral-500">// Deploying Ethereum & BSC ERC-20 token contract...</p>
                        <p><span className="text-pink-400">contract</span> VertexToken <span className="text-pink-400">is</span> ERC20 &#123;</p>
                        <p className="pl-3">constructor() ERC20("Vertex", "VTX") &#123; _mint(msg.sender, 1000000); &#125;</p>
                        <p>&#125;</p>
                        <p className="text-emerald-400">✓ Compiled. Web3 RPC Node synced. Safe-Math Verified.</p>
                      </div>
                    )}
                    {activeService.id === "devops-cicd" && (
                      <div className="space-y-1 text-center font-mono">
                        <p className="text-[8px] sm:text-[10px] text-neutral-300 font-semibold uppercase tracking-wider">Pipeline Metrics</p>
                        <div className="h-5 sm:h-7 bg-white/5 rounded flex items-center justify-between px-2 border border-white/10">
                          <span className="text-[7px] sm:text-[9px] text-neutral-400">Test Harness</span>
                          <span className="text-emerald-400 text-[7px] sm:text-[9px] font-bold">100% Passed</span>
                        </div>
                        <div className="h-5 sm:h-7 bg-white/5 rounded flex items-center justify-between px-2 border border-white/10">
                          <span className="text-[7px] sm:text-[9px] text-neutral-400">Fast Deploy</span>
                          <span className="text-emerald-400 text-[7px] sm:text-[9px] font-bold">Vercel Edge</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Micro Footer inside screen */}
                  <div className="flex items-center justify-between text-[7px] sm:text-[9px] text-neutral-500 font-mono pt-1 border-t border-neutral-900">
                    <span>Vertex Dev Engine v5.2</span>
                    <span>100% Build Uptime</span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div className="relative w-[114%] h-[6%] bg-neutral-800 rounded-t-sm shadow-xl border-t border-neutral-600 flex justify-center">
          {/* Subtle line for keyboard groove */}
          <div className="w-[30%] h-[3px] bg-neutral-900 rounded-b" />
        </div>

        {/* Laptop Base Bottom Lip */}
        <div className="relative w-[114%] h-[3%] bg-neutral-950 rounded-b-xl shadow-2xl flex items-center justify-center">
          {/* Small notch for opening */}
          <div className="w-12 h-1 bg-neutral-800 rounded-b-md" />
        </div>
      </div>

      {/* FLOATING SMARTPHONE MOCKUP */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute bottom-2 left-[10%] sm:left-[22%] md:left-[25%] w-[85px] sm:w-[110px] md:w-[130px] h-[160px] sm:h-[210px] md:h-[250px] bg-neutral-900 rounded-[24px] sm:rounded-[32px] p-1.5 shadow-2xl border border-neutral-700/80 z-20 overflow-hidden flex flex-col justify-between"
      >
        {/* Smartphone Inner Display Screen */}
        <div className="relative w-full h-full rounded-[18px] sm:rounded-[26px] bg-neutral-950 overflow-hidden flex flex-col p-1.5 sm:p-2.5 justify-between">
          
          {/* Top Speaker/Camera notch */}
          <div className="w-14 sm:w-18 h-3 sm:h-4 bg-neutral-900 rounded-full mx-auto flex items-center justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-blue-500/60" />
            <span className="w-6 sm:w-8 h-0.5 bg-neutral-800 rounded" />
          </div>

          {/* Smartphone Branding Content */}
          <div className="flex-1 flex flex-col justify-between py-1 sm:py-2 select-none">
            
            {/* Minimal App Header */}
            <div className="flex items-center justify-between text-[6px] sm:text-[8px] text-neutral-400 font-mono">
              <span>Vertex Console</span>
              <span>100% Secure</span>
            </div>

            {/* Middle logo graphic */}
            <div className="my-auto flex flex-col items-center">
              {/* Colorful stylized 'V' logo inside phone */}
              <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 rounded-full p-1.5 shadow-lg shadow-purple-900/30">
                <Shield className="w-full h-full text-white" />
              </div>
              <p className="text-[7px] sm:text-[9px] font-bold text-white mt-1 sm:mt-1.5 tracking-wider font-sans">VERTEX</p>
              <p className="text-[5px] sm:text-[7px] text-yellow-400 font-mono uppercase tracking-widest mt-0.5">Cloud Console</p>
            </div>

            {/* Mini action card */}
            <div className="bg-neutral-900/80 rounded-lg p-1 sm:p-1.5 border border-neutral-800/80">
              <div className="flex justify-between items-center text-[5px] sm:text-[7px] text-neutral-300 font-sans">
                <span>Eng Cluster</span>
                <span className="text-emerald-400 font-bold">Stable</span>
              </div>
              <div className="h-1 bg-neutral-950 rounded-full mt-1 overflow-hidden">
                <span className="block h-full w-[98%] bg-gradient-to-r from-emerald-500 to-cyan-400" />
              </div>
            </div>

          </div>

          {/* Home indicator bar */}
          <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-neutral-800 rounded-full mx-auto mt-1" />
        </div>
      </motion.div>
    </div>
  );
};
