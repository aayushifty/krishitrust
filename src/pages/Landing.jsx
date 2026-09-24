// src/pages/Landing.jsx
// Minimalist, Lowkey Cyber-Aesthetic Landing Page for KrishiTrust
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Truck, 
  Sparkles,
  Activity,
  Coins,
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-400 font-sans relative overflow-hidden">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-sm flex items-center gap-2">
              KRISHITRUST
              <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                v2.2
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <Link 
              to="/login"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold tracking-tight transition shadow-sm shadow-emerald-500/20"
            >
              Enter Portal →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Lowkey Hero Stage */}
      <main className="flex-1 max-w-6xl mx-auto px-6 pt-16 pb-20 flex flex-col justify-center">
        
        {/* Status Chip */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">PRITHVI HIGHWAY CORRIDOR</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-semibold">ONLINE • 500 KBPS</span>
          </div>
        </div>

        {/* Minimal Hero Header */}
        <div className="space-y-4 max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            The Trust Layer for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Cold Supply Chains.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Zero-hardware ECU telematics, decoupled liability attribution, and collateral-free agricultural micro-loans for Nepal.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-tight transition shadow-lg shadow-emerald-500/20"
            >
              Enter Stakeholder Portal
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 font-semibold text-xs transition"
            >
              Live Operations
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/sponsor"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white transition"
            >
              Sponsor Marketplace <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 4 Lowkey Visual Pillar Tiles (Representing Something, No Text Fluff) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          {/* Tile 1: CAN-Bus Highway Node */}
          <Link 
            to="/can"
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                CAN 2.0B
              </span>
            </div>
            <div>
              <div className="font-mono text-xl font-black text-white mb-1">4.8°C SAFE</div>
              <div className="text-[11px] font-semibold text-slate-400">BA 2 KHA 4812 • Highway Telematics</div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-emerald-400 transition">
                Inspect live CAN stream <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Tile 2: Farmer Reliability Passport */}
          <Link 
            to="/sponsor"
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-teal-500/40 transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                AAA+ ELITE
              </span>
            </div>
            <div>
              <div className="font-mono text-xl font-black text-white mb-1">94 / 100</div>
              <div className="text-[11px] font-semibold text-slate-400">Bharat Sharma • Chitwan Polyhouse</div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-teal-400 transition">
                View reliability scorecard <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Tile 3: ADBL Bank Smart Escrow */}
          <Link 
            to="/dashboard"
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/40 transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Coins className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                0% COLLATERAL
              </span>
            </div>
            <div>
              <div className="font-mono text-xl font-black text-white mb-1">Rs. 5,00,000</div>
              <div className="text-[11px] font-semibold text-slate-400">ADBL Smart Escrow Disbursal</div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-amber-400 transition">
                Open bank underwriter view <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Tile 4: B2B Supermarket Procurement */}
          <Link 
            to="/ecosystem"
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/40 transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                B2B QR SEAL
              </span>
            </div>
            <div>
              <div className="font-mono text-xl font-black text-white mb-1">20 Tons / Wk</div>
              <div className="text-[11px] font-semibold text-slate-400">Bhat-Bhateni &amp; Wai-Wai Off-Take</div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1 group-hover:text-cyan-400 transition">
                Explore buyer network <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

        </div>

        {/* Lowkey Bottom Telemetry Strip */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SAE J1939 ECU LINK
            </span>
            <span>NPR 1.8 ARBA MARKET</span>
            <span>100% FARMER INSULATED</span>
          </div>

          <div className="text-slate-600">
            IdeaX Hackathon 2026 • Agri-FinTech
          </div>
        </div>

      </main>
    </div>
  );
};

export default Landing;