import React from 'react';
import ScatterAndReassembleText from './ScatterAndReassembleText';
import './StellarLogo.css';

export function StellarLogo({ onClick, size = 'normal', animated = true }) {
  return (
    <div 
      className={`stellar-logo-wrapper ${size}`}
      onClick={onClick} 
      title="Stellar AI"
    >
      <div className="stellar-logo-container">
        <div className="stellar-logo-halo" />
        <div className="stellar-logo-ring" />
        <div className="stellar-logo-mask" />
        <div className="stellar-logo-card">
          <div className="stellar-logo-scaled-inner">
            <ScatterAndReassembleText showMultilingual={false} singleLine={true} animated={animated} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StellarLogo;
