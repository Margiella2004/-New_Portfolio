uniform sampler2D texture1;
uniform float uUseMask;
uniform float uMaskStart;
uniform float uMaskEnd;
uniform float uPlaneAspect;
uniform float uImageAspect;
uniform float uImageOpacity;
uniform float uVisibilityOpacity;
uniform vec3 uBgColor;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv;

  float planeAspect = max(uPlaneAspect, 0.0001);
  float imageAspect = max(uImageAspect, 0.0001);

  if (planeAspect > imageAspect) {
    float scale = imageAspect / planeAspect;
    uv.y = ((uv.y - 0.5) * scale) + 0.5;
  } else {
    float scale = planeAspect / imageAspect;
    uv.x = ((uv.x - 0.5) * scale) + 0.5;
  }

  vec4 tex = texture2D(texture1, uv);
  vec3 color = clamp(tex.rgb, 0.0, 1.0);
  float imageOpacity = clamp(uImageOpacity, 0.0, 1.0);
  vec3 composedColor = mix(uBgColor, color, imageOpacity);

  float a = 1.0;
  if (uUseMask > 0.5) {
    a = smoothstep(uMaskStart, uMaskEnd, vPosition.z);
    if (a < 0.5) discard;
  }
  gl_FragColor = vec4(composedColor, clamp(uVisibilityOpacity, 0.0, 1.0));
}
