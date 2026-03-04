uniform float progress;
uniform float uMeshWidth;
uniform float uMeshHeight;
uniform float uProgressMul;
uniform float uRangeMul;
uniform float uSmoothCenter;
uniform float uAngleAmp;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vec3 pos = position;

  float meshWidth = max(uMeshWidth, 0.0001);
  float meshHeight = max(uMeshHeight, 0.0001);
  float halfDiagonal = 0.5 * length(vec2(meshWidth, meshHeight));
  float progressY = progress * uProgressMul;

  pos.y += progressY;

  // Spherical-cap bend:
  // z = R - sqrt(R^2 - x^2 - y^2)
  // Radius multiplier controls how "wide" the dome is.
  float radiusMultiplier = max(uRangeMul, 1.0001);
  float radius = max(halfDiagonal * radiusMultiplier, halfDiagonal + 0.0001);

  vec2 sphereDomain = vec2(pos.x, pos.y - uSmoothCenter);
  float radialSq = dot(sphereDomain, sphereDomain);
  float maxRadius = radius - 0.0001;
  float clampedRadialSq = min(radialSq, maxRadius * maxRadius);
  float sphereCap = radius - sqrt(max((radius * radius) - clampedRadialSq, 0.0));

  pos.z += sphereCap * uAngleAmp;

  vec3 vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  vPosition = vWorldPosition;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}
