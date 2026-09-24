// src/pages/Dashboard.jsx
// Startup-Grade Operations & Farmer Accountability Dashboard
import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Cpu, 
  RefreshCw, 
  Scale, 
  Users, 
  Clock, 
  MapPin, 
  ChevronRight,
  DollarSign,
  HeartHandshake
} from 'lucide-react';
import { fetchMetrics, fetchShipments, fetchAlerts, getCurrentUser } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedAuditShipment, setSelectedAuditShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState('normal'); // 'normal' | 'crisis'

  const isCrisis = scenario === 'crisis';

  const outlet = useOutletContext();
  const activeUser = outlet?.activeAccount || getCurrentUser();
  const isFarmer = activeUser?.category === 'Farmer';
  const isTransporter = activeUser?.category === 'Transporter';
  const isSponsor = activeUser?.category === 'Sponsor';

  const loadData = async () => {
    try {
      const [m, s, a] = await Promise.all([
        fetchMetrics(),
        fetchShipments(),
        fetchAlerts()
      ]);
      if (m) setMetrics(m);
      if (s) setShipments(s);
      if (a) setAlerts(a);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Synchronizing with transit accountability network...</span>
        </div>
      </div>
    );
  }

  const m = metrics || {
    avgFleetHandlingScore: 84.2,
    transitLossReductionPercent: 68.4,
    estimatedProduceValueSavedNPR: 1845000,
    activeStakeholders: { registeredFarmers: 1840, commercialDrivers: 230, lendingBranches: 48 },
    disputeResolutionStats: { farmerProtectionRate: '94.1% (Farmer saved from unfair price slashing)' }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {isFarmer ? 'Producer Operations Console' : isTransporter ? 'Commercial Fleet Command' : isSponsor ? 'Agri-Credit Underwriting Console' : 'Federated Agri-Transit Network'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {activeUser ? `${activeUser.name}` : 'Agricultural Transit Accountability Console'}
          </h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{activeUser?.organization || 'KrishiTrust Network'}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">
              {isFarmer ? 'HARVEST PASSPORT NODE' : isTransporter ? 'CAN-BUS CARRIER NODE' : isSponsor ? 'INSTITUTIONAL ESCROW' : 'TRANSIT DECOUPLING PROTOCOL'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/map"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Highway Corridors
          </Link>

          <Link
            to="/can"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
          >
            <Cpu className="w-3.5 h-3.5" />
            Telemetry Engine
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics: Dynamically Tailored to Account Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isFarmer ? 'Your Transit Credit Score' : isTransporter ? 'Fleet Handling Score' : 'Farmer Credit Index'}
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {isFarmer ? '98.4%' : isTransporter ? '96.2%' : `${m.avgFleetHandlingScore} / 100`}
            </div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isFarmer ? 'Tier-A (Prime Collateral-Free)' : isTransporter ? 'Safe Handling Certified' : 'Tier-A (Uncollateralized Lending)'}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isFarmer ? 'Liability Decoupled' : isTransporter ? 'Reefer Temp Compliance' : 'Farmer Protection Rate'}
            </span>
            <Scale className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {isFarmer ? '100% Insulated' : isTransporter ? '98.8%' : '94.1%'}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isFarmer ? 'Zero middleman spoilage deduction' : isTransporter ? 'Maintained 4°C – 6°C across transit' : 'Loss attributed to haulers/road, not farmer'}
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isFarmer ? 'Active Harvest In Transit' : isTransporter ? 'Active Commercial Haul' : 'Monitored Cargo Fleets'}
            </span>
            <Truck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {isFarmer ? '3.2 Tons' : isTransporter ? 'BA 2 KHA 4812' : `${shipments.filter(s => s.status === 'In Transit').length || 3} Trucks`}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isFarmer ? 'Greenhouse Tomatoes en route to Kalimati' : isTransporter ? 'Chitwan → Kathmandu (Prithvi Highway)' : 'Chitwan, Pokhara & Dhading Corridors'}
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isFarmer ? 'Approved Loan Facility' : isTransporter ? 'Safe Route Bonus' : isSponsor ? 'Available Underwriting Pool' : 'Saved Farmer Capital'}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {isFarmer ? 'Rs. 5,00,000' : isTransporter ? 'Rs. 24,500' : isSponsor ? 'Rs. 50,00,000' : `NPR ${(m.estimatedProduceValueSavedNPR / 100000).toFixed(2)}L`}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isFarmer ? 'Pre-approved by Agricultural Dev Bank' : isTransporter ? 'Incentive earned for zero shock events' : isSponsor ? 'ADBL Microfinance Escrow' : 'Rescued from unfair wholesale discounts'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Highway Telemetry Simulation Switcher */}
      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-semibold">Live Highway Telemetry &amp; Fault Decoupling Simulation:</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
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

        <div className={`pt-2 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 ${
          isCrisis ? 'text-rose-300' : 'text-zinc-400'
        }`}>
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {isCrisis ? (
                <>
                  <strong className="text-rose-400">Incident at Mugling:</strong> Compressor power cut detected via ECU J1939. Farmer Bharat Sharma is 100% insulated from price slashing!
                </>
              ) : (
                <>
                  <strong className="text-emerald-400">Normal Transit:</strong> Continuous 4.8°C chilling maintained. Consignment verified for Tier-A uncollateralized credit.
                </>
              )}
            </span>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
            {isCrisis ? 'FARMER LIABILITY: 0% (INSULATED)' : 'FARMER PASSPORT: 98.4% SAFE'}
          </span>
        </div>
      </div>

      {/* Active Shipments & Transit Status */}
      <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Active Produce Shipments &amp; Transit Status</h2>
            <p className="text-xs text-zinc-400">Click any shipment to view sensor data, vehicle details, and transit records</p>
          </div>
          <span className="text-xs font-mono text-zinc-500">Live Highway Corridor Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3">Shipment &amp; Produce</th>
                <th className="pb-3">Farmer / Cooperative</th>
                <th className="pb-3">Driver &amp; Plate</th>
                <th className="pb-3">Transit Progress</th>
                <th className="pb-3">Handling Score</th>
                <th className="pb-3">Accountability Verdict</th>
                <th className="pb-3 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {shipments.map((s, idx) => {
                const isCrisisRow = isCrisis && idx === 0;
                const isMyCrop = isFarmer && s.farmerLead && activeUser?.name && s.farmerLead.includes(activeUser.name.split(' ')[0]);
                const isMyTruck = isTransporter && s.driverName && activeUser?.name && s.driverName.includes(activeUser.name.split(' ')[0]);
                
                return (
                  <tr key={s.id} className={`transition ${
                    isCrisisRow 
                      ? 'bg-rose-500/10 hover:bg-rose-500/15 border-l-2 border-rose-500' 
                      : isMyCrop 
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/15' 
                      : isMyTruck 
                      ? 'bg-blue-500/10 hover:bg-blue-500/15' 
                      : 'hover:bg-zinc-800/30'
                  }`}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{s.crop}</span>
                        {isMyCrop && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-zinc-950">
                            YOUR BATCH
                          </span>
                        )}
                        {isMyTruck && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500 text-zinc-950">
                            YOUR HAUL
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500">{s.id}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="text-zinc-200 font-medium">{s.farmerLead?.split(' ')[0]} {s.farmerLead?.split(' ')[1]}</div>
                      <div className="text-[11px] text-zinc-500 truncate max-w-[140px]">{s.cooperative}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="text-zinc-300">{s.driverName}</div>
                      <div className="font-mono text-[11px] text-zinc-500">{s.vehiclePlate}</div>
                    </td>
                  <td className="py-3.5">
                    <div className="w-28 bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-1">
                      <div 
                        className={`h-full rounded-full ${s.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${s.progressPercent || 60}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-zinc-500">{s.currentLocation?.name}</div>
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                      isCrisisRow
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : s.handlingScore >= 80 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : s.handlingScore >= 70
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {isCrisisRow ? '58/100 CRISIS' : `${s.handlingScore}/100`}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className={`text-[11px] font-medium truncate max-w-[220px] ${
                      isCrisisRow ? 'text-rose-300 font-bold' : 'text-emerald-400'
                    }`}>
                      {isCrisisRow 
                        ? '100% FARMER LOSS WAIVED • CARRIER FAULT' 
                        : (s.accountabilityAudit?.verdict || 'Farmer Credit Intact')}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {isCrisisRow 
                        ? 'Shikhar Policy Reimburses Wholesale Mandi' 
                        : s.loanImpact}
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedAuditShipment(s)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-medium transition"
                    >
                      Audit <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipment Audit Modal / Drawer */}
      {selectedAuditShipment && (
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Verified Transit Record &amp; Handling Status
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {selectedAuditShipment.crop} • Batch {selectedAuditShipment.batchCode}
              </h3>
            </div>
            <button
              onClick={() => setSelectedAuditShipment(null)}
              className="text-zinc-500 hover:text-white text-xs px-2 py-1 rounded bg-zinc-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Farmer Liability Audit */}
            <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <div className="text-zinc-500 text-[11px] uppercase tracking-wider font-semibold mb-1">
                1. Farmer Packaging Compliance
              </div>
              <div className="text-emerald-400 font-semibold text-sm">
                {selectedAuditShipment.accountabilityAudit?.farmerPackagingCompliance}
              </div>
              <p className="text-zinc-400 text-[11px] mt-2 leading-relaxed">
                Farmer {selectedAuditShipment.farmerLead} harvested and cured produce under certified standards.
              </p>
            </div>

            {/* Transporter Telemetry Audit */}
            <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800">
              <div className="text-zinc-500 text-[11px] uppercase tracking-wider font-semibold mb-1">
                2. Transporter &amp; Road Behavior
              </div>
              <div className="text-blue-400 font-semibold text-sm">
                {selectedAuditShipment.accountabilityAudit?.driverFaultScore}
              </div>
              <p className="text-zinc-400 text-[11px] mt-2 leading-relaxed">
                Vehicle {selectedAuditShipment.vehiclePlate} driven by {selectedAuditShipment.driverName}. Speed: {selectedAuditShipment.telemetry?.vehicleSpeed} km/h, Shock: {selectedAuditShipment.telemetry?.chassisVibrationG}G.
              </p>
            </div>

            {/* Bank Loan Verdict */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-emerald-400 text-[11px] uppercase tracking-wider font-semibold mb-1">
                3. Credit &amp; Insurance Settlement
              </div>
              <div className="text-white font-semibold text-sm">
                {selectedAuditShipment.accountabilityAudit?.verdict}
              </div>
              <p className="text-zinc-300 text-[11px] mt-2 leading-relaxed">
                {selectedAuditShipment.loanImpact}. Farmer loan eligibility is preserved with 0 penalty.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Operational Alerts & Microfinance Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Highway Alerts */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Verified Highway Transit Alerts</h3>
            <Link to="/alerts" className="text-xs text-zinc-400 hover:text-white">View All</Link>
          </div>
          <div className="space-y-2.5">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{a.type}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{a.shipmentId}</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">{a.message}</p>
                <div className="mt-1 text-[10px] text-emerald-400 font-medium">
                  {a.actionTaken}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banking Partner Callout */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Institutional Financing Network
            </span>
            <h3 className="text-sm font-semibold text-white mt-1">
              Active Lending with Agricultural Development Bank (ADBL)
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              KrishiTrust gives credit managers real-time certainty that smallholder produce reached mandis safely without spoilage disputes. Cooperatives in Chitwan, Kaski, and Dhading have unlocked over NPR 1.6 Crore in seasonal microfinance loans with zero land collateral.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Simulate Loan Underwriting</span>
            <Link
              to="/stakeholders"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Open Stakeholder Simulation <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;