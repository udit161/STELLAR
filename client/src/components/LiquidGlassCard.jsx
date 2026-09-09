import React from 'react';
import './LiquidGlassCard.css';

export function LiquidGlassCard({ children, className = '', pill = false, style = {}, onClick }) {
  return (
    <div
      className={`liquid-glass-card ${pill ? 'pill-variant' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default LiquidGlassCard;
