import { useTranslation } from '../features/i18n/hooks';
import { formatNumber } from '../tools/numbers';
import { formatMillisecondsHumanReadable } from '../tools/time';
import { Logo } from './Logo';
import { useConfig } from '../shared/hooks';
import { useStore } from '../tools/store';

export function Stats() {
  const { t } = useTranslation();
  const config = useConfig();

  const score = useStore((s) => s.score);
  const timeMs = useStore((s) => s.timeMs);
  const baseMultiplier = useStore((s) => s.baseMultiplier);
  const extraScore = useStore((s) => s.extraScore);
  const maxWidth = useStore((s) => s.maxWidth);
  const maxHeight = useStore((s) => s.maxHeight);
  const maxDepth = useStore((s) => s.maxDepth);
  const isEnded = useStore((s) => s.isEnded);
  const isStarted = useStore((s) => s.isStarted);

  const hasScore = score > 0;
  const isVisible = isEnded && isStarted;

  return (
    <div className={`stats-wrapper ${isVisible ? 'stats-wrapper--visible' : ''}`}>
      <div className="stats">
        <Logo className="stats-logo" isLogoLink />

        <div className="stats-content">
          <h1 className="stats-title">{t('stats.title')}</h1>

          <div className="stats-value">
            <p className="stats-value-title">{t('stats.score')}</p>
            <p className="stats-value-key">{t('score.format', { n: formatNumber(score) })}</p>
            {hasScore && (
              <div>
                <p className="stats-value-detail">
                  {t('stats.scoreFrom', {
                    base: t('score.format', { n: formatNumber(score - extraScore) }),
                  })}
                </p>
                <p className="stats-value-detail">
                  {t('stats.extra', {
                    extra: t('score.format', { n: formatNumber(extraScore) }),
                  })}
                </p>
                <p className="stats-value-detail">
                  {t('stats.multiplier', {
                    multiplier: t('score.format', { n: formatNumber(baseMultiplier) }),
                  })}
                </p>
              </div>
            )}
          </div>
          <div className="stats-value">
            <p className="stats-value-title">{t('stats.time')}</p>
            <p className="stats-value-key">{formatMillisecondsHumanReadable(timeMs, t)}</p>
          </div>
          <div className="stats-value">
            <p className="stats-value-title">{t('stats.dimensions')}</p>
            <p className="stats-value-key">
              {t('stats.dimensionsValue', {
                width: t('score.format', { n: maxWidth }),
                height: t('score.format', { n: maxHeight }),
                depth: t('score.format', { n: maxDepth }),
              })}
            </p>
          </div>

          <div className="stats-actions">
            <a className="stats-action-button" href={config.routes.GAME}>
              {t('stats.retry')}
            </a>
            <a className="stats-action-button" href={config.routes.HOME}>
              {t('stats.home')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 