import { useMemo, useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, Vector3 } from 'three'

const vertexShader = `
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vPos = position;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = normalize(cameraPosition - worldPosition.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`

const fragmentShader = `
precision highp float;

uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uStopAB;
uniform float uStopBC;
uniform float uSoftness;
uniform vec3 uDirection;
uniform float uRange;
uniform vec3 uFresnelColor;
uniform float uFresnelAmt;
uniform float uFresnelOffset;
uniform float uFresnelIntensity;
uniform float uFresnelAlpha;
uniform float uFresnelOnly;
uniform vec3 uEmissiveColor;
uniform float uEmissiveStrength;

varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;

float fresnelFunc(float amount, float offset, vec3 normal, vec3 viewDir) {
  return offset + (1.0 - offset) * pow(1.0 - dot(normal, viewDir), amount);
}

void main() {
  vec3 dir = normalize(uDirection);
  float t = dot(vPos, dir) / uRange + 0.5;
  t = clamp(t, 0.0, 1.0);

  float wAB = smoothstep(uStopAB - uSoftness, uStopAB + uSoftness, t);
  float wBC = smoothstep(uStopBC - uSoftness, uStopBC + uSoftness, t);
  vec3 baseCol = mix(uColorA, uColorB, wAB);
  baseCol = mix(baseCol, uColorC, wBC);

  float fresnel = fresnelFunc(uFresnelAmt, uFresnelOffset, normalize(vNormal), normalize(vView));
  vec3 fresCol = (uFresnelColor * fresnel) * uFresnelIntensity;

  vec3 finalColor = mix(baseCol, fresCol, fresnel * uFresnelAlpha);
  finalColor += uEmissiveColor * uEmissiveStrength * fresnel;
  float alpha = mix(1.0, fresnel, uFresnelOnly);

  gl_FragColor = vec4(finalColor, alpha);
}
`

const IridescenceMaterial = shaderMaterial(
  {
    uColorA: new Color(1, 0.85, 0.86),
    uColorB: new Color(0.68, 0.91, 0.72),
    uColorC: new Color(0.96, 0.8, 1.0),
    uStopAB: 0.4,
    uStopBC: 0.8,
    uSoftness: 0.08,
    uDirection: new Vector3(1, 0.2, 0),
    uRange: 2.4,
    uFresnelColor: new Color('#02feff'),
    uFresnelAmt: 1.5,
    uFresnelOffset: 0.05,
    uFresnelIntensity: 1.5,
    uFresnelAlpha: 1.0,
    uFresnelOnly: 0.0,
    uEmissiveColor: new Color('#ffffff'),
    uEmissiveStrength: 0.0,
  },
  vertexShader,
  fragmentShader
)

extend({ IridescenceMaterial })

export function Iridescence({
  colorA = [1, 0.85, 0.86],
  colorB = [0.68, 0.91, 0.72],
  colorC = [0.96, 0.8, 1.0],
  stopAB = 0.4,
  stopBC = 0.8,
  softness = 0.08,
  direction = [1, 0.2, 0],
  range = 2.4,
  fresnelColor = '#02feff',
  fresnelAmount = 1.5,
  fresnelOffset = 0.05,
  fresnelIntensity = 1.5,
  fresnelAlpha = 1.0,
  fresnelOnly = false,
  emissiveColor = '#ffffff',
  emissiveStrength = 0.0,
  ...props
}) {
  const materialRef = useRef()

  const colorValueA = useMemo(() => new Color(...colorA), [colorA])
  const colorValueB = useMemo(() => new Color(...colorB), [colorB])
  const colorValueC = useMemo(() => new Color(...colorC), [colorC])
  const dirValue = useMemo(
    () => new Vector3(...direction).normalize(),
    [direction]
  )
  const fresColor = useMemo(() => new Color(fresnelColor), [fresnelColor])
  const emissiveColorValue = useMemo(
    () => new Color(emissiveColor),
    [emissiveColor]
  )

  return (
    <iridescenceMaterial
      ref={materialRef}
      uColorA={colorValueA}
      uColorB={colorValueB}
      uColorC={colorValueC}
      uStopAB={stopAB}
      uStopBC={stopBC}
      uSoftness={softness}
      uDirection={dirValue}
      uRange={range}
      uFresnelColor={fresColor}
      uFresnelAmt={fresnelAmount}
      uFresnelOffset={fresnelOffset}
      uFresnelIntensity={fresnelIntensity}
      uFresnelAlpha={fresnelAlpha}
      uFresnelOnly={fresnelOnly ? 1.0 : 0.0}
      uEmissiveColor={emissiveColorValue}
      uEmissiveStrength={emissiveStrength}
      {...props}
    />
  )
}
