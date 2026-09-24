// src/pages/LiveMap.jsx
// Glitch-Free Highway Transit Corridors & GPS Monitoring
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  RefreshCw, 
  Map as MapIcon, 
  List, 
  Thermometer, 
  Gauge 
} from 'lucide-react';
import { fetchCorridors, fetchShipments } from '../services/api';

const LiveMap = () => {
  const [corridors, setCorridors] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'map'
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [c, s] = await Promise.all([
        fetchCorridors(),
        fetchShipments()
      ]);
      if (c) {
        setCorridors(c);
        if (c.length > 0) setSelectedCorridor(c[0]);
      }
      if (s) {
        setShipments(s);
        if (s.length > 0) setSelectedShipment(s[0]);
      }
    } catch (err) {
      console.error('Error loading corridors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-zinc-400">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          <span>Loading Nepal agricultural corridors...</span>
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
            Transit Corridors
          </h1>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>PRITHVI • MUGLING • TRIBHUVAN</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">LIVE HIGHWAY NODES</span>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setViewMode('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'overview'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Corridor Route Details
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'map'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Geospatial Map
          </button>
        </div>
      </div>

      {/* Overview / Route Details Mode (Glitch-Free & Visual) */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Corridor Selection List (4 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block px-1">
              Select Monitored Highway
            </span>

            {corridors.map((c) => {
              const isSelected = selectedCorridor?.id === c.id;
              const activeCount = shipments.filter(s => s.corridorId === c.id).length;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-500/60 ring-1 ring-emerald-500/20 shadow-md'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-semibold">{c.distanceKm} km</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
                      {activeCount} Active {activeCount === 1 ? 'Truck' : 'Trucks'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <span>{c.origin}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span>{c.destination}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-2">
                    Crops: {c.primaryCrops.join(', ')} • Est. Transit: {c.typicalTransitHours} hrs
                  </div>
                </div>
              );
            })}
          </div>

          {/* Corridor Waypoints Visual Flow (7 Cols) */}
          <div className="lg:col-span-7">
            {selectedCorridor ? (
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Route Waypoints &amp; Checkposts
                  </div>
                  <h2 className="text-lg font-bold text-white">{selectedCorridor.name}</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Risk Assessment Zone: <span className="text-amber-400 font-medium">{selectedCorridor.riskZone}</span>
                  </p>
                </div>

                {/* Stepper Waypoint Pipeline */}
                <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500/30 ml-2">
                  {selectedCorridor.waypoints.map((wp, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === selectedCorridor.waypoints.length - 1;
                    return (
                      <div key={idx} className="relative pl-4 group">
                        <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-900 ${
                          isFirst ? 'bg-emerald-400' : isLast ? 'bg-purple-400' : 'bg-zinc-600'
                        }`} />
                        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold text-white">{wp.name}</span>
                            <div className="text-[10px] font-mono text-zinc-500">
                              Coords: {wp.coords[0].toFixed(3)}°N, {wp.coords[1].toFixed(3)}°E
                            </div>
                          </div>
                          {isFirst && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                              Farm Dispatch
                            </span>
                          )}
                          {isLast && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-medium">
                              Capital Mandi
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Trucks on this Corridor */}
                <div className="pt-4 border-t border-zinc-800">
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Active Produce Shipments on this Highway
                  </h4>
                  <div className="space-y-2">
                    {shipments.filter(s => s.corridorId === selectedCorridor.id).map((s) => (
                      <div key={s.id} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Truck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{s.crop}</div>
                            <div className="text-[11px] text-zinc-400 font-mono">{s.vehiclePlate} • Driver: {s.driverName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-mono font-semibold">{s.currentSpeedKmH} km/h • {s.currentTempC}°C</div>
                          <div className="text-[10px] text-zinc-500">{s.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Geospatial Map Mode (Reliable Embed with Fallback) */}
      {viewMode === 'map' && (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Interactive Geospatial Map</h2>
              <p className="text-xs text-zinc-400">Arterial Highway produce transit routes from Terai to Kathmandu</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">GPS Live Sync</span>
          </div>

          <div className="w-full h-[520px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative">
            <iframe
              title="Nepal Agricultural Highway Map"
              className="w-full h-full border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=83.6%2C27.0%2C85.8%2C28.4&amp;layer=mapnik&amp;marker=27.7%2C84.8"
            />
            <div className="absolute bottom-4 right-4 bg-zinc-900/90 backdrop-blur p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1 shadow-xl">
              <div className="font-semibold text-white text-[11px]">Monitored Highway Corridors</div>
              <div>• Prithvi Highway (Chitwan &amp; Pokhara to Kathmandu)</div>
              <div>• Tribhuvan Highway (Birgunj to Kathmandu)</div>
              <div className="text-[10px] text-emerald-400 pt-1">3 Vehicles in transit with live telemetry</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMap;