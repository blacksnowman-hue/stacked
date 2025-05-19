import { Plane } from '@react-three/drei';

export function PlaneBorder({
  children,
  borderWidth,
  ...props
}) {
  const positionAsTuple = props.position;

  const size = props.args;
  const width = size?.[0];
  const height = size?.[1];

  const argsForLeftAndRightPlanes = [
    width + borderWidth * 2,
    borderWidth,
  ];
  const argsForTopAndBottomPlanes = [borderWidth, height];

  /** Maybe it's actually right plane, not sure. */
  const positionZOfLeftPlane = height / 2 + borderWidth / 2;
  /** Maybe it's actually bottom plane, not sure. */
  const positionXOfTopPlane = width / 2 + borderWidth / 2;

  return (
    <group position={positionAsTuple}>
      <Plane {...props} args={argsForLeftAndRightPlanes} position={[0, 0, positionZOfLeftPlane]}>
        {children}
      </Plane>
      <Plane
        {...props}
        args={argsForLeftAndRightPlanes}
        position={[0, 0, positionZOfLeftPlane * -1]}
      >
        {children}
      </Plane>
      <Plane {...props} args={argsForTopAndBottomPlanes} position={[positionXOfTopPlane, 0, 0]}>
        {children}
      </Plane>
      <Plane
        {...props}
        args={argsForTopAndBottomPlanes}
        position={[positionXOfTopPlane * -1, 0, 0]}
      >
        {children}
      </Plane>
    </group>
  );
} 