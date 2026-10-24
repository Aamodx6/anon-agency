'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Matter from 'matter-js';

// The 10 palette colors from the reference website
const COIN_COLORS = [
  '#ffffff', // 0: White
  '#e3e5e7', // 1: Light silver
  '#c3c8cc', // 2: Medium silver
  '#8b9298', // 3: Slate grey
  '#5d646b', // 4: Dark slate
  '#161d25', // 5: Charcoal / ink
  '#ffd9e2', // 6: Blush pink
  '#ffb0c5', // 7: Light pink
  '#ff6f95', // 8: Vibrant pink
  '#ff2d5e', // 9: Neon coral
];

interface CoinItem {
  body: Matter.Body;
  meshGroup: THREE.Group;
  shadowMesh: THREE.Mesh;
  colorHex: string;
  isDragging?: boolean;
}

export function HeroCoins() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const hero = host.closest<HTMLElement>('section') || host.parentElement;
    if (!hero) return;

    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    // 1. Three.js Scene, Camera, Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.88;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    let width = hero.clientWidth;
    let height = hero.clientHeight;
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Perspective camera with FOV 28 matching screen coordinates
    const camera = new THREE.PerspectiveCamera(28, width / height, 10, 10000);
    const cameraZ = height / 2 / Math.tan(THREE.MathUtils.degToRad(14));
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);

    // Studio Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(0.85 * width, 0.25 * height, 0.4 * width);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.bias = -0.001;
    dirLight.shadow.normalBias = 0.8;
    dirLight.shadow.radius = 2.5;

    const d = width * 0.7;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = width * 3;
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffa0b5, 0.85);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // 2. Drop Shadow Texture & Material
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 16, 64, 64, 64);
    grad.addColorStop(0, 'rgba(30, 0, 8, 0.62)');
    grad.addColorStop(0.5, 'rgba(30, 0, 8, 0.28)');
    grad.addColorStop(1, 'rgba(30, 0, 8, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const shadowGeo = new THREE.PlaneGeometry(1, 1);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });

    // 3. Procedural 3D Coin Cylinder Geometry with Chamfer & Engraved 'a.'
    const coinRadius = Math.round(Math.min(Math.max(width * 0.024, 26), 40));
    const coinThickness = coinRadius * 0.32;

    // Outer beveled lathe geometry for the tactile rim
    const profilePoints: [number, number][] = [];
    const steps = 6;
    const cornerR = coinThickness * 0.28;
    const innerR = coinRadius - cornerR;
    const halfH = coinThickness / 2;

    // Bottom flat to corner
    profilePoints.push([0, -halfH]);
    profilePoints.push([innerR, -halfH]);
    for (let i = 0; i <= steps; i++) {
      const a = -Math.PI / 2 + (Math.PI / 2) * (i / steps);
      profilePoints.push([innerR + Math.cos(a) * cornerR, -halfH + cornerR + Math.sin(a) * cornerR]);
    }
    // Top corner to top flat
    for (let i = 0; i <= steps; i++) {
      const a = (Math.PI / 2) * (i / steps);
      profilePoints.push([innerR + Math.cos(a) * cornerR, halfH - cornerR + Math.sin(a) * cornerR]);
    }
    profilePoints.push([innerR * 0.88, halfH]); // Recessed inner rim
    profilePoints.push([innerR * 0.88, halfH - coinThickness * 0.08]);
    profilePoints.push([0, halfH - coinThickness * 0.08]);

    const latheGeo = new THREE.LatheGeometry(
      profilePoints.map(([x, y]) => new THREE.Vector2(x, y)),
      36
    );
    latheGeo.rotateX(Math.PI / 2);

    // Front Face Canvas Texture with the crisp engraved 'a.'
    const createFaceTexture = (baseColor: string) => {
      const fc = document.createElement('canvas');
      fc.width = fc.height = 256;
      const ctx = fc.getContext('2d')!;

      // Background fill
      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.arc(128, 128, 126, 0, Math.PI * 2);
      ctx.fill();

      // Subtle recessed rim ring
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Inner bevel highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(128, 128, 114, -Math.PI * 0.7, Math.PI * 0.3);
      ctx.stroke();

      // Embossed letter 'a.' in Syne bold
      ctx.font = '800 134px "Syne", -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const isLight =
        baseColor === '#ffffff' ||
        baseColor === '#e3e5e7' ||
        baseColor === '#c3c8cc' ||
        baseColor === '#ffd9e2' ||
        baseColor === '#ffb0c5';

      // Engraved inner shadow
      ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.28)' : 'rgba(0, 0, 0, 0.45)';
      ctx.fillText('a.', 129, 131);

      // Engraved highlight rim
      ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fillText('a.', 127, 127);

      // Main engraved fill
      ctx.fillStyle = isLight ? 'rgba(30, 20, 25, 0.75)' : 'rgba(255, 255, 255, 0.88)';
      ctx.fillText('a.', 128, 129);

      const tex = new THREE.CanvasTexture(fc);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const faceGeo = new THREE.CircleGeometry(coinRadius * 0.88, 32);
    faceGeo.translate(0, 0, halfH - coinThickness * 0.07);

    // 4. Matter.js 2D Physics Engine Setup
    const engine = Matter.Engine.create({
      enableSleeping: false,
      positionIterations: 12,
      velocityIterations: 10,
    });
    engine.gravity.y = 1.35;

    // Boundaries
    const updateWalls = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;

      const meta = hero.querySelector<HTMLElement>('[data-coins-floor]');
      const floorRect = meta ? meta.getBoundingClientRect() : null;
      const heroRect = hero.getBoundingClientRect();
      const floorY = floorRect ? floorRect.top - heroRect.top : h - 65;

      // Obstacles from text [data-coins-above]
      const textObstacles: Matter.Body[] = [];
      const aboveEls = hero.querySelectorAll<HTMLElement>('[data-coins-above]');
      aboveEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 2 && r.height > 2) {
          const ox = r.left - heroRect.left + r.width / 2;
          const oy = r.top - heroRect.top + r.height / 2;
          const obstacle = Matter.Bodies.rectangle(ox, oy, r.width, r.height, {
            isStatic: true,
            friction: 0.35,
            restitution: 0.15,
          });
          textObstacles.push(obstacle);
        }
      });

      const wallOpts = { isStatic: true, friction: 0.4, restitution: 0.2 };
      const walls = [
        // Left
        Matter.Bodies.rectangle(-100, h / 2, 200, h * 2, wallOpts),
        // Right
        Matter.Bodies.rectangle(w + 100, h / 2, 200, h * 2, wallOpts),
        // Top
        Matter.Bodies.rectangle(w / 2, -150, w * 2, 300, wallOpts),
        // Floor line
        Matter.Bodies.rectangle(w / 2, floorY + 150, w * 2, 300, {
          ...wallOpts,
          restitution: 0.25,
          friction: 0.5,
        }),
      ];

      return { floorY, obstacles: [...walls, ...textObstacles] };
    };

    let { floorY, obstacles } = updateWalls();
    Matter.Composite.add(engine.world, obstacles);

    // 5. Coin Management
    const coins: CoinItem[] = [];
    let colorIndex = 0;

    const spawnCoin = (startX: number, startY: number, vx = 0, vy = 0) => {
      const color = COIN_COLORS[colorIndex % COIN_COLORS.length];
      colorIndex++;

      // Physical Matter body
      const body = Matter.Bodies.circle(startX, startY, coinRadius, {
        restitution: 0.22,
        friction: 0.06,
        frictionStatic: 0.12,
        frictionAir: 0.015,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.4,
      });
      Matter.Body.setVelocity(body, { x: vx, y: vy });
      Matter.Composite.add(engine.world, body);

      // 3D Visual Group
      const group = new THREE.Group();

      // Rim Mesh
      const rimMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0.4,
        metalness: 0.02,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        envMapIntensity: 0.5,
      });
      const rimMesh = new THREE.Mesh(latheGeo, rimMat);
      rimMesh.castShadow = true;
      rimMesh.receiveShadow = true;
      group.add(rimMesh);

      // Front Face Mesh
      const faceTex = createFaceTexture(color);
      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTex,
        roughness: 0.36,
        metalness: 0.02,
      });
      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.castShadow = true;
      faceMesh.receiveShadow = true;
      group.add(faceMesh);

      scene.add(group);

      // Drop shadow mesh
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.scale.set(coinRadius * 2.6, coinRadius * 2.6, 1);
      shadow.renderOrder = -1;
      scene.add(shadow);

      const coinItem: CoinItem = {
        body,
        meshGroup: group,
        shadowMesh: shadow,
        colorHex: color,
      };
      coins.push(coinItem);
      return coinItem;
    };

    // 6. Staggered Launch Sequence
    // Matches reference: once data-intro="done", drop coins into the cluster!
    let spawnTimer: NodeJS.Timeout | null = null;
    let spawnCount = 0;
    const maxCoins = isMobile ? 8 : 16;

    const startCoinDrops = () => {
      // Resting cluster positions centered around right side of floor
      const rightAreaStart = width * (isMobile ? 0.35 : 0.55);
      const rightAreaWidth = width * (isMobile ? 0.58 : 0.38);

      spawnTimer = setInterval(() => {
        if (spawnCount >= maxCoins) {
          if (spawnTimer) clearInterval(spawnTimer);
          return;
        }

        // Cascade from upper right above kicker
        const spawnX = rightAreaStart + (Math.random() * rightAreaWidth);
        const spawnY = -20 - Math.random() * 40;
        const vx = (Math.random() - 0.5) * 4;
        const vy = Math.random() * 3 + 2;

        spawnCoin(spawnX, spawnY, vx, vy);
        spawnCount++;
      }, 310);
    };

    // Watch data-intro attribute on hero
    const checkIntro = () => {
      const intro = hero.getAttribute('data-intro');
      if (intro === 'done') {
        setTimeout(startCoinDrops, 1100);
      } else {
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'attributes' && m.attributeName === 'data-intro') {
              if (hero.getAttribute('data-intro') === 'done') {
                observer.disconnect();
                setTimeout(startCoinDrops, 1100);
              }
            }
          }
        });
        observer.observe(hero, { attributes: true, attributeFilter: ['data-intro'] });
      }
    };
    checkIntro();

    // 7. Interactive Pointer Drag & Toss
    let draggedCoin: CoinItem | null = null;
    let pointerOffset = { x: 0, y: 0 };
    let lastPointer = { x: 0, y: 0, time: performance.now() };
    let pointerVel = { x: 0, y: 0 };

    const getHeroPos = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const p = getHeroPos(e);
      // Check collision with any coin (reverse so top coins picked first)
      for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        const dist = Math.hypot(c.body.position.x - p.x, c.body.position.y - p.y);
        if (dist <= coinRadius * 1.25) {
          draggedCoin = c;
          c.isDragging = true;
          pointerOffset = {
            x: c.body.position.x - p.x,
            y: c.body.position.y - p.y,
          };
          lastPointer = { x: p.x, y: p.y, time: performance.now() };
          pointerVel = { x: 0, y: 0 };
          hero.setPointerCapture?.(e.pointerId);
          hero.style.cursor = 'grabbing';
          break;
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const p = getHeroPos(e);
      const now = performance.now();
      const dt = Math.max(1, now - lastPointer.time);
      pointerVel = {
        x: ((p.x - lastPointer.x) / dt) * 16,
        y: ((p.y - lastPointer.y) / dt) * 16,
      };
      lastPointer = { x: p.x, y: p.y, time: now };

      if (draggedCoin) {
        Matter.Body.setPosition(draggedCoin.body, {
          x: p.x + pointerOffset.x,
          y: p.y + pointerOffset.y,
        });
        Matter.Body.setVelocity(draggedCoin.body, pointerVel);
      } else {
        // Hover state
        const isOver = coins.some(
          (c) => Math.hypot(c.body.position.x - p.x, c.body.position.y - p.y) <= coinRadius * 1.15
        );
        hero.style.cursor = isOver ? 'grab' : '';
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draggedCoin) {
        draggedCoin.isDragging = false;
        Matter.Body.setVelocity(draggedCoin.body, {
          x: Math.max(-25, Math.min(25, pointerVel.x * 1.2)),
          y: Math.max(-25, Math.min(25, pointerVel.y * 1.2)),
        });
        draggedCoin = null;
        hero.style.cursor = '';
        try {
          hero.releasePointerCapture?.(e.pointerId);
        } catch {}
      }
    };

    hero.addEventListener('pointerdown', onPointerDown);
    hero.addEventListener('pointermove', onPointerMove);
    hero.addEventListener('pointerup', onPointerUp);
    hero.addEventListener('pointercancel', onPointerUp);

    // 8. Animation & Render Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(32, now - lastTime);
      lastTime = now;

      // Update Matter physics (60fps step)
      Matter.Engine.update(engine, 1000 / 60);

      // Synchronize 3D meshes with 2D physics coordinates
      // Matter coordinates: (0, 0) is top-left of hero
      // Three.js coordinates: (0, 0, 0) is center of screen
      const halfW = width / 2;
      const halfH = height / 2;

      for (let i = 0; i < coins.length; i++) {
        const c = coins[i];
        const px = c.body.position.x;
        const py = c.body.position.y;
        const angle = c.body.angle;

        // Convert to Three.js world position
        const threeX = px - halfW;
        const threeY = halfH - py;

        c.meshGroup.position.set(threeX, threeY, 0);
        // Tilt slightly towards camera to show 3D face and rim
        c.meshGroup.rotation.set(0.12, 0, -angle);

        // Shadow sits on the floor / background plane
        c.shadowMesh.position.set(threeX, threeY - coinRadius * 0.25, -5);
      }

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = height / 2 / Math.tan(THREE.MathUtils.degToRad(14));
      camera.updateProjectionMatrix();

      // Update physics walls
      Matter.Composite.remove(engine.world, obstacles);
      const res = updateWalls();
      floorY = res.floorY;
      obstacles = res.obstacles;
      Matter.Composite.add(engine.world, obstacles);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      if (spawnTimer) clearInterval(spawnTimer);
      window.removeEventListener('resize', handleResize);
      hero.removeEventListener('pointerdown', onPointerDown);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerup', onPointerUp);
      hero.removeEventListener('pointercancel', onPointerUp);

      Matter.Engine.clear(engine);
      renderer.dispose();
      latheGeo.dispose();
      faceGeo.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="HeroCoins-module__gZVsqG__host"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
