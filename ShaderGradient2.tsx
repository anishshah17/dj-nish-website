import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function HeroBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh' }}>
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={40}
      >
        <ShaderGradient
          animate="on"
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={4.79}
          cPolarAngle={115}
          cameraZoom={1}
          color1="#ee00d6"
          color2="#6bedfe"
          color3="#863ee4"
          envPreset="city"
          grain="off"
          lightType="3d"
          positionX={-0.5}
          positionY={0.1}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={235}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1.2}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={3.3}
          uTime={0.2}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}