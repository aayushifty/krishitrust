// src/pages/Login.jsx
// Interactive Front-Door Stakeholder Portal with Real-Time Decoupling Simulator
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Users, 
  Truck, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  Scale,
  Coins,
  Cpu,
  Zap,
  Activity,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { loginUser } from '../services/api';

const demoCredentials = [
  // Farmers
  {
    category: 'Farmer',
    name: 'Bharat Sharma (Chitwan)',
    email: 'bharat@krishitrust.com',
    password: 'kisan123',
    role: 'Smallholder Farmer',
    tag: 'Chitwan Polyhouse • AAA+',
    color: 'emerald'
  },
  {
    category: 'Farmer',
    name: 'Sita Gurung (Pokhara)',
    email: 'sita@krishitrust.com',
    password: 'kisan123',
    role: 'Organic Vegetable Farmer',
    tag: 'Pokhara Valley Organic',
    color: 'emerald'
  },
  {
    category: 'Farmer',
    name: 'Balaram Karki (Dhading)',
    email: 'balaram@krishitrust.com',
    password: 'kisan123',
    role: 'Potato Cooperative Farmer',
    tag: 'Dhading Co-op Lead',
    color: 'emerald'
  },
  // Transporters
  {
    category: 'Transporter',
    name: 'Ramesh Shrestha',
    email: 'ramesh@krishitrust.com',
    password: 'driver123',
    role: 'Fleet Captain (Truck BA 2 KHA 4812)',
    tag: 'Tata Reefer • J1939 CAN',
    color: 'blue'
  },
  {
    category: 'Transporter',
    name: 'Hari Thapa',
    email: 'hari@krishitrust.com',
    password: 'driver123',
    role: 'Truck Driver (GA 1 KHA 9180)',
    tag: 'Western Corridor Haul',
    color: 'blue'
  },
  {
    category: 'Transporter',
    name: 'Sunil Chaudhary',
    email: 'sunil@krishitrust.com',
    password: 'driver123',
    role: 'Reefer Driver (NA 5 KHA 3120)',
    tag: 'Cold-Chain Express',
    color: 'blue'
  },
  // Sponsors
  {
    category: 'Sponsor',
    name: 'Agricultural Development Bank (ADBL)',
    email: 'adbl@krishitrust.com',
    password: 'sponsor123',
    role: 'Chief Microfinance Underwriter',
    tag: 'Smart Escrow • Rs. 50L Pool',
    color: 'purple'
  },
  {
    category: 'Sponsor',
    name: 'Shikhar Agricultural Insurance',
    email: 'shikhar@krishitrust.com',
    password: 'sponsor123',
    role: 'Transit Claims Director',
    tag: '100% Spoilage Insulation',
    color: 'purple'
  },
  {
    category: 'Sponsor',
    name: 'Sana Kisan Bikas Bank',
    email: 'sanakisan@krishitrust.com',
    password: 'sponsor123',
    role: 'Cooperative Sponsorship Lead',
    tag: 'Grassroots Smallholder Fund',
    color: 'purple'
  }
];

