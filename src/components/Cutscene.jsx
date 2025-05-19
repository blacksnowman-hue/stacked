import { useState } from 'react';

import { useTranslation } from '../features/i18n/hooks';
import { useTransitionsStore } from '../features/transitions/transitionsStore';
import { useConfig } from '../shared/hooks';

export function Cutscene() {
  const { t } = useTranslation();
  const config = useConfig();
  const [isReady, setIsReady] = useState(false);
  const [stage, setStage] = useState(0);
  const stageNames = ['intro', 'movement', 'controls', 'outro'];
  const maxStages = stageNames.length;

  const hideTransition = useTransitionsStore((state) => state.hideTransition);
  const showTransition = useTransitionsStore((state) => state.showTransition);

  return (
    <div
      className={`cutscene-wrapper${stage === 0 ? ' cutscene-wrapper--hidden' : ''}${
        !isReady ? ' cutscene-wrapper--not-ready' : ''
      }`}
      onClick={() => {
        if (stage >= maxStages) {
          hideTransition();
          setTimeout(() => {
            window.location.href = config.routes.GAME;
          }, 1000);
          return;
        }

        if (stage === 0) {
          showTransition();
          setTimeout(() => {
            setStage(1);
            setTimeout(() => {
              hideTransition();
            }, 1000);
          }, 1000);
          return;
        }

        setStage((prev) => prev + 1);
      }}
    >
      <video
        playsInline
        autoPlay
        preload="auto"
        loop
        muted
        className="cutscene-video"
        onCanPlay={() => setIsReady(true)}
      >
        <source src="/cutscene.mp4" type="video/mp4" />
      </video>
      {stage >= 1 && (
        <div className="cutscene">
          <h1 className="cutscene-title">{t(`cutscene.${stageNames[stage - 1]}.title`)}</h1>
          <p className="cutscene-subtitle">{t(`cutscene.${stageNames[stage - 1]}.subtitle`)}</p>
          <p className="cutscene-text">{t(`cutscene.${stageNames[stage - 1]}.text`)}</p>
          <button className="cutscene-button">{t(`cutscene.button`)}</button>
        </div>
      )}
    </div>
  );
} 