// src/pages/Analytical.jsx
// Agricultural Value & Credit Intelligence
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Scale, 
  ArrowUpRight 
} from 'lucide-react';
import { fetchMetrics } from '../services/api';

const Analytical = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchMetrics().then(setMetrics);
  }, []);

  const m = metrics || {
    avgFleetHandlingScore: 84.2,
    transitLossReductionPercent: 68.4,
    estimatedProduceValueSavedNPR: 1845000,
    participatingCooperatives: 26
  };

  const underwritingCriteria = [
    {
      metric: 'Safe Handling Score',
      benchmark: '≥ 80 / 100',
      current: `${m.avgFleetHandlingScore} / 100`,
      status: 'Qualified (Tier-A)',
      impact: 'Qualifies farmer for collateral-free crop credit up to NPR 7.5 Lakhs'
    },
    {
      metric: 'Highway Spoilage Loss Rate',
      benchmark: '< 3.5%',
      current: '1.8% average',
      status: 'Qualified (Prime)',
      impact: 'Eligible for 40% insurance discount with Shikhar Insurance'
    },
    {
      metric: 'Route & Temperature Monitoring',
      benchmark: '≥ 95% route uptime',
      current: '99.9% uptime',
      status: 'Verified',
      impact: 'Instant claim payout if cooling fails on mountain roads'
    },
    {
      metric: 'Market Delivery Reliability',
      benchmark: '≥ 90% on-time at Kalimati/Balkhu',
      current: '94.2%',
      status: 'Qualified',
      impact: 'Direct advance purchasing contracts with Kathmandu supermarkets'
    }
  ];

  const corridorPerformance = [
    {
      corridor: 'Chitwan → Kathmandu (Central)',
      produce: 'Tomatoes & Bananas',
      avgScore: 88,
      transitLoss: '1.8%',
      riskFactor: 'Mugling - Kurintar Road Vibrations'
    },
    {
      corridor: 'Dhading → Kathmandu (Mountain)',
      produce: 'Red Potatoes & Ginger',
      avgScore: 94,
      transitLoss: '0.9%',
      riskFactor: 'Negligible (Short Haul)'
    },
    {
      corridor: 'Pokhara → Kathmandu (Western)',
      produce: 'Cauliflower & Greens',
      avgScore: 82,
      transitLoss: '2.4%',
      riskFactor: 'Dumre Paving Vibrations'
    },
    {
      corridor: 'Birgunj → Kathmandu (Terai)',
      produce: 'Mangoes & Pulses',
      avgScore: 69,
      transitLoss: '4.8%',
      riskFactor: 'Refrigeration warming on mountain climb'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Handling Intelligence</h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>UNDERWRITING &amp; LOSS INDEX</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">TIER-A BENCHMARKS</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>RATING ENGINE: ACTIVE</span>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider block">Average Integrity Index</span>
          <div className="text-3xl font-semibold font-mono text-white mt-2">
            {m.avgFleetHandlingScore}
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">Tier-A Credit Rating</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider block">Spoilage Loss Reduction</span>
          <div className="text-3xl font-semibold font-mono text-white mt-2">
            {m.transitLossReductionPercent}%
          </div>
          <span className="text-xs text-zinc-400 mt-1 block">Over unmonitored highway cargo</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider block">Cooperatives Onboarded</span>
          <div className="text-3xl font-semibold font-mono text-white mt-2">
            {m.participatingCooperatives}
          </div>
          <span className="text-xs text-zinc-400 mt-1 block">Across Bagmati, Gandaki &amp; Madhesh</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider block">Protected Harvest Value</span>
          <div className="text-3xl font-semibold font-mono text-white mt-2">
            NPR {(m.estimatedProduceValueSavedNPR / 100000).toFixed(1)}L
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">Capital preserved for farmers</span>
        </div>
      </div>

      {/* Underwriting Model Table */}
      <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-white">Bank &amp; Sponsor Loan Eligibility</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Qualification standards for micro-loans with Agricultural Development Bank (ADBL) and partner funds
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3">Transit Quality Check</th>
                <th className="pb-3">Target Standard</th>
                <th className="pb-3">Actual Result</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Benefit for Farmer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {underwritingCriteria.map((c, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3.5 font-medium text-white">{c.metric}</td>
                  <td className="py-3.5 font-mono text-zinc-400">{c.benchmark}</td>
                  <td className="py-3.5 font-mono text-emerald-400 font-semibold">{c.current}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-zinc-300">{c.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corridor Comparative Table */}
      <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-white">Corridor Integrity &amp; Spoilage Breakdown</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Aggregated transit data across monitored Nepalese supply lines
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3">Transit Corridor</th>
                <th className="pb-3">Dominant Produce</th>
                <th className="pb-3">Handling Score</th>
                <th className="pb-3">Transit Loss Rate</th>
                <th className="pb-3">Primary Risk Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {corridorPerformance.map((item, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3 text-white font-medium">{item.corridor}</td>
                  <td className="py-3 text-zinc-400">{item.produce}</td>
                  <td className="py-3 font-mono font-semibold text-emerald-400">{item.avgScore}/100</td>
                  <td className="py-3 font-mono text-zinc-300">{item.transitLoss}</td>
                  <td className="py-3 text-zinc-400">{item.riskFactor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytical;