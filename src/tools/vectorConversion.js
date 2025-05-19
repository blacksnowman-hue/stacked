import { Vector2, Vector3 } from 'three';

export function axis2ToAxis3(axis) {
  return axis === 'y' ? 'z' : 'x';
}

export function toVector2(v) {
  return new Vector2(v.x, v.z);
}
