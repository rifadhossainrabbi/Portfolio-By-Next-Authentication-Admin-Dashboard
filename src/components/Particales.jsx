'use client';
import { useEffect, useRef } from 'react';

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const Particles = ({
  particleCount = 300,
  particleSpread = 12,
  speed = 0.1,
  particleColors = ['#22d3ee', '#3b82f6', '#ffffff'],
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = true,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = '',
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load OGL dynamically to prevent SSR issues
    let renderer, gl, camera, mesh, program, animationFrameId;

    const initOGL = async () => {
      const { Renderer, Camera, Geometry, Program, Mesh } = await import('ogl');

      renderer = new Renderer({
        dpr: window.devicePixelRatio || 1,
        alpha: true,
        depth: false,
      });
      gl = renderer.gl;
      container.appendChild(gl.canvas);
      gl.clearColor(0, 0, 0, 0);

      camera = new Camera(gl, { fov: 15 });
      camera.position.set(0, 0, cameraDistance);

      const resize = () => {
        if (!container) return;
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      };
      window.addEventListener('resize', resize);
      resize();

      const hexToRgb = hex => {
        const int = parseInt(hex.replace('#', ''), 16);
        return [
          ((int >> 16) & 255) / 255,
          ((int >> 8) & 255) / 255,
          (int & 255) / 255,
        ];
      };

      const positions = new Float32Array(particleCount * 3);
      const randoms = new Float32Array(particleCount * 4);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions.set(
          [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
          i * 3,
        );
        randoms.set(
          [Math.random(), Math.random(), Math.random(), Math.random()],
          i * 4,
        );
        const col = hexToRgb(particleColors[i % particleColors.length]);
        colors.set(col, i * 3);
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors },
      });

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpread: { value: particleSpread },
          uBaseSize: { value: particleBaseSize },
          uSizeRandomness: { value: sizeRandomness },
          uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        },
        transparent: true,
        depthTest: false,
      });

      mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

      const handleMouseMove = e => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      if (moveParticlesOnHover)
        window.addEventListener('mousemove', handleMouseMove);

      let lastTime = performance.now();
      let elapsed = 0;
      const update = t => {
        animationFrameId = requestAnimationFrame(update);
        const delta = t - lastTime;
        lastTime = t;
        elapsed += delta * speed;

        program.uniforms.uTime.value = elapsed * 0.001;
        if (moveParticlesOnHover) {
          mesh.position.x = -mouseRef.current.x * particleHoverFactor;
          mesh.position.y = -mouseRef.current.y * particleHoverFactor;
        }
        if (!disableRotation) {
          mesh.rotation.y += 0.005 * speed;
        }
        renderer.render({ scene: mesh, camera });
      };
      animationFrameId = requestAnimationFrame(update);
    };

    initOGL();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', () => {});
      if (renderer && container.contains(gl.canvas))
        container.removeChild(gl.canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${className}`} />
  );
};

export default Particles;
