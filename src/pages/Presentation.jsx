// src/pages/Presentation.jsx
// ── Secret pitch route: /pitch & /presentation
// ── Seamless edge-to-edge embed with floating back navigation

import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Presentation() {
  const navigate = useNavigate();
  const [fsActive, setFsActive] = useState(false);
  const iframeRef = useRef(null);

  const toggleFs = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setFsActive(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Forward keyboard events
  useEffect(() => {
    const kd = (e) => {
      if (e.key === 'f' || e.key === 'F') toggleFs();
      if (e.key === 'Escape' && !document.fullscreenElement) {
        // Optional back shortcut
      }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [toggleFs]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#030712',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Discreet floating back pill (hidden during active fullscreen) */}
      {!fsActive && (
        <button
          onClick={() => navigate('/dashboard')}
          title="Return to KrishiTrust Dashboard"
          style={{
            position: 'fixed',
            bottom: 20,
            left: 24,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 99,
            background: 'rgba(3, 7, 18, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94a3b8',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.background = 'rgba(3, 7, 18, 0.75)';
          }}
        >
          <span>←</span> Back to Dashboard
        </button>
      )}

      {/* Edge-to-edge Pitch Deck iframe */}
      <iframe
        ref={iframeRef}
        src="/pitch-deck.html"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="KrishiTrust Pitch Deck"
        allow="fullscreen"
      />
    </div>
  );
}