const Login = () => {
  const [email, setEmail] = useState('adbl@krishitrust.com');
  const [password, setPassword] = useState('sponsor123');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState('normal'); // 'normal' | 'crisis'
  const [activeStep, setActiveStep] = useState(2);
  const navigate = useNavigate();

  const isCrisis = scenario === 'crisis';

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await loginUser(email, password);
    if (res.success && res.user) {
      if (res.user.category === 'Sponsor') {
        navigate('/sponsor');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  const handleQuickLogin = async (demo) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setLoading(true);
    const res = await loginUser(demo.email, demo.password);
    if (res.success && res.user) {
      if (res.user.category === 'Sponsor') {
        navigate('/sponsor');
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  const protocolSteps = [
    {
      num: 1,
      title: 'Farmgate Harvest QR',
      subtitle: 'Batch KT-94 Sealed at Chitwan Polyhouse',
      tag: 'ORIGIN VERIFIED',
      color: 'emerald'
    },
    {
      num: 2,
      title: 'CAN 2.0B Chilled Transit',
      subtitle: 'Prithvi Highway • J1939 ECU Telemetry',
      tag: isCrisis ? '28.4°C HEAT SPIKE' : '4.8°C CHILLED SAFE',
      color: isCrisis ? 'rose' : 'emerald'
    },
    {
      num: 3,
      title: 'Liability Decoupling',
      subtitle: isCrisis ? 'Carrier Fault Flagged • Farmer 100% Protected' : 'Zero Shock Detected • Pure Quality',
      tag: isCrisis ? 'FARMER INSULATED' : '100% INTACT',
      color: isCrisis ? 'amber' : 'teal'
    },
    {
      num: 4,
      title: 'Smart Escrow Disbursal',
      subtitle: 'ADBL Disburses Rs. 5,00,000 Uncollateralized',
      tag: 'FUNDS SECURED',
      color: 'cyan'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-center max-w-6xl mx-auto py-8 px-4 antialiased selection:bg-emerald-500/20 selection:text-emerald-400 font-sans relative">
      
      {/* Dynamic Ambient Radial Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] blur-3xl pointer-events-none -z-10 transition-all duration-700 ${
        isCrisis 
          ? 'bg-gradient-to-b from-rose-500/15 via-rose-500/5 to-transparent' 
          : 'bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent'
      }`} />

      {/* Live Running Telemetry Ticker */}
      <div className="w-full bg-white/[0.02] border-y border-white/[0.06] py-1.5 px-4 mb-6 overflow-hidden rounded-lg">
        <div className="animate-ticker text-[10.5px] font-mono text-zinc-400 flex items-center gap-8">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CAN BUS 2.0B: ONLINE
          </span>
          <span>FRAME: 0x18F0090B</span>
          <span className={isCrisis ? 'text-rose-400 font-bold' : 'text-emerald-300'}>
            REEFER: {isCrisis ? '28.4°C CRITICAL EXCURSION' : '4.8°C SAFE'}
          </span>
          <span>SPEED: 48.2 KM/H</span>
          <span>VIBRATION: 0.28G NOMINAL</span>
          <span>HIGHWAY: PRITHVI KM 64 (MUGLING PASS)</span>
          <span className="text-amber-400">ADBL ESCROW: ARMED</span>
          <span className="text-cyan-400">HASH: 0xKT94-NEPAL</span>
          <span className="text-white/20">///</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CAN BUS 2.0B: ONLINE
          </span>
          <span>FRAME: 0x18F0090B</span>
          <span className={isCrisis ? 'text-rose-400 font-bold' : 'text-emerald-300'}>
            REEFER: {isCrisis ? '28.4°C CRITICAL EXCURSION' : '4.8°C SAFE'}
          </span>
          <span>SPEED: 48.2 KM/H</span>
          <span>VIBRATION: 0.28G NOMINAL</span>
        </div>
      </div>

      {/* Top Portal Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400">
          <span className={`w-2 h-2 rounded-full ${isCrisis ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-slate-300">PRITHVI HIGHWAY CORRIDOR</span>
          <span className="text-white/20">|</span>
          <span className={`font-semibold ${isCrisis ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isCrisis ? 'INCIDENT ACTIVE • 28.4°C' : 'ONLINE • 500 KBPS'}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          KrishiTrust Stakeholder Portal
        </h1>
        
        <div className="flex items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span>FEDERATED IDENTITY GATEWAY</span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400">0% LAND COLLATERAL PROTOCOL</span>
        </div>
      </div>

      {/* Interactive Scenario Switcher (STAR FEATURE: Makes KrishiTrust Instantly Understandable) */}
      <div className="mb-6 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 max-w-2xl mx-auto shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300 font-semibold">Live Highway Telemetry Simulation:</span>
          </div>
          
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setScenario('normal')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                !isCrisis 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Normal Transit (4.8°C Safe)
            </button>
            <button
              onClick={() => setScenario('crisis')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                isCrisis 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm animate-pulse-crisis' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Simulate Spoilage Crisis (28.4°C)
            </button>
          </div>
        </div>

        {/* Dynamic Decoupling Banner */}
        <div className={`mt-2.5 pt-2.5 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] gap-2 ${
          isCrisis ? 'text-rose-300' : 'text-zinc-400'
        }`}>
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>
              {isCrisis ? (
                <>
                  <strong className="text-rose-400">Kurintar Compressor Failure Flagged:</strong> Middleman price cut denied. Farmer Bharat Sharma receives 100% payment via Shikhar Insurance!
                </>
              ) : (
                <>
                  <strong className="text-emerald-400">Cold Chain Compliant:</strong> Bharat Sharma maintains 94/100 AAA+ Reliability Passport. ADBL loan uncollateralized.
                </>
              )}
            </span>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 shrink-0">
            {isCrisis ? 'FAULT: CARRIER (0% FARMER)' : 'VERDICT: PRIME EXPORT'}
          </span>
        </div>
      </div>

      {/* 4 Symbolic Live Representation Tiles (Reacting Dynamically to Simulation) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {/* Tile 1 */}
        <div className={`p-4 rounded-xl border transition duration-500 flex flex-col justify-between ${
          isCrisis 
            ? 'bg-rose-500/[0.04] border-rose-500/40' 
            : 'bg-white/[0.02] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-2">
            <span className={isCrisis ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
              {isCrisis ? 'CAN 2.0B HAZARD' : 'CAN 2.0B SAFE'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isCrisis ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          </div>
          <div className={`text-xl font-mono font-black ${isCrisis ? 'text-rose-400' : 'text-white'}`}>
            {isCrisis ? '28.4°C HEAT' : '4.8°C SAFE'}
          </div>
          <div className="text-[10px] text-zinc-400 truncate mt-1">BA 2 KHA 4812 • Prithvi Pass</div>
        </div>

        {/* Tile 2 */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-teal-400 mb-2">
            <span>PASSPORT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          </div>
          <div className="text-xl font-mono font-black text-white">94 / 100</div>
          <div className="text-[10px] text-zinc-400 truncate mt-1">Bharat Sharma • Score Protected</div>
        </div>

        {/* Tile 3 */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-2">
            <span>ESCROW FACILITY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div className="text-xl font-mono font-black text-white">Rs. 5,00,000</div>
          <div className="text-[10px] text-zinc-400 truncate mt-1">ADBL Microfinance • 0% Land</div>
        </div>

        {/* Tile 4 */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-2">
            <span>B2B QR SEAL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
          <div className="text-xl font-mono font-black text-white">20 Tons / Wk</div>
          <div className="text-[10px] text-zinc-400 truncate mt-1">Bhat-Bhateni &amp; Wai-Wai Off-Take</div>
        </div>
      </div>

      {/* 4-Step Interactive Visual Protocol Flow (Making the Concept Crystal Clear) */}
      <div className="mb-8 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-400" />
            How KrishiTrust Solves Agricultural Loss in Nepal:
          </span>
          <span className="text-[10px] font-mono text-zinc-500">CLICK ANY STAGE TO INSPECT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 relative">
          {protocolSteps.map((step, idx) => {
            const isSelected = activeStep === step.num;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                  isSelected 
                    ? 'bg-zinc-800 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-lg' 
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Connecting Laser Beam Animation */}
                {idx < 3 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-[2px] bg-zinc-800 z-10 overflow-hidden">
                    <div className="w-full h-full bg-emerald-400 animate-flow-line" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-1">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold font-mono text-zinc-300 flex items-center justify-center">
                    0{step.num}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    step.color === 'rose' 
                      ? 'bg-rose-500/20 text-rose-300' 
                      : step.color === 'amber' 
                      ? 'bg-amber-500/20 text-amber-300' 
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {step.tag}
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">{step.title}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 leading-snug">{step.subtitle}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Manual Sign-In Form (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Manual Sign-In</h2>
            <span className="text-[10px] font-mono text-zinc-500">SECURE LOGIN</span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-zinc-300 mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@krishitrust.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 mb-1 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter Console'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-zinc-500 text-[11px] border-t border-zinc-800/80">
            Federated credentials authenticated via Nepal Agri-FinTech Protocol.
          </div>
        </div>

        {/* Right: 9 Stakeholder Profiles (Instant 1-Click Access) (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Select Stakeholder Profile (Instant Access)</h2>
            <span className="text-[11px] font-mono text-zinc-500">1-CLICK LOGIN</span>
          </div>

          <div className="space-y-4">
            {/* Farmers Group */}
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Producer Cooperatives &amp; Farmers
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">3 PROFILES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {demoCredentials.filter(d => d.category === 'Farmer').map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickLogin(demo)}
                    className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60 hover:border-emerald-500/60 text-left transition hover:bg-zinc-800 group"
                  >
                    <div className="font-semibold text-white text-xs truncate group-hover:text-emerald-300 transition">
                      {demo.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{demo.tag}</div>
                    <div className="text-[9px] text-zinc-500 mt-1 font-mono">pwd: {demo.password}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transporters Group */}
            <div>
              <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Commercial Drivers &amp; Fleets
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">3 PROFILES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {demoCredentials.filter(d => d.category === 'Transporter').map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickLogin(demo)}
                    className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60 hover:border-blue-500/60 text-left transition hover:bg-zinc-800 group"
                  >
                    <div className="font-semibold text-white text-xs truncate group-hover:text-blue-300 transition">
                      {demo.name}
                    </div>
                    <div className="text-[10px] text-blue-400 font-mono mt-0.5">{demo.tag}</div>
                    <div className="text-[9px] text-zinc-500 mt-1 font-mono">pwd: {demo.password}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sponsors Group */}
            <div>
              <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Institutional Sponsors &amp; Banks
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">3 PROFILES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {demoCredentials.filter(d => d.category === 'Sponsor').map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickLogin(demo)}
                    className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60 hover:border-purple-500/60 text-left transition hover:bg-zinc-800 group"
                  >
                    <div className="font-semibold text-white text-xs truncate group-hover:text-purple-300 transition">
                      {demo.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-purple-400 font-mono mt-0.5">{demo.tag}</div>
                    <div className="text-[9px] text-zinc-500 mt-1 font-mono">pwd: {demo.password}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
