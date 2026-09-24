// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";

// Fix Leaflet default markers
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Console branding for development
if (import.meta.env.DEV) {
  console.log('🛡️ KrishiTrust Fair Transit & Credit Protocol');
  console.log('🚛 Telemetry Engine: ISO 15765-4 / SAE J1939');
}

// Error handling for the entire app
const handleGlobalError = (error) => {
  console.error('🌾 KrishiPath AI Error:', error);
};

window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  handleGlobalError(event.reason);
});

// Create root and render app
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found. Please check your HTML file.');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);