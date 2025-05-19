import { useRef } from 'react';

//* This feature needs a refactor, since some properties can be reused from `features/combos.ts` logic, and the performance could use an improve too.

const animatedGrowingTileConfig = {
  duration: 400,
};

export function getAnimatedTileAddedPosition(
  addedPositionSign,
  sizeDifference,
  addedSize
) {
  if (!sizeDifference) {
    return {
      x: 0,
      y: 0,
    };
  }

  const invertedAddedPositionSign = addedPositionSign ? addedPositionSign * -1 : NaN;

  const x = (sizeDifference.x / 2 - addedSize.current.x / 2) * invertedAddedPositionSign;
  const y = (sizeDifference.y / 2 - addedSize.current.y / 2) * invertedAddedPositionSign;

  return {
    x,
    y,
  };
}

export function getAnimatedTileSize(
  shouldAnimate,
  prevSize,
  addedSize
) {
  if (!shouldAnimate || !prevSize) return undefined;

  return {
    x: prevSize.x + addedSize.current.x,
    y: prevSize.y + addedSize.current.y,
  };
}

export function useTileGrowingAnimation({
  createdAt,
  prevSize,
  size,
  addedPositionSign,
}) {
  const addedSize = useRef({
    x: 0,
    y: 0,
  });

  let shouldAnimate = false;
  let sizeDifference = undefined;
  if (addedPositionSign === 0 || addedPositionSign === undefined) {
    return {
      shouldAnimate,
      addedSize,
      sizeDifference,
    };
  }
  if (createdAt) {
    const elapsed = Date.now() - createdAt;
    if (elapsed < animatedGrowingTileConfig.duration) {
      shouldAnimate = true;
      if (shouldAnimate && prevSize) {
        sizeDifference = size.clone().sub(prevSize);
        const isSizeDifferencePositive = sizeDifference.x > 0 || sizeDifference.y > 0;
        if (isSizeDifferencePositive) {
          shouldAnimate = true;
          const howMuchOfTheAnimationPassed = elapsed / animatedGrowingTileConfig.duration;
          const axisThatGrew = sizeDifference.x > 0 ? 'x' : 'y';
          addedSize.current[axisThatGrew] = howMuchOfTheAnimationPassed * sizeDifference.length();
        } else {
          shouldAnimate = false;
        }
      }
    } else {
      shouldAnimate = false;
    }
  }

  return {
    shouldAnimate,
    addedSize,
    sizeDifference,
  };
} 