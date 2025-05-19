import { useTranslation } from '../features/i18n/hooks';
import { formatNumber } from '../tools/numbers';
import { formatMillisecondsHumanReadable } from '../tools/time';
import { useStore } from '../tools/store';

export function Scoreboard() {
  const { t } = useTranslation();

  const score = useStore((s) => s.score);
  const timeMs = useStore((s) => s.timeMs);
  const isPaused = useStore((s) => s.isPaused);
  const isEnded = useStore((s) => s.isEnded);

  return (
    <div className={`scoreboard ${isPaused || isEnded ? 'scoreboard--dimmed' : ''}`}>
      <div className="scoreboard-item scoreboard-score">
        <div className="scoreboard-item-title">{t('scoreboard.score')}</div>
        <div className="scoreboard-item-value">{t('score.format', { n: formatNumber(score) })}</div>
      </div>

      <div className="scoreboard-item scoreboard-time">
        <div className="scoreboard-item-title">{t('scoreboard.time')}</div>
        <div className="scoreboard-item-value">{formatMillisecondsHumanReadable(timeMs, t)}</div>
      </div>
    </div>
  );
} 