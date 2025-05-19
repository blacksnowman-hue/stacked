import { useEffect, useRef } from 'react';

import { sharedStyleProps } from '../Greeting';

import './ThisGameStats.css';

export function ThisGameStatsComponent({
  thisGameStats,
  globalStats,
  className,
}) {
  return (
    <div
      className={`${className} ThisGameStats`}
      style={{
        ...sharedStyleProps,
        letterSpacing: 0,
        backgroundColor: '#333',
        color: '#ddd',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        textShadow: 'none', // overriding from sharedStyleProps, since here we need high readability, not game-like appearance

        fontSize: '0.9rem',
        top: '3rem',
        userSelect: 'text',
      }}
    >
      <h3>This game</h3>
      <div>
        <Table rows={thisGameStats} />
        <h3>All games</h3>
        <Table rows={globalStats} />
      </div>
    </div>
  );
}

function Table({ rows }) {
  return (
    <table className="ThisGameStats-table">
      <tbody>
        {Object.entries(rows).map(([key, value]) => {
          if (key === 'currentCombo') return null;
          if (key === 'isItFirstPlay') return null;
          if (key === 'startTime') return null;
          return (
            <tr key={key}>
              <td>
                <strong>{formatKey(key)}</strong>
              </td>
              <td>{formatValue(key, value)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function formatKey(key) {
  return {
    boxesDropped: 'Blocks dropped',
    perfectBoxes: 'Perfect blocks',
    lostToHighScore: 'Lost while having a high-score',
    highScore: 'High-score',
    bestCombo: 'Best combo',
    worstError: 'Worst error',
    bestError: 'Best error',
    averageError: 'Avg. error',
    averageSpeed: 'Avg. speed',
    highscoreBeaten: 'Times high-score beaten',
    boxesLost: 'Blocks fallen off',
    timesPlayed: 'Games played',
    bestScorePercent: 'Best score/size ratio',
    timePlayed: 'Played for',
  }[key];
}

function formatValue(key, value) {
  switch (key) {
    case 'bestError':
    case 'worstError':
    case 'averageError':
      return `${(value * 100).toFixed(2)}%`;
    case 'averageSpeed':
      return `${value.toFixed(2)} blocks/min`;
    case 'bestScorePercent':
      return `${(value * 100).toFixed(1)}%`;
    case 'timePlayed':
      return formatTime(value);
    default:
      if (typeof value === 'number') {
        return value.toLocaleString();
      }
      return value;
  }
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return hours
    ? `${hours}h ${minutes}m ${seconds}s`
    : minutes
    ? `${minutes}m ${seconds}s`
    : `${seconds}s`;
} 