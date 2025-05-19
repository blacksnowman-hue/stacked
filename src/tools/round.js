export function round(value, precision = 1) {
  const multiplier = 10 ** (precision || 0);
  return Math.round(value * multiplier) / multiplier;
} 