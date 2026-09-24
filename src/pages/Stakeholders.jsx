// src/pages/Stakeholders.jsx
// Multi-Stakeholder Simulation & Accountability Portal (Farmers, Drivers, Institutions)
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Truck, 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  RefreshCw,
  Scale,
  DollarSign,
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { fetchAccounts, fetchCommunications, sendCommunication } from '../services/api';

const Stakeholders = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [communications, setCommunications] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('Agricultural Development Bank (ADBL)');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [accs, comms] = await Promise.all([
        fetchAccounts(),
        fetchCommunications()
      ]);
      setAccounts(accs || []);
      setCommunications(comms || []);
      if (accs && accs.length > 0 && !selectedAccount) {
        setSelectedAccount(accs[0]);
      }
    } catch (err) {
      console.error('Error loading stakeholder data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update default recipient when selected account changes
  useEffect(() => {
    if (!selectedAccount) return;
    if (selectedAccount.category === 'Farmer') {
      setSelectedRecipient('Agricultural Development Bank (ADBL)');
    } else if (selectedAccount.category === 'Transporter') {
      setSelectedRecipient('Bharat Sharma (Chitwan Farmer)');
    } else {
      setSelectedRecipient('Bharat Sharma (Chitwan Farmer)');
    }
  }, [selectedAccount]);

  const triggerCounterpartyResponse = (toRecipient, originalMsg, fromSender) => {
    let replySender = toRecipient;
    let replyMsg = '';
    let replyType = 'Audit-Logged Acknowledgment';

    if (toRecipient.includes('ADBL') || toRecipient.includes('Bank')) {
      replySender = 'Agricultural Development Bank (ADBL)';
      replyMsg = `Underwriting review for ${fromSender.split(' ')[0]}: Telemetry verified (94/100 Passport, 0% shock). Micro-loan facility of NPR 5,00,000 approved into smart escrow.`;
      replyType = 'Loan Facility Approval';
    } else if (toRecipient.includes('Ramesh') || toRecipient.includes('Transporter') || toRecipient.includes('Driver')) {
      replySender = 'Ramesh Shrestha (Fleet Captain)';
      replyMsg = `Reefer unit BA 2 KHA 4812 confirmed at 4.6°C. Route set via Mugling. On schedule for pickup.`;
      replyType = 'Fleet Route Status';
    } else if (toRecipient.includes('Shikhar')) {
      replySender = 'Shikhar Agricultural Insurance';
      replyMsg = `Cold-chain transit insurance active for consignment. Spoilage risk 100% decoupled from farmer.`;
      replyType = 'Transit Insurance Verified';
    } else if (toRecipient.includes('Bharat') || toRecipient.includes('Farmer')) {
      replySender = 'Bharat Sharma (Farmer)';
      replyMsg = `Acknowledged! Crates loaded with QR harvest tags attached. Ready for transit.`;
      replyType = 'Consignment Ready';
    } else {
      replySender = 'KrishiTrust Protocol Gateway';
      replyMsg = `Consensus verified across J1939 ECU telemetry stream and smart escrow contracts.`;
      replyType = 'Network Consensus';
    }

    setTimeout(async () => {
      await sendCommunication({
        sender: replySender,
        recipient: fromSender,
        message: replyMsg,
        shipmentId: 'FLEET-NODE',
        type: replyType
      });
      await loadData();
    }, 1200);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMsg.trim() || !selectedAccount) return;
    setSending(true);

    const fromSender = `${selectedAccount.name} (${selectedAccount.category})`;
    const targetRecipient = selectedRecipient;
    const messageToSend = newMsg.trim();

    await sendCommunication({
      sender: fromSender,
      recipient: targetRecipient,
      message: messageToSend,
      shipmentId: selectedAccount.activeShipmentId || 'FLEET',
      type: 'Direct Stakeholder Coordination'
    });

    setNewMsg('');
    await loadData();
    setSending(false);

    // Trigger simulated counterparty reply
    triggerCounterpartyResponse(targetRecipient, messageToSend, fromSender);
  };

  const handleQuickAction = async (msgText, target, actionType) => {
    if (!selectedAccount) return;
    setSending(true);

    const fromSender = `${selectedAccount.name} (${selectedAccount.category})`;

    await sendCommunication({
      sender: fromSender,
      recipient: target,
      message: msgText,
      shipmentId: selectedAccount.activeShipmentId || 'FLEET',
      type: actionType
    });

    await loadData();
    setSending(false);

    // Trigger simulated counterparty reply
    triggerCounterpartyResponse(target, msgText, fromSender);
  };

  const filteredAccounts = accounts.filter(a => {
    if (categoryFilter === 'all') return true;
    return a.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Synchronizing 9 stakeholder nodes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Stakeholder Ecosystem
          </h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>9 VERIFIED NODES</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">REAL-TIME MULTI-PARTY PROTOCOL</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          {['all', 'farmer', 'transporter', 'financial institution'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                categoryFilter === cat
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/80'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All 9 Nodes' : cat === 'financial institution' ? 'Sponsors & Banks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 9 Stakeholder Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filteredAccounts.map((acc) => {
          const isSelected = selectedAccount?.id === acc.id;
          const isFarmer = acc.category === 'Farmer';
          const isDriver = acc.category === 'Transporter';
          return (
            <div
              key={acc.id}
              onClick={() => setSelectedAccount(acc)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-zinc-800/90 border-emerald-500/60 ring-1 ring-emerald-500/30 shadow-lg'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-10 h-10 rounded-lg object-cover border border-zinc-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-white truncate">{acc.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium shrink-0 ${
                      isFarmer 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : isDriver 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {acc.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">{acc.organization}</div>
                  <div className="text-[9px] text-zinc-500 font-mono mt-1">
                    {acc.kisanId || acc.vehiclePlate || acc.district}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Account Role Simulation Console */}
      {selectedAccount && (
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedAccount.avatar}
                alt={selectedAccount.name}
                className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20 mb-1">
                  ACTIVE NODE PERSPECTIVE
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">{selectedAccount.name}</h2>
                <div className="text-xs text-zinc-400">
                  {selectedAccount.role} • <span className="text-zinc-300">{selectedAccount.organization}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              {selectedAccount.creditProfile && (
                <div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {selectedAccount.creditProfile.trustScore}/100
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">RELIABILITY PASSPORT</div>
                </div>
              )}
              {selectedAccount.fleetMetrics && (
                <div>
                  <div className="text-2xl font-bold font-mono text-blue-400">
                    {selectedAccount.fleetMetrics.driverScore}/100
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">SAFETY &amp; HANDLING SCORE</div>
                </div>
              )}
              {selectedAccount.institutionalProfile && (
                <div>
                  <div className="text-2xl font-bold font-mono text-purple-400">
                    NPR {selectedAccount.institutionalProfile.activeAgriPortfolioNPR || selectedAccount.institutionalProfile.totalCargoInsuredNPR || '120 MT'}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">FACILITY VOLUME</div>
                </div>
              )}
            </div>
          </div>

          {/* Account Details & Accountability Mechanism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card: Core Operational Data */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                {selectedAccount.category === 'Farmer' ? 'Crop & Facility Profile' :
                 selectedAccount.category === 'Transporter' ? 'Vehicle Telemetry' :
                 'Underwriting Policy'}
              </h3>

              {selectedAccount.creditProfile && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Rating:</span>
                    <span className="text-emerald-400 font-semibold">{selectedAccount.creditProfile.rating}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Microfinance Facility:</span>
                    <span className="text-white font-mono font-medium">
                      NPR {selectedAccount.creditProfile.approvedCreditNPR?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Underwriter:</span>
                    <span className="text-zinc-200">{selectedAccount.creditProfile.activeLender}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Purpose:</span>
                    <span className="text-zinc-300 text-right">{selectedAccount.creditProfile.loanPurpose}</span>
                  </div>
                </div>
              )}

              {selectedAccount.fleetMetrics && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Vehicle:</span>
                    <span className="text-white font-mono font-bold">{selectedAccount.vehiclePlate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Reefer Compliance:</span>
                    <span className="text-emerald-400 font-mono">{selectedAccount.fleetMetrics.cargoTemperatureCompliance}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-400">Shock Events:</span>
                    <span className="text-zinc-200">{selectedAccount.fleetMetrics.harshBrakeEvents}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Status:</span>
                    <span className="text-emerald-400">{selectedAccount.fleetMetrics.vehicleStatus}</span>
                  </div>
                </div>
              )}

              {selectedAccount.institutionalProfile && (
                <div className="space-y-2 text-xs">
                  <div className="text-zinc-300 italic">
                    "{selectedAccount.mandate}"
                  </div>
                  <div className="pt-2 border-t border-zinc-800 text-zinc-400 flex justify-between">
                    <span>Policy:</span>
                    <span className="text-emerald-400 font-medium">{selectedAccount.institutionalProfile.decisionStatus}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Card: Fair Accountability & Liability Shield */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                <Scale className="w-3.5 h-3.5" />
                Dispute Resolution Verdict
              </div>

              {selectedAccount.accountabilityStatus && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                    <div className="font-semibold text-[11px] mb-0.5">Farmer Protection:</div>
                    <div className="text-[11px] text-zinc-300">
                      {selectedAccount.accountabilityStatus.clearedTransitLosses}
                    </div>
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    {selectedAccount.accountabilityStatus.note}
                  </div>
                </div>
              )}

              {selectedAccount.accountabilityLog && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200">
                    <div className="font-semibold text-[11px] mb-0.5">Transporter Audit Record:</div>
                    <div className="text-[11px] text-zinc-300">
                      {selectedAccount.accountabilityLog.disputeSettlement}
                    </div>
                  </div>
                  <div className="text-zinc-500 text-[10px]">
                    Telemetry attributes road conditions vs driver handling.
                  </div>
                </div>
              )}

              {selectedAccount.institutionalProfile && (
                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs">
                  <div className="font-semibold text-[11px] mb-0.5">Dispute Reduction:</div>
                  <div className="text-[11px] text-zinc-300">
                    {selectedAccount.institutionalProfile.mandiDisputeReduction || 'Objective fault attribution decouples farmer liability.'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Direct Communication & Real Two-Way Coordination */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Live Multi-Stakeholder Coordination &amp; Approvals
                </h3>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  Real-time two-way dialogue between Farmers, Haulers, and Lending Institutions
                </div>
              </div>

              {/* Recipient Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 text-[11px]">Direct To:</span>
                <select
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="Agricultural Development Bank (ADBL)">ADBL Bank (Loan Underwriting)</option>
                  <option value="Ramesh Shrestha (Fleet Captain)">Ramesh Shrestha (Truck BA 2 KHA 4812)</option>
                  <option value="Bharat Sharma (Chitwan Farmer)">Bharat Sharma (Chitwan Polyhouse)</option>
                  <option value="Shikhar Agricultural Insurance">Shikhar Insurance (Claims)</option>
                  <option value="All Monitored Parties">All Monitored Parties (Broadcast)</option>
                </select>
              </div>
            </div>

            {/* Quick 1-Click Action Pills (Tailored to Selected Node) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">QUICK DISPATCH:</span>
              {selectedAccount.category === 'Farmer' && (
                <>
                  <button
                    onClick={() => handleQuickAction(
                      `Submitted micro-loan request for NPR 5,00,000 for polyhouse inputs. Verified with 94/100 Reliability Passport.`,
                      'Agricultural Development Bank (ADBL)',
                      'Micro-Loan Request'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>💸</span> Request NPR 5L Loan from ADBL
                  </button>
                  <button
                    onClick={() => handleQuickAction(
                      `Harvest batch ready (3.2 MT tomatoes). Requesting chilled pickup BA 2 KHA 4812.`,
                      'Ramesh Shrestha (Fleet Captain)',
                      'Transit Dispatch'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>🚚</span> Request Reefer Pickup from Ramesh
                  </button>
                  <button
                    onClick={() => handleQuickAction(
                      `Registering batch KT-94 transit certificate for insurance coverage.`,
                      'Shikhar Agricultural Insurance',
                      'Insurance Policy'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>🛡️</span> Request Shikhar Insurance Cover
                  </button>
                </>
              )}

              {selectedAccount.category === 'Transporter' && (
                <>
                  <button
                    onClick={() => handleQuickAction(
                      `Prithvi Highway transit update: Reefer temperature holding at 4.8°C SAFE. Normal road vibration.`,
                      'All Monitored Parties',
                      'Cold-Chain Telemetry'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>❄️</span> Broadcast 4.8°C Reefer Status
                  </button>
                  <button
                    onClick={() => handleQuickAction(
                      `Approaching Kalimati Wholesale Mandi. Cargo seal intact, ETA 25 minutes.`,
                      'Bharat Sharma (Chitwan Farmer)',
                      'Delivery ETA'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>📍</span> Send Arrival ETA to Farmer
                  </button>
                </>
              )}

              {selectedAccount.category === 'Sponsor' && (
                <>
                  <button
                    onClick={() => handleQuickAction(
                      `Official Approval: Micro-loan facility of NPR 5,00,000 disbursed at 0% land collateral into escrow.`,
                      'Bharat Sharma (Chitwan Farmer)',
                      'Loan Disbursal'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>💰</span> Disburse NPR 5L Escrow to Bharat
                  </button>
                  <button
                    onClick={() => handleQuickAction(
                      `Transit insurance coverage validated. Farmer insulated from mountain road delays.`,
                      'Bharat Sharma (Chitwan Farmer)',
                      'Liability Decoupled'
                    )}
                    disabled={sending}
                    className="px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[11px] font-medium transition flex items-center gap-1"
                  >
                    <span>🛡️</span> Issue Farmer Liability Shield
                  </button>
                </>
              )}
            </div>

            {/* Live Message Feed */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {communications.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{c.sender}</span>
                      <span className="text-zinc-600">➔</span>
                      <span className="text-[10px] text-zinc-400 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {c.recipient}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed pl-1">{c.message}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                    <span className="font-mono text-zinc-600">ID: {c.id}</span>
                    <span className="text-emerald-400 font-mono font-medium">{c.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Message Dispatch Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder={`Dispatch message to ${selectedRecipient}...`}
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={sending || !newMsg.trim()}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {sending ? 'Sending...' : 'Dispatch'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stakeholders;
