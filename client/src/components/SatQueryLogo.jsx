import React from 'react';
import ScatterAndReassembleText from './ScatterAndReassembleText';
import './SatQueryLogo.css';

export function SatQueryLogo({ onClick, size = 'normal', animated = true }) {
  const isSmall = size === 'small';
  return (
    <div 
      className={`satquery-logo-wrapper ${size}`}
      onClick={onClick} 
      title="SatQuery AI"
    >
      <div className="satquery-logo-container">
        <div className="satquery-logo-halo" />
        <div className="satquery-logo-ring" />
        <div className="satquery-logo-mask" />
        <div className="satquery-logo-card">
          <div className="satquery-logo-scaled-inner">
            <ScatterAndReassembleText showMultilingual={false} singleLine={true} animated={isSmall ? false : animated} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SatQueryLogo;
