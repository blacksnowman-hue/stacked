import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '../features/i18n/hooks';
import { formatNumber, numbs } from '../tools/numbers';
import { useStore } from '../tools/store';

function getExtraScore(index, baseMultiplier) {
  const score = numbs.extraScore(index, baseMultiplier);
  return score > 0 ? score : null;
}

export function ExtraScore() {
  const { t } = useTranslation();
  const [className, setClassName] = useState('');

  const index = useStore((s) => s.index);
  const baseMultiplier = useStore((s) => s.baseMultiplier);
  const incrementExtraScore = useStore((s) => s.incrementExtraScore);

  const scoreRef = useRef(null);

  useEffect(() => {
    const score = getExtraScore(index, baseMultiplier);
    if (!score) return;

    incrementExtraScore(score);

    if (!scoreRef.current) return;

    scoreRef.current.innerText = `+${t('score.format', { n: formatNumber(score) })}`;
    setClassName('active');

    const timer = setTimeout(() => {
      setClassName('active fade');
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [baseMultiplier, index, incrementExtraScore, t]);

  if (!getExtraScore(index, baseMultiplier)) return null;

  return (
    <div className={`extra-score ${className}`}>
      <div className="extra-score-content" ref={scoreRef}>
        {null}
      </div>
    </div>
  );
} 