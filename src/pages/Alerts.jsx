// src/pages/Alerts.jsx
// Operational & Risk Alerts View for KrishiTrust
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle2, RefreshCw, Filter } from 'lucide-react';
import { fetchAlerts } from '../services/api';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    const data = await fetchAlerts();
    if (data) setAlerts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'all') return true;
    return a.severity.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Fetching highway risk alerts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Active Alerts</h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>EVENT DISPATCH ENGINE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">CAN BUS THRESHOLDS</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'warning', 'watch', 'info'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                filter === lvl
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const isWarn = alert.severity === 'Warning';
            const isWatch = alert.severity === 'Watch';
            return (
              <div
                key={alert.id}
                className={`p-5 rounded-xl border transition-all ${
                  isWarn
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : isWatch
                    ? 'bg-blue-500/5 border-blue-500/20'
                    : 'bg-zinc-900/60 border-zinc-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : isWatch ? (
                      <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <h3 className="text-sm font-semibold text-white">{alert.type}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {alert.shipmentId}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {new Date(alert.timestamp).toLocaleString([], { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  {alert.message}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
                  <span className="font-mono text-[11px] text-zinc-500">
                    Location: <span className="text-zinc-300">{alert.location}</span>
                  </span>
                  <span className="text-emerald-400 text-[11px] font-medium">
                    Action: {alert.actionTaken}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-xs text-zinc-500 border border-zinc-800 rounded-xl bg-zinc-900/40">
            No alerts matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;