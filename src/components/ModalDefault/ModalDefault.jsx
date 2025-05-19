import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './ModalDefault.css';

export function ModalDefault({
  isOpen,
  onClose,
  children,
  className = '',
  sizeClass = '',
  showClose = true,
  hideOverlay = false,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (!hideOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (!hideOverlay) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isOpen, onClose, hideOverlay]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`modal-overlay ${hideOverlay ? 'modal-overlay-hidden' : ''}`}>
      <div className={`modal-content ${className} ${sizeClass}`} ref={modalRef}>
        {showClose && (
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
} 