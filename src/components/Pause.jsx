import { useEffect } from 'react';

import { useTranslation } from '../features/i18n/hooks';
import { useTransitionsStore } from '../features/transitions/transitionsStore';
import { formatMillisecondsHumanReadable } from '../tools/time';
import { useConfig } from '../shared/hooks';
import { useStore } from '../tools/store';

export function Pause() {
  const { t } = useTranslation();
  const config = useConfig();

  const isPaused = useStore((s) => s.isPaused);
  const toggleIsPaused = useStore((s) => s.toggleIsPaused);

  const score = useStore((s) => s.score);
  const timeMs = useStore((s) => s.timeMs);
  const restart = useStore((s) => s.restart);

  const showTransition = useTransitionsStore((state) => state.showTransition);

  const goToMain = () => {
    showTransition();
    setTimeout(() => {
      window.location.href = config.routes.HOME;
    }, 1000);
  };

  const unpause = () => {
    toggleIsPaused();
  };

  const restartGame = () => {
    toggleIsPaused();
    restart();
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        toggleIsPaused();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleIsPaused]);

  if (!isPaused) return null;

  return (
    <div className="pause">
      <div className="pause-content">
        <div className="pause-header">
          <h1>{t('pause.paused')}</h1>
        </div>

        <div className="pause-stats">
          <div>
            <p className="pause-stats-item-header">{t('pause.score')}</p>
            <p className="pause-stats-item-value">
              {t('score.format', { n: score.toLocaleString(undefined) })}
            </p>
          </div>
          <div>
            <p className="pause-stats-item-header">{t('pause.time')}</p>
            <p className="pause-stats-item-value">{formatMillisecondsHumanReadable(timeMs, t)}</p>
          </div>
        </div>

        <div className="pause-buttons">
          <button onClick={unpause}>{t('pause.unpause')}</button>
          <button onClick={restartGame}>{t('pause.restart')}</button>
          <button onClick={goToMain}>{t('pause.home')}</button>
        </div>
      </div>
    </div>
  );
} 