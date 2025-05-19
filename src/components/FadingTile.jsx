import { useBox } from '@react-three/cannon';
import { Mesh } from 'three';

import { useTheme } from '../contexts/ThemeContext';
import { config } from '../shared/constants';

const fallingTileConfig = {
  mass: 10,
};

export function FadingTiles({ fadingTiles }) {
  return (
    <>
      {fadingTiles.map((fadingTile) => (
        <ReactFadingTile key={fadingTile.index} {...fadingTile} />
      ))}
    </>
  );
}

/** @todo rename to FallingTile, remove "React" from name. */
function ReactFadingTile({ position, size, index }) {
  const { theme } = useTheme();

  /** @todo exclude from here, duplicated value. */
  const height = config.tileHeight;

  const boxArgs = [size.x, height, size.y];

  const [ref] = useBox(() => ({
    mass: fallingTileConfig.mass,
    position: [position.x, index * height, position.z],
    args: boxArgs,
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <meshPhongMaterial color={theme.tile(index)} />
      <boxGeometry args={boxArgs} />
    </mesh>
  );
} 