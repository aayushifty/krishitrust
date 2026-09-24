// src/pages/Reports.jsx
// Audit & Finance Verification Reports for KrishiTrust
import React, { useState, useEffect } from 'react';
import { FileText, Download, CheckCircle2, Building2, RefreshCw, ShieldCheck } from 'lucide-react';
import { fetchReports } from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports().then((data) => {
      if (data && data.length > 0) {
        setReports(data);
        setSelectedReport(data[0]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Loading verified transit certificates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Audit &amp; Finance</h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CRYPTOGRAPHIC ESCROW AUDITS</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">TAMPER-PROOF CERTIFICATES</span>
          </div>
        </div>

        <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
          AUDITED BY: KRISHITRUST
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Navigation (1 Col) */}
        <div className="space-y-3">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block px-1">
            Generated Underwriting Audits
          </span>

          {reports.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReport(r)}
              className={`w-full p-4 rounded-xl text-left transition border ${
                selectedReport?.id === r.id
                  ? 'bg-zinc-800 border-zinc-700 text-white shadow-sm'
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">{r.id}</span>
                <span className="text-[10px] text-zinc-500">{r.period}</span>
              </div>
              <h3 className="text-xs font-semibold text-white leading-tight mb-1">{r.title}</h3>
              <p className="text-[11px] text-zinc-400 truncate">{r.beneficiary}</p>
            </button>
          ))}
        </div>

        {/* Certificate / Report Detail View (2 Cols) */}
        <div className="lg:col-span-2">
          {selectedReport ? (
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-6">
              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Certificate
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{selectedReport.title}</h2>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    Ref ID: {selectedReport.id} • {selectedReport.period}
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Certificate ${selectedReport.id} exported as PDF.`)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition self-start sm:self-center"
                >
                  <Download className="w-4 h-4" />
                  Export Certificate
                </button>
              </div>

              {/* Beneficiary Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-zinc-800/40 border border-zinc-800/60 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[11px]">Beneficiary Cooperative / Hauler:</span>
                  <span className="text-white font-medium text-sm mt-0.5 block">{selectedReport.beneficiary}</span>
                  {selectedReport.leadFarmer && (
                    <span className="text-zinc-400 text-[11px] mt-0.5 block">{selectedReport.leadFarmer}</span>
                  )}
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px]">Underwriting Institution:</span>
                  <span className="text-emerald-400 font-medium text-sm mt-0.5 block">
                    {selectedReport.partnerFinancialInstitution}
                  </span>
                </div>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[11px] block">Monitored Shipments</span>
                  <span className="text-xl font-mono font-bold text-white mt-1 block">
                    {selectedReport.totalShipmentsMonitored}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[11px] block">Integrity Score</span>
                  <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">
                    {selectedReport.avgHandlingIntegrityScore}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[11px] block">Trust Rating</span>
                  <span className="text-xl font-mono font-bold text-white mt-1 block">
                    {selectedReport.financialTrustScore}/100
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <span className="text-zinc-500 text-[11px] block">Credit Tier</span>
                  <span className="text-sm font-semibold text-emerald-400 mt-1.5 block">
                    {selectedReport.creditGrade.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Financial Underwriting Recommendation */}
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Pre-Approved Loan Recommendation
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Based on consistent CAN telemetry with transit spoilage rate of <span className="text-white font-medium">{selectedReport.spoilageLossRate || selectedReport.temperatureComplianceRate}</span>, the beneficiary qualifies for uncollateralized credit up to:
                </p>
                <div className="text-2xl font-bold font-mono text-emerald-400 pt-1">
                  NPR {selectedReport.recommendedLoanLimitNPR.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-zinc-500 pt-1">
                  Underwriting verified by: {selectedReport.verifiedBy}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500 border border-zinc-800 rounded-xl bg-zinc-900/40">
              Select an audit report from the left panel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;