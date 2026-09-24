// src/components/Layout.jsx
// Minimalist, Startup-Grade Navigation Layout for KrishiTrust
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Bell, 
  Cpu, 
  FileText, 
  Settings,
  Users,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  HeartHandshake,
  LogIn
} from "lucide-react";
import { fetchHealth, fetchAccounts, getCurrentUser, logoutUser } from "../services/api";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gatewayOnline, setGatewayOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();
    setLoggedInUser(user);
    if (user) {
      setActiveAccount(user);
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchHealth().then(res => {
      if (res && res.canGateway && res.canGateway.status === 'ONLINE') {
        setGatewayOnline(true);
      }
    });

    fetchAccounts().then(accs => {
      if (accs && accs.length > 0) {
        setAccounts(accs);
        const stored = getCurrentUser();
        setActiveAccount(stored || accs[0]);
      }
    });
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...((!activeAccount || activeAccount.category === 'Sponsor') ? [{ path: '/sponsor', label: 'Sponsor a Farmer', icon: HeartHandshake }] : []),
    { path: '/stakeholders', label: 'Ecosystem & Accounts', icon: Users },
    { path: '/map', label: 'Transit Corridors', icon: Map },
    { path: '/analysis', label: 'Handling Intelligence', icon: TrendingUp },
    { path: '/can', label: 'Telemetry Engine', icon: Cpu },
    { path: '/alerts', label: 'Active Alerts', icon: Bell },
    { path: '/reports', label: 'Audit & Finance', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectAccount = (acc) => {
    setActiveAccount(acc);
    setLoggedInUser(acc);
    localStorage.setItem('krishitrust_user', JSON.stringify(acc));
    setIsAccountDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row antialiased">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-zinc-900/90 border-r border-zinc-800/80 p-5 fixed h-full z-30 justify-between">
        <div>
          {/* Brand Header */}
          <Link to="/" className="flex items-center gap-3 px-2 py-1 mb-8 hover:opacity-90 transition">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tracking-tight text-base">KrishiTrust</span>
              </div>
              <p className="text-[11px] text-zinc-500">Fair Transit &amp; Credit Protocol</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold border border-zinc-700/60'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Status Footer */}
        <div className="pt-4 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs px-2 py-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${gatewayOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
              <span className="text-zinc-400 text-[11px]">Telemetry Engine</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">{currentTime || 'NPT'}</span>
          </div>
          <div className="px-2 mt-1 text-[10px] text-zinc-600">
            Decoupling Farmer Liability
          </div>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-semibold text-white tracking-tight">KrishiTrust</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-zinc-900 border-b border-zinc-800 p-4 space-y-1 z-30 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar with Enterprise Account Switcher */}
        <div className="hidden sm:flex items-center justify-between px-8 py-3.5 bg-zinc-950 border-b border-zinc-800/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-zinc-500 font-medium">Organization:</span>
            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-semibold flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {activeAccount ? activeAccount.organization : 'KrishiTrust Federated Network'}
            </span>
            {activeAccount && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-mono border border-zinc-700/60">
                {activeAccount.category === 'Sponsor' ? 'Institutional Partner' : activeAccount.category === 'Transporter' ? 'Fleet Carrier' : 'Producer Cooperative'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {loggedInUser ? (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
                  {loggedInUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-white leading-tight">{loggedInUser.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-zinc-400 leading-tight">{loggedInUser.category}</div>
                </div>
                <button 
                  onClick={() => { logoutUser(); setLoggedInUser(null); }}
                  className="text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            {/* Enterprise Account Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition"
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Enterprise Accounts &amp; Profiles
                </div>
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectAccount(acc)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition ${
                      activeAccount?.id === acc.id
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-6 h-6 rounded-md object-cover border border-zinc-700"
                    />
                    <div className="flex-1 truncate">
                      <div className="text-white truncate">{acc.name}</div>
                      <div className="text-[10px] text-zinc-500">{acc.category} • {acc.organization.split(' ')[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

        <main className="p-5 md:p-8 flex-1 bg-zinc-950 overflow-x-hidden">
          <Outlet context={{ activeAccount, loggedInUser }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;