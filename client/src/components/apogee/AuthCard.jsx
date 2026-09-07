import React, { useEffect, useRef } from 'react';
import Tabs from './Tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export function AuthCard({ mode, setMode, onSuccess }) {
  const cardRef = useRef(null);
  const viewportRef = useRef(null);

  // Imperative cursor sheen tracking over glass card without React re-renders
  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x.toFixed(1)}px`);
    card.style.setProperty('--my', `${y.toFixed(1)}px`);
  };

  // Height-animated viewport crossfade
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const activePanel = viewport.querySelector('.form-panel.active');
    if (activePanel) {
      viewport.style.height = `${activePanel.offsetHeight}px`;
    }
  }, [mode]);

  return (
    <section className="card-border-wrapper">
      <div className="glass-card" ref={cardRef} onPointerMove={handlePointerMove}>
        <Tabs mode={mode} setMode={setMode} />

        <div className="forms-viewport" ref={viewportRef}>
          <SignInForm isActive={mode === 'signin'} onSuccess={onSuccess} />
          <SignUpForm isActive={mode === 'signup'} onSuccess={onSuccess} />
        </div>
      </div>
    </section>
  );
}

export default AuthCard;
