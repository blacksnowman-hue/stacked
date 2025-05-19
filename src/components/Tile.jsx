import { useBox } from '@react-three/cannon';
import { useMemo, useState } from 'react';
import { Mesh } from 'three';

import { useTheme } from '../contexts/ThemeContext';
import {
  getAnimatedTileAddedPosition,
  getAnimatedTileSize,
  useTileGrowingAnimation,
} from '../features/animatedGrowingTile';
import { config } from '../shared/constants';

/** @todo remove "React" from name. */
export function ReactTile({
  position,
  size,
  index,
  createdAt,
  prevSize,
  addedPositionSign,
}) {
  if (process.env.NODE_ENV !== 'production') {
    // I know for sure that NODE_ENV is never going to change during one run of the game script, so it's OK to have a conditional hook:
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRunDevOnlyTestsForTile({ position, size, index });
  }

  const { theme } = useTheme();

  const { shouldAnimate, addedSize, sizeDifference } = useTileGrowingAnimation({
    createdAt,
    prevSize,
    size,
    addedPositionSign,
  });

  const animatedTileSize = getAnimatedTileSize(shouldAnimate, prevSize, addedSize);

  const boxArgs = [
    animatedTileSize?.x ?? size.x,
    config.tileHeight,
    animatedTileSize?.y ?? size.y,
  ];

  const animatedTileAddedPosition = useMemo(
    () => getAnimatedTileAddedPosition(addedPositionSign, sizeDifference, addedSize),
    [addedPositionSign, addedSize, sizeDifference],
  );

  const [ref] = useBox(
    () => ({
      position: [
        position.x + animatedTileAddedPosition.x,
        index * config.tileHeight,
        position.z + animatedTileAddedPosition.y,
      ],
      type: 'Static',
      args: boxArgs,
    }),
    undefined,
    [animatedTileAddedPosition], // `position` can be omitted here, since it's static, but it better be included just to be safe.
  );

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <meshPhongMaterial color={theme.tile(index)} />
      <boxGeometry args={boxArgs} />
    </mesh>
  );
}

/** @todo exclude tests into a different file. */
function useRunDevOnlyTestsForTile({ index, ...tileProps }) {
  const [testsAlreadyRan, setTestsAlreadyRan] = useState({
    testTilePosition: false,
  });

  if (testsAlreadyRan['testTilePosition']) return;
  try {
    testTilePosition(tileProps);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Warning at Tile ${index}`, error.message, error.cause);
    }
    setTestsAlreadyRan((prev) => ({ ...prev, testTilePosition: true }));
  }
}

/** This test is necessary because the new "Tile Growing" feature (a.k.a. "combo") makes a perfect example of position miscalculation. */
function testTilePosition({ size, position }) {
  if (size.x === 100 && size.y === 100) {
    if (position.x !== 0 || position.z !== 0) {
      throw new Error('Tile size and position mismatch', {
        cause: {
          expects: 'tile position to be 0 when size is 100',
          position,
        },
      });
    }
  }
} 