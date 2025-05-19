import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function MovingTilePosition({ getPosition }) {
  const ref = useRef({});

  useFrame(() => {
    if (getPosition) {
      ref.current.text = JSON.stringify(getPosition());
    }
  });

  return null;
} 