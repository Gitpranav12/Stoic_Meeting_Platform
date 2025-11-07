import React from 'react';
import { Video, Layers } from 'lucide-react';

export default function Logo({ size = 'md', showText = true, variant = 'default' }) {
  const sizeMap = {
    sm: { icon: 24, inner: 12, smallDot: 12, text: '1rem' },
    md: { icon: 32, inner: 16, smallDot: 14, text: '1.25rem' },
    lg: { icon: 48, inner: 24, smallDot: 18, text: '1.5rem' }
  };

  const current = sizeMap[size];
  const textColor = variant === 'white' ? '#fff' : '#212529';
  const accentColor = variant === 'white' ? '#fff' : '#0d6efd'; // Bootstrap primary blue

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Logo Icon */}
      <div className="position-relative d-inline-flex align-items-center justify-content-center">
        <div
          className="d-flex align-items-center justify-content-center rounded shadow-sm"
          style={{
            width: current.icon,
            height: current.icon,
            background: 'linear-gradient(135deg, #3b82f6, #9333ea)', // blue to purple
          }}
        >
          <Video size={current.inner} color="white" />
        </div>
        <div
          className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: current.smallDot,
            height: current.smallDot,
            background: 'linear-gradient(135deg, #9333ea, #ec4899)', // purple to pink
            bottom: '-4px',
            right: '-4px',
          }}
        >
          <Layers size={current.inner / 1.5} color="white" />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="d-flex flex-column lh-1 ms-2">
          <span
            className="fw-bold"
            style={{ color: accentColor, fontSize: current.text }}
          >
            Stoic
          </span>
          <span
            style={{
              color: textColor,
              opacity: 0.9,
              fontSize: '0.8rem',
            }}
          >
            Meeting Platform
          </span>
        </div>
      )}
    </div>
  );
}
