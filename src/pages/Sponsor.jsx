// src/pages/Sponsor.jsx
// Sponsoring & Micro-Loan Marketplace for Verified Farmers
import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Users, 
  ArrowRight,
  TrendingUp,
  X,
  Building2,
  LogIn
} from 'lucide-react';
import { fetchAccounts, sponsorFarmer, getCurrentUser } from '../services/api';

const Sponsor = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sponsorAmount, setSponsorAmount] = useState('50000');
  const [sponsorMessage, setSponsorMessage] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [successNotice, setSuccessNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const outletContext = useOutletContext();
  const effectiveUser = outletContext?.activeAccount || currentUser;
  const isSponsor = effectiveUser?.category === 'Sponsor';
  const isFarmer = effectiveUser?.category === 'Farmer';
  const isTransporter = effectiveUser?.category === 'Transporter';

  const loadFarmers = async () => {
    const accs = await fetchAccounts('Farmer');
    if (accs) setFarmers(accs);
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  useEffect(() => {
    if (isSponsor && effectiveUser) {
      setSponsorName(effectiveUser.name);
    } else {
      setSponsorName('');
    }
  }, [effectiveUser, isSponsor]);

  const handleOpenSponsorModal = (farmer) => {
    if (!isSponsor) return;
    setSelectedFarmer(farmer);
    setSuccessNotice(null);
    setSponsorMessage(`Proud to sponsor your ${farmer.produceTypes[0]} harvest!`);
  };

  const handleConfirmSponsor = async (e) => {
    e.preventDefault();
    if (!isSponsor || !selectedFarmer || !sponsorAmount) return;
    setSubmitting(true);

    const res = await sponsorFarmer({
      farmerId: selectedFarmer.id,
      sponsorName: sponsorName || effectiveUser?.name || 'Verified Institutional Sponsor',
      amountNPR: Number(sponsorAmount),
      sponsorMessage
    });

    if (res && res.success) {
      setSuccessNotice(`Successfully funded Rs. ${Number(sponsorAmount).toLocaleString('en-IN')} to ${selectedFarmer.name}!`);
      await loadFarmers();
      setTimeout(() => {
        setSelectedFarmer(null);
        setSuccessNotice(null);
      }, 2500);
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
            <HeartHandshake className="w-3 h-3" />
            DIRECT SPONSORSHIP &amp; MICRO-LENDING
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Verified Farmer Directory
          </h1>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              TELEMETRY-VERIFIED PASSPORTS
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              0% LAND COLLATERAL
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              ADBL ESCROW ESCORT
            </span>
          </div>
        </div>

        {/* Current Active Sponsor Bar - strictly conditioned on role */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          {isSponsor ? (
            <>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-zinc-400">
                  Active Sponsor Entity:{' '}
                  <span className="text-white font-semibold">
                    {effectiveUser?.name}
                  </span>
                  <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Institutional Sponsor
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Available Sponsorship Capital: Rs. 50,00,000</span>
              </div>
            </>
          ) : isFarmer ? (
            <>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-zinc-300">
                  Farmer Perspective:{' '}
                  <span className="text-white font-semibold">{effectiveUser?.name}</span>
                  <span className="text-zinc-500 ml-1">({effectiveUser?.organization})</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Harvest Campaign Showcase (Funding by Verified Sponsors &amp; Banks Only)</span>
              </div>
            </>
          ) : isTransporter ? (
            <>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-zinc-300">
                  Transporter Perspective:{' '}
                  <span className="text-white font-semibold">{effectiveUser?.name}</span>
                  <span className="text-zinc-500 ml-1">({effectiveUser?.organization})</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Cold-Chain Transit Operations (No Sponsoring Authority)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">
                  Open Campaign Registry • <span className="text-zinc-200">Only verified lenders can commit capital</span>
                </span>
              </div>

              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition"
              >
                <span>Sign In as Sponsor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Farmers Cards Marketplace */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Farmers Seeking Sponsorship &amp; Loans</h2>
            <p className="text-xs text-zinc-400">Verified by KrishiTrust farmgate-to-mandi tracking</p>
          </div>
          <span className="text-xs text-zinc-400 font-mono">3 Active Campaigns</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {farmers.map((f) => {
            const camp = f.sponsorshipCampaign;
            const progress = camp ? Math.min(Math.round((camp.raisedAmountNPR / camp.goalAmountNPR) * 100), 100) : 70;
            const isFullyFunded = progress >= 100;

            return (
              <div 
                key={f.id}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition overflow-hidden flex flex-col justify-between shadow-lg group"
              >
                <div>
                  {/* Farm Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-800">
                    <img 
                      src={f.farmImage} 
                      alt={f.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    {/* Reliability Badge */}
                    <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400 flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {f.reliabilityScore}% Safe Transit
                    </div>

                    {/* District */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {f.district}
                    </div>
                  </div>

                  {/* Farmer Details */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={f.avatar} 
                        alt={f.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40"
                      />
                      <div>
                        <h3 className="text-base font-bold text-white">{f.name}</h3>
                        <p className="text-xs text-zinc-400">{f.organization}</p>
                      </div>
                    </div>

                    {/* Campaign Title & Need */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-emerald-400">
                        {camp?.title}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                        {camp?.neededFor}
                      </p>
                    </div>

                    {/* Funding Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white font-semibold">
                          Rs. {camp?.raisedAmountNPR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-zinc-500">
                          Goal: Rs. {camp?.goalAmountNPR.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isFullyFunded ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-zinc-400 pt-0.5">
                        <span>{progress}% Funded</span>
                        <span>{camp?.sponsorsCount} Sponsors</span>
                      </div>
                    </div>

                    {/* Produce Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {f.produceTypes.map((crop, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Area: strictly role-based */}
                <div className="p-5 pt-0">
                  {isSponsor ? (
                    <button
                      onClick={() => handleOpenSponsorModal(f)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      {isFullyFunded ? 'Add Additional Sponsorship' : `Sponsor ${f.name.split(' ')[0]}`}
                    </button>
                  ) : isFarmer ? (
                    f.id === effectiveUser?.id || f.name === effectiveUser?.name ? (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Your Active Campaign ({progress}% Funded)</span>
                      </div>
                    ) : (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-zinc-400 text-xs font-medium text-center flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Peer Farmer Campaign (Sponsors Only)</span>
                      </div>
                    )
                  ) : isTransporter ? (
                    <div className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-zinc-400 text-xs font-medium text-center flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Transit Route Partner (Sponsors Only)</span>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium text-center transition flex items-center justify-center gap-1.5 border border-zinc-700/60"
                    >
                      <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sign In as Sponsor to Fund</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsoring Modal */}
      {selectedFarmer && isSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedFarmer(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Confirm Sponsorship &amp; Loan Funding
              </span>
              <h2 className="text-xl font-bold text-white">
                Sponsor {selectedFarmer.name}
              </h2>
              <p className="text-xs text-zinc-400">
                {selectedFarmer.organization} • {selectedFarmer.district}
              </p>
            </div>

            {successNotice ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Sponsorship Successful!</h3>
                <p className="text-xs text-zinc-300">{successNotice}</p>
                <span className="text-[11px] text-zinc-400 block pt-1">
                  Notification dispatched to farmer and logged into loan ledger.
                </span>
              </div>
            ) : (
              <form onSubmit={handleConfirmSponsor} className="space-y-4 text-xs">
                {/* Sponsor Identity */}
                <div>
                  <label className="block text-zinc-300 mb-1 font-medium">Sponsor Name / Organization</label>
                  <input
                    type="text"
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    required
                    placeholder="e.g. Agricultural Development Bank (ADBL)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-zinc-300 mb-1 font-medium">Sponsorship Amount (NPR)</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {['25000', '50000', '100000'].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setSponsorAmount(amt)}
                        className={`py-2 rounded-lg border font-mono text-xs transition ${
                          sponsorAmount === amt
                            ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                        }`}
                      >
                        Rs. {Number(amt).toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={sponsorAmount}
                    onChange={(e) => setSponsorAmount(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-mono focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-zinc-300 mb-1 font-medium">Sponsor Note to Farmer</label>
                  <textarea
                    rows={3}
                    value={sponsorMessage}
                    onChange={(e) => setSponsorMessage(e.target.value)}
                    placeholder="e.g. We are proud to back your greenhouse expansion!"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 disabled:opacity-50"
                  >
                    {submitting ? 'Transferring Funds...' : `Confirm Sponsorship: Rs. ${Number(sponsorAmount || 0).toLocaleString('en-IN')}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsor;
