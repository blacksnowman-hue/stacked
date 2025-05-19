import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '../features/i18n/hooks';
import { useStore } from '../tools/store';

export function StartScreen() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const isStarted = useStore((s) => s.isStarted);
  const start = useStore((s) => s.start);
  const el = useRef(null);

  const onClick = () => {
    if (isStarted) return;
    start();
    setIsVisible(false);
  };

  const onTransitionEnd = () => {
    if (el.current) {
      el.current.style.display = 'none';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isStarted) return;
      if (e.key === ' ' || e.key === 'Enter') {
        start();
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStarted, start]);

  return (
    <div
      className={`start-screen ${isVisible ? '' : 'start-screen--invisible'}`}
      onClick={onClick}
      ref={el}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="start-screen-content">
        <h1>{t('start.title')}</h1>
        <p>{t('start.subtitle')}</p>
      </div>
    </div>
  );
} 