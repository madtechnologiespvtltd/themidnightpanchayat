import React, { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to allow CSS animation to trigger on mount
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast-notification ${isVisible ? 'toast-visible' : 'toast-hidden'} toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✓' : type === 'info' ? 'ℹ' : '⚠'}
      </span>
      <span className="toast-message font-heading">{message}</span>
    </div>
  );
}
