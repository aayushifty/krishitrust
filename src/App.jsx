import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Layout Component
import Layout from "./components/Layout";

// KrishiTrust Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import Analytical from "./pages/Analytical";
import Alerts from "./pages/Alerts";
import CANTelemetry from "./pages/CANTelemetry";
import Stakeholders from "./pages/Stakeholders";
import Sponsor from "./pages/Sponsor";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Presentation from "./pages/Presentation";

function App() {
  const navigate = useNavigate();

  // Secret Hotkey for Pitch Deck (Ctrl+Shift+P or Alt+P) - known only to presenter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) ||
          (e.altKey && (e.key === 'P' || e.key === 'p'))) {
        e.preventDefault();
        navigate('/pitch');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <Routes>
      {/* Standalone Pages: Portal is the primary front-door entry point */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/overview" element={<Landing />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/pitch" element={<Presentation />} />
      
      {/* Protected & Layout Routes */}
      <Route element={<Layout />}>
        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Core Sponsoring & Micro-Lending Marketplace */}
        <Route path="/sponsor" element={<Sponsor />} />
        
        {/* Core Agricultural Operations Features */}
        <Route path="/map" element={<LiveMap />} />
        <Route path="/analysis" element={<Analytical />} />
        <Route path="/alerts" element={<Alerts />} />
        
        {/* Multi-Stakeholder Simulation & Accountability */}
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/ecosystem" element={<Stakeholders />} />
        
        {/* CAN Data Extraction & Telemetry */}
        <Route path="/can" element={<CANTelemetry />} />
        <Route path="/sensors" element={<CANTelemetry />} />
        
        {/* Reports & Business Intelligence */}
        <Route path="/reports" element={<Reports />} />
        
        {/* Settings & Configuration */}
        <Route path="/settings" element={<Settings />} />
        
        {/* Fallback Route - Redirect to Dashboard */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;