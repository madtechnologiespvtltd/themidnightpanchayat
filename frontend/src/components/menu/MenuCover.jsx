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
      <p className="cover-cta" style={{ fontWeight: 'bold', textTransform: 'uppercase', marginTop: '1.5rem', fontSize: '1.2rem' }}>TAP TO OPEN</p>
    </div>
  );
}
