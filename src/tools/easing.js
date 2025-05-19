function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function easeInOutSineEaseOutCirc(x) {
  return easeInOutSine(easeOutCirc(x));
} 