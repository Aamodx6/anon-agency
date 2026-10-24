import fs from 'fs';

const code = `'use client';

import React, { useRef, useEffect } from 'react';

interface GooeyThumbProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const VERTEX_SHADER = \`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAGMENT_SHADER = \`
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uProgress;
uniform float uTime;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  float ar = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * ar, vUv.y);
  vec2 m = vec2(uMouse.x * ar, uMouse.y);

  float d = distance(p, m) / length(vec2(ar, 1.0));
  float goo = sin(clamp(uProgress, 0.0, 1.0) * PI);
  float n = fbm(p * 3.4 + vec2(uTime * 0.18, uTime * -0.12));

  float edge = uProgress * 1.35 - 0.09 - d + (n - 0.5) * 0.42 * goo;
  float mask = smoothstep(-0.055, 0.055, edge);

  float band = exp(-(edge / 0.17) * (edge / 0.17));
  vec2 dir = normalize(p - m + vec2(1e-4, 1e-4)) / vec2(ar, 1.0);
  vec2 push = dir * band * 0.075 * goo;

  vec4 a = texture2D(uTexA, vUv + push * 0.6);
  vec4 b = texture2D(uTexB, vUv - push);

  gl_FragColor = mix(a, b, mask);
}
\`;

export function GooeyThumb({
  src,
  hoverSrc,
  alt,
  width = 380,
  height = 440,
  className = ''
}: GooeyThumbProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgBaseRef = useRef<HTMLImageElement>(null);
  const imgHoverRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const imgA = imgBaseRef.current;
    const imgB = imgHoverRef.current;
    if (!container || !canvas || !imgA || !imgB || !hoverSrc) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    } catch (e) {
      return;
    }
    if (!gl) return;

    // Compile shaders
    const createShader = (type: number, src: string) => {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fsShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fsShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fsShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uProgress = gl.getUniformLocation(prog, 'uProgress');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uTexA = gl.getUniformLocation(prog, 'uTexA');
    const uTexB = gl.getUniformLocation(prog, 'uTexB');

    // Create Textures
    const createTex = (img: HTMLImageElement, unit: number) => {
      const tex = gl!.createTexture();
      gl!.activeTexture(gl!.TEXTURE0 + unit);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img);
      return tex;
    };

    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;

    const loadTextures = () => {
      if (imgA.complete && imgB.complete && imgA.naturalWidth && imgB.naturalWidth) {
        texA = createTex(imgA, 0);
        texB = createTex(imgB, 1);
        gl!.uniform1i(uTexA, 0);
        gl!.uniform1i(uTexB, 1);
      }
    };

    if (imgA.complete && imgB.complete) {
      loadTextures();
    } else {
      imgA.onload = loadTextures;
      imgB.onload = loadTextures;
    }

    let progress = 0;
    let targetProgress = 0;
    let mouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];
    let animId: number;
    let startTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      targetMouse = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    };

    const onMouseEnter = (e: MouseEvent) => {
      targetProgress = 1;
      canvas.style.opacity = '1';
      onMouseMove(e);
    };

    const onMouseLeave = () => {
      targetProgress = 0;
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      // Lerp progress and mouse
      progress += (targetProgress - progress) * 0.1;
      mouse[0] += (targetMouse[0] - mouse[0]) * 0.1;
      mouse[1] += (targetMouse[1] - mouse[1]) * 0.1;

      if (!gl || !texA || !texB) return;

      const w = container.clientWidth || 380;
      const h = container.clientHeight || 440;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }

      gl.useProgram(prog);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uProgress, progress);
      gl.uniform1f(uTime, (now - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (progress < 0.001 && targetProgress === 0) {
        canvas.style.opacity = '0';
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [src, hoverSrc]);

  return (
    <span ref={containerRef} className={\`GooeyThumb-module__jKjXxa__media \${className}\`}>
      <img
        ref={imgBaseRef}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        className="GooeyThumb-module__jKjXxa__img GooeyThumb-module__jKjXxa__base"
        src={src}
      />
      {hoverSrc && (
        <img
          ref={imgHoverRef}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={width}
          height={height}
          className="GooeyThumb-module__jKjXxa__img GooeyThumb-module__jKjXxa__hover"
          src={hoverSrc}
        />
      )}
      <canvas
        ref={canvasRef}
        className="GooeyThumb-module__jKjXxa__canvas"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 2
        }}
      />
    </span>
  );
}
`;

fs.writeFileSync('components/GooeyThumb.tsx', code, 'utf8');
console.log('GooeyThumb.tsx created successfully!');
