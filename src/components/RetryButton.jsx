import { useTranslation } from '../features/i18n/hooks';
import { useStore } from '../tools/store';

export function RetryButton() {
  const { t } = useTranslation();
  const restart = useStore((s) => s.restart);
  const isEnded = useStore((s) => s.isEnded);

  return (
    <>
      {isEnded && (
        <button className="retry-button" onClick={restart}>
          {t('retry.button')}
        </button>
      )}
    </>
  );
} 