// src/pages/Settings.jsx
// Vehicle CAN Bus Interface Configuration & System Parameters
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Sliders, 
  Globe, 
  ShieldCheck, 
  Check, 
  RefreshCw 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('can');
  const [canSettings, setCanSettings] = useState({
    busSpeed: '500kbps',
    protocol: 'ISO 15765-4 (CAN 2.0B 29-bit)',
    gatewayPort: 5001,
    busTermination120: true,
    autoReconnect: true,
    packetFiltering: 'Standard Agri Telemetry PIDs'
  });

  const [thresholds, setThresholds] = useState({
    maxShockG: 0.45,
    maxCargoTempC: 15.0,
    minCargoTempC: 10.0,
    speedAdvisoryLimitKmH: 45
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'can', label: 'CAN Bus Interface', icon: Cpu },
    { id: 'thresholds', label: 'Handling & Safety Thresholds', icon: Sliders },
    { id: 'integrations', label: 'Banking & API Integrations', icon: Globe }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Platform Configuration</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure CAN extraction parameters, telemetry thresholds, and bank underwriting integrations
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            <Check className="w-3.5 h-3.5" />
            Configuration Saved
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: CAN Bus Configuration */}
      {activeTab === 'can' && (
        <form onSubmit={handleSave} className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-white">Vehicle CAN Data Extraction Parameters</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Direct physical bus interface configuration for transport vehicle onboard gateways
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1.5">CAN Bus Bitrate</label>
              <select
                value={canSettings.busSpeed}
                onChange={(e) => setCanSettings({ ...canSettings, busSpeed: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="500kbps">500 kbps (High Speed CAN / ISO 15765)</option>
                <option value="250kbps">250 kbps (Heavy Duty Commercial / SAE J1939)</option>
                <option value="125kbps">125 kbps (Low Speed Fault Tolerant)</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1.5">Telemetry Protocol Standard</label>
              <select
                value={canSettings.protocol}
                onChange={(e) => setCanSettings({ ...canSettings, protocol: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ISO 15765-4 (CAN 2.0B 29-bit)">ISO 15765-4 (CAN 2.0B 29-bit extended)</option>
                <option value="SAE J1939 Heavy Truck">SAE J1939 Heavy Vehicle Telemetry</option>
                <option value="Standard OBD-II 11-bit">Standard OBD-II (11-bit identifier)</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1.5">Local Ingestion Server Port</label>
              <input
                type="number"
                value={canSettings.gatewayPort}
                onChange={(e) => setCanSettings({ ...canSettings, gatewayPort: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1.5">Active PID Filter Profile</label>
              <input
                type="text"
                value={canSettings.packetFiltering}
                readOnly
                className="w-full px-3 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700 text-zinc-300 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="term120"
                checked={canSettings.busTermination120}
                onChange={(e) => setCanSettings({ ...canSettings, busTermination120: e.target.checked })}
                className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
              />
              <label htmlFor="term120" className="text-xs text-zinc-300">
                Enable internal 120Ω CAN bus termination resistor
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
            >
              Save CAN Settings
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Handling & Safety Thresholds */}
      {activeTab === 'thresholds' && (
        <form onSubmit={handleSave} className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-white">Produce Handling &amp; Transit Degradation Limits</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Set automated alert triggers for road shock and cold-chain temperature deviations
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-zinc-300">
                <span>Peak Chassis Shock Limit: <b className="font-mono text-white">{thresholds.maxShockG}G</b></span>
                <span className="text-zinc-500">Mugling / Rough highway trigger</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={thresholds.maxShockG}
                onChange={(e) => setThresholds({ ...thresholds, maxShockG: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-zinc-300">
                <span>Maximum Reefer Cargo Temperature: <b className="font-mono text-white">{thresholds.maxCargoTempC}°C</b></span>
                <span className="text-zinc-500">Cold-chain upper bound</span>
              </div>
              <input
                type="range"
                min="8"
                max="25"
                step="0.5"
                value={thresholds.maxCargoTempC}
                onChange={(e) => setThresholds({ ...thresholds, maxCargoTempC: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-zinc-300">
                <span>Highway Speed Advisory: <b className="font-mono text-white">{thresholds.speedAdvisoryLimitKmH} km/h</b></span>
                <span className="text-zinc-500">Prithvi Highway curve safety</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={thresholds.speedAdvisoryLimitKmH}
                onChange={(e) => setThresholds({ ...thresholds, speedAdvisoryLimitKmH: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-right">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition"
            >
              Update Thresholds
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Banking & API Integrations */}
      {activeTab === 'integrations' && (
        <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-white">Financial Institution Underwriting Webhooks</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified underwriting data channels connecting KrishiTrust to Nepalese agricultural lenders
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-lg bg-zinc-800/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Agricultural Development Bank (ADBL)</span>
                <span className="text-zinc-400 text-[11px]">Direct credit scoring webhook for Sana Kisan co-operatives</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                Connected
              </span>
            </div>

            <div className="p-4 rounded-lg bg-zinc-800/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Shikhar Insurance Agro-Shield</span>
                <span className="text-zinc-400 text-[11px]">Automated cold-chain spoilage parametric policy underwriting</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                Connected
              </span>
            </div>

            <div className="p-4 rounded-lg bg-zinc-800/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Nabil Bank SME Agro Lending</span>
                <span className="text-zinc-400 text-[11px]">Working capital credit limit calculation webhook</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[11px] font-medium">
                Sandbox Mode
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;