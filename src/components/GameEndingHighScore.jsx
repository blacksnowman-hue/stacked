import { useReadLocalStorage } from 'usehooks-ts';
import { useTheme } from '../contexts/ThemeContext';
import { LocalStorageKeys } from '../shared/LocalStorageKeys';
import { sharedStyleProps } from './Greeting';

export function GameEndingHighScore({
  isHighScoreNew,
  className,
}) {
  const { theme } = useTheme();

  const highScore = useReadLocalStorage(LocalStorageKeys.HighScore);

  return isHighScoreNew || highScore ? (
    <div
      className={className}
      style={{
        ...sharedStyleProps,
        color: theme.lightElements,
        letterSpacing: 0,

        fontSize: '2rem',
        top: `${5 + 2 + 1}rem`, // `5 + 2` is `size + top` of Score.

        pointerEvents: 'none',
      }}
    >
      {/* TODO icon instead of Best: */}
      {isHighScoreNew ? 'New record' : `Best: ${highScore}`}
    </div>
  ) : null;
} 