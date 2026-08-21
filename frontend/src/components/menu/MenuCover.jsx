import React from 'react';

export default function MenuCover({ isOpen, onOpen }) {
  return (
    <div 
      className={`menu-cover ${isOpen ? 'open' : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open menu"
    >
      <h1 className="display-text cover-title" style={{ fontSize: '2.5rem' }}>THE MIDNIGHT PANCHAYAT</h1>
      <p className="accent-text cover-subtitle">Est. 1974</p>
      <div style={{ marginTop: '2rem' }}>
        <p className="price-text" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Good Coffee</p>
        <p className="price-text" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Good Company</p>
      </div>
      <p className="accent-text cover-cta">Tap to Open</p>
    </div>
  );
}
