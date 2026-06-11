import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function HeroBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh' }}>
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1.5}
        fov={50}
      >
        <ShaderGradient
          animate="on"
          brightness={1}
          cAzimuthAngle={180}
          cDistance={4.51}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#ee00d6"
          color2="#6bedfe"
          color3="#863ee4"
          envPreset="lobby"
          grain="on"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="plane"
          uAmplitude={1}
          uDensity={1.5}
          uFrequency={5.5}
          uSpeed={0.3}
          uStrength={3.8}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}