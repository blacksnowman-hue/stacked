import { useFrame } from '@react-three/fiber';
// import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';

import { useTheme } from '../contexts/ThemeContext';
import { config } from '../shared/constants';

export function MovingTile({
  index,
  movingTileMeshRef,
  previousTile,
  autoplay,
  lastCube,
  speedOfMovingTile,
}) {
  const { theme } = useTheme();

  // const { autoplayError } = useControls({
  //   /**
  //    * 0 — no error, will score more points than a human can wait to count.
  //    * 25 - will score ~8 points.
  //    * 50 - will score ~3 points.
  //    */
  //   autoplayError: {
  //     value: 0,
  //     step: 1,
  //   },
  // });
  const defaultTileSize = 100;
  const startOffset = defaultTileSize + defaultTileSize / 4;
  const [direction, setDirection] = useState(-1);

  useFrame((state, delta) => {
    if (!movingTileMeshRef.current) return;

    const mesh = movingTileMeshRef.current;

    const axis = index % 2 === 0 ? 'x' : 'z';
    const addedPosition = delta * speedOfMovingTile;
    mesh.position[axis] += addedPosition * direction;

    if (autoplay) {
      const previousTilePosition = lastCube?.position ?? previousTile.position;

      const autoplayEpsilon = Math.round(addedPosition) / 2 + 0.1;

      if (
        nearlyEqual(
          previousTilePosition[axis],
          mesh.position[axis],
          autoplayEpsilon,
        )
      ) {
        state.gl.domElement.click();
      }
    }

    if (Math.abs(mesh.position[axis]) >= startOffset) {
      setDirection((prev) => -prev);
      // Is this `mesh.position.clamp` call necessary? Seems to work the same way without it.
      // UPD: it is necessary, check on higher `speedOfMovingTile` like 2000.
      mesh.position.clamp(
        new Vector3(-startOffset, Number.NEGATIVE_INFINITY, -startOffset),
        new Vector3(startOffset, Number.POSITIVE_INFINITY, startOffset),
      );
    }
  });

  useEffect(() => {
    if (!movingTileMeshRef.current) return;

    const mesh = movingTileMeshRef.current;

    // Resize
    mesh.position.x = previousTile.position.x;
    mesh.position.z = previousTile.position.z;
    // End Resize.

    mesh.position.y = index * config.tileHeight;
    const even = index % 2 === 0;
    mesh.position.set(
      even ? startOffset : mesh.position.x,
      index * config.tileHeight,
      !even ? startOffset : mesh.position.z,
    );
  }, [index, movingTileMeshRef, previousTile.position.x, previousTile.position.z, startOffset]);

  return (
    <mesh ref={movingTileMeshRef} castShadow>
      <boxGeometry args={[previousTile.size.x, config.tileHeight, previousTile.size.y]} />
      <meshPhongMaterial color={theme.tile(index)} />
    </mesh>
  );
}

function nearlyEqual(a, b, epsilon) {
  const diff = Math.abs(a - b);

  return diff < epsilon;
} 