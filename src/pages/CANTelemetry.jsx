// src/pages/CANTelemetry.jsx
// Vehicle CAN Data Extraction & Agricultural Fleet Telemetry
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Gauge, 
  Thermometer, 
  Zap, 
  Truck, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { fetchCANTelemetry, postCANFrame } from '../services/api';

const CANTelemetry = () => {
  const [telemetry, setTelemetry] = useState(null);
  const [frameLog, setFrameLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [injecting, setInjecting] = useState(false);
  const [injectSpeed, setInjectSpeed] = useState(48);
  const [injectShock, setInjectShock] = useState('0.32');

  const loadData = async () => {
    const res = await fetchCANTelemetry();
    if (res) {
      setTelemetry(res.currentState);
      setFrameLog(res.recentFrames);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInjectFrame = async (e) => {
    e.preventDefault();
    setInjecting(true);
    await postCANFrame({
      canId: '0x18F0090B',
      dlc: 8,
      data: '24 00 00 00 00 00 00 00',
      decodedName: `CAN Injection: Speed ${injectSpeed} km/h, Shock ${injectShock}G`,
      speed: Number(injectSpeed),
      vibrationG: Number(injectShock)
    });
    await loadData();
    setInjecting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Connecting to vehicle CAN bus gateway...</span>
        </div>
      </div>
    );
  }

  const state = telemetry || {
    vehiclePlate: 'BA 2 KHA 4812',
    corridor: 'Chitwan → Kathmandu (Prithvi Highway)',
    protocol: 'ISO 15765-4 (CAN 2.0B / 500 kbps)',
    busLoadPercent: 28.4,
    engineRpm: 1820,
    vehicleSpeedKmH: 42.0,
    throttlePositionPercent: 32,
    engineCoolantTempC: 87.0,
    cargoReeferTempC: 13.2,
    cargoHumidityPercent: 82.0,
    chassisVibrationG: 0.28,
    shockEventsPeakCount: 2,
    fuelFlowLitersPerHour: 7.2
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Telemetry Engine</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              GATEWAY ONLINE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SAE J1939 • ISO 15765-4</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">500 KBPS REAL-TIME STREAM</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-zinc-300">{state.vehiclePlate}</div>
            <div className="text-xs text-zinc-500">{state.protocol}</div>
          </div>
          <button 
            onClick={loadData}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Vehicle & Protocol Meta Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div>
          <span className="text-xs text-zinc-500 block">Monitored Transport</span>
          <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-0.5">
            <Truck className="w-4 h-4 text-emerald-400" />
            {state.vehiclePlate}
          </span>
        </div>
        <div>
          <span className="text-xs text-zinc-500 block">Active Highway Transit</span>
          <span className="text-sm font-medium text-zinc-200 block truncate mt-0.5">
            {state.corridor}
          </span>
        </div>
        <div>
          <span className="text-xs text-zinc-500 block">Bus Load</span>
          <span className="text-sm font-mono text-zinc-200 mt-0.5 block">
            {state.busLoadPercent}% (Normal)
          </span>
        </div>
        <div>
          <span className="text-xs text-zinc-500 block">Handling Stability</span>
          <span className="text-sm font-medium text-emerald-400 flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
            Stable (0.28G nominal)
          </span>
        </div>
      </div>

      {/* Primary CAN Parameter Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Speed */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Ground Speed</span>
            <Gauge className="w-4 h-4 text-blue-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {state.vehicleSpeedKmH} <span className="text-base text-zinc-500 font-normal">km/h</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">PID 0x0D • Prithvi Highway speed compliance</div>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((state.vehicleSpeedKmH / 80) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Engine RPM */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Engine Speed</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {state.engineRpm} <span className="text-base text-zinc-500 font-normal">RPM</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">PID 0x0C • Throttle {state.throttlePositionPercent}%</div>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((state.engineRpm / 3000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Reefer Cargo Temp */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Cargo Temp (Reefer)</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {state.cargoReeferTempC}°C
            </div>
            <div className="text-xs text-zinc-500 mt-1">Target 4–8°C • Humidity {state.cargoHumidityPercent || 82}%</div>
          </div>
          <div className={`flex items-center gap-2 text-xs font-medium ${state.cargoReeferTempC > 8.0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            <span className={`w-2 h-2 rounded-full ${state.cargoReeferTempC > 8.0 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            {state.cargoReeferTempC > 8.0 ? 'Excursion Alert (Carrier Liable)' : 'Within Cold-Chain Bounds'}
          </div>
        </div>

        {/* Chassis Shock Load */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Chassis Shock Dynamics</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-semibold font-mono text-white">
              {state.chassisVibrationG} <span className="text-base text-zinc-500 font-normal">G</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Peak shock events: <span className="text-zinc-200 font-mono">{state.shockEventsPeakCount}</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-medium ${state.chassisVibrationG > 0.6 ? 'text-amber-400' : 'text-emerald-400'}`}>
            <span className={`w-2 h-2 rounded-full ${state.chassisVibrationG > 0.6 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
            {state.chassisVibrationG > 0.6 ? 'Pothole Shock (Farmer Decoupled)' : 'Nominal Transit Dynamic'}
          </div>
        </div>
      </div>

      {/* Decoupled Farmer Liability Live Protocol Banner */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        state.chassisVibrationG > 0.6 || state.cargoReeferTempC > 8.0
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          <ShieldCheck className={`w-5 h-5 shrink-0 ${state.chassisVibrationG > 0.6 || state.cargoReeferTempC > 8.0 ? 'text-amber-400' : 'text-emerald-400'}`} />
          <div>
            <div className="font-bold text-white text-xs">
              Decoupled Liability Status: {state.liabilityAttribution || 'Farmer Protected (100% Insulated)'}
            </div>
            <div className="text-[11px] text-zinc-400">
              {state.chassisVibrationG > 0.6 
                ? 'High road shock logged to carrier profile. Zero deduction applied to Bharat Sharma (Farmer).'
                : state.cargoReeferTempC > 8.0
                ? 'Cooling breach attributed to carrier compressor fault. Farmer payout guaranteed.'
                : 'Pristine transit telemetry: Unlocking uncollateralized ADBL micro-lending eligibility.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-[11px] font-mono text-white">
            Farmer Credit Score: 98.4%
          </span>
        </div>
      </div>

      {/* Frame Inspector & Injection Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live CAN Packet Log */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">CAN Frame Extraction Log</h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">500 kbps • ISO 15765-4</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-mono">
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">CAN ID</th>
                  <th className="pb-2">DLC</th>
                  <th className="pb-2">Data (Hex)</th>
                  <th className="pb-2">Decoded Parameter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {frameLog.map((frame, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition">
                    <td className="py-2.5 text-zinc-500">
                      {new Date(frame.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 text-emerald-400 font-semibold">{frame.canId}</td>
                    <td className="py-2.5 text-zinc-400">{frame.dlc}</td>
                    <td className="py-2.5 text-zinc-300">{frame.data}</td>
                    <td className="py-2.5 font-sans text-zinc-200">{frame.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gateway Diagnostics & Diagnostic Calibration */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Gateway Sensor Diagnostic Console</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Transmit live diagnostic CAN calibration frames to verify vehicle gateway latency and real-time shock threshold sensitivity.
            </p>

            <form onSubmit={handleInjectFrame} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Target Speed (km/h)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100"
                  value={injectSpeed}
                  onChange={(e) => setInjectSpeed(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Vertical Shock Threshold (G-Force)</label>
                <input 
                  type="number" 
                  step="0.05"
                  min="0" 
                  max="2.0"
                  value={injectShock}
                  onChange={(e) => setInjectShock(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Values &gt; 0.45G detect rough road surface / pothole impacts
                </span>
              </div>

              <button
                type="submit"
                disabled={injecting}
                className="w-full mt-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {injecting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                Transmit Diagnostic Frame
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
            Protocol compliant with SAE J1939-71 &amp; ISO 15765 standards.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CANTelemetry;
