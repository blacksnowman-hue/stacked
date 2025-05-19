import { useEffect, useState } from 'react';

import { useTranslation } from '../features/i18n/hooks';
import { useTransitionsStore } from '../features/transitions/transitionsStore';
import { useConfig } from '../shared/hooks';

export function Menu() {
  const { t } = useTranslation();
  const config = useConfig();
  const showTransition = useTransitionsStore((state) => state.showTransition);
  const hideTransition = useTransitionsStore((state) => state.hideTransition);
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyup = () => {
      if (isKeyPressed) return;
      setIsKeyPressed(true);
      onMenuClick();
    };

    window.addEventListener('keyup', handleKeyup);
    window.addEventListener('touchstart', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('touchstart', handleKeyup);
    };
  }, [isKeyPressed]);

  const onMenuClick = () => {
    // If it's the first one, show the tutorial.
    const cutsceneWatched = localStorage.getItem('cutscene-watched');
    let targetURL = config.routes.GAME;

    if (!cutsceneWatched) {
      localStorage.setItem('cutscene-watched', 'true');
      targetURL = config.routes.TUTORIAL;
    }

    showTransition();
    setTimeout(() => {
      window.location.href = targetURL;
    }, 1000);
  };

  const onReadMoreClick = () => {
    showTransition();
    setTimeout(() => {
      window.location.href = config.routes.ABOUT;
    }, 1000);
  };

  const onStartGameClick = () => {
    onMenuClick();
  };

  const onMusicToggle = () => {
    const musicEnabled = localStorage.getItem('music-enabled');
    localStorage.setItem('music-enabled', musicEnabled === 'true' ? 'false' : 'true');
    window.dispatchEvent(new Event('music-toggle'));
  };

  useEffect(() => {
    hideTransition();
  }, [hideTransition]);

  return (
    <div className="menu">
      <div className="menu-inner">
        <button className="menu-item" onClick={onStartGameClick}>
          {t('menu.start')}
        </button>

        <button className="menu-item" onClick={onReadMoreClick}>
          {t('menu.about')}
        </button>

        <button className="menu-item" onClick={onMusicToggle}>
          {t('menu.toggleMusic')}
        </button>
      </div>
    </div>
  );
} 