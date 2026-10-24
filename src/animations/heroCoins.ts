import * as THREE from 'three';
import Matter from 'matter-js';
import { clampDPR, prefersReducedMotion } from './tokens';

export interface HeroCoinsOptions {
  container: HTMLElement;
  floorSelector?: string;
  aboveSelector?: string;
}

export interface HeroCoinsInstance {
  destroy: () => void;
  toss: () => void;
}

export function initHeroCoins({
  container,
  floorSelector = '[data-coins-floor]',
  aboveSelector = '[data-coins-above]',
}: HeroCoinsOptions): HeroCoinsInstance {
  if (prefersReducedMotion() || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return { destroy: () => {}, toss: () => {} };
  }

  let width = container.clientWidth || 1400;
  let height = container.clientHeight || 860;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 2000);
  camera.position.set(0, 0, 950);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(clampDPR(2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.pointerEvents = 'auto';
  renderer.domElement.style.zIndex = '5';
  container.appendChild(renderer.domElement);

  // 2. Lighting matching reference
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
  dirLight.position.set(220, 480, 520);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 10;
  dirLight.shadow.camera.far = 1600;
  const d = 550;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.bias = -0.0005;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xfff0e2, 0.9);
  fillLight.position.set(-300, -100, 300);
  scene.add(fillLight);

  // 3. Matter.js Engine
  const engine = Matter.Engine.create({
    enableSleeping: false,
    positionIterations: 14,
    velocityIterations: 10,
  });
  engine.gravity.y = 1.05;
  engine.gravity.scale = 0.0016;

  // 4. Coin Geometry & Texture Setup
  const coinRadius = Math.min(width * 0.052, 68);
  const coinThickness = coinRadius * 0.28;
  const coinGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 48);

  function createAnonCoinTexture(): THREE.CanvasTexture {
    const cvs = document.createElement('canvas');
    cvs.width = 512;
    cvs.height = 512;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle = '#f35d3b';
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 240px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('a.', 256, 256);

    const tex = new THREE.CanvasTexture(cvs);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const faceTex = createAnonCoinTexture();

  const faceMat = new THREE.MeshPhysicalMaterial({
    map: faceTex,
    color: 0xf35d3b,
    roughness: 0.42,
    metalness: 0.0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
    side: THREE.DoubleSide,
  });

  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xda4d2c,
    roughness: 0.45,
    metalness: 0.0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
  });

  const coinMats = [rimMat, faceMat, faceMat];

  // Contact shadow texture & plane
  const shadowPlaneGeo = new THREE.PlaneGeometry(coinRadius * 2.8, coinRadius * 2.8);
  function createBlobTexture(): THREE.CanvasTexture {
    const cvs = document.createElement('canvas');
    cvs.width = 128;
    cvs.height = 128;
    const ctx = cvs.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0,0,0,0.5)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(cvs);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
  const blobTex = createBlobTexture();
  const shadowMat = new THREE.MeshBasicMaterial({
    map: blobTex,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });

  // 5. Solid Colliders
  let floorY = height * 0.92;
  const floorEl = container.querySelector(floorSelector);
  if (floorEl) {
    const r = floorEl.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    floorY = r.top - cr.top;
  }

  const floorBody = Matter.Bodies.rectangle(width / 2, floorY + 40, width * 2, 80, {
    isStatic: true,
    friction: 0.4,
    restitution: 0.2,
  });

  const wallL = Matter.Bodies.rectangle(-20, height / 2, 40, height * 2, { isStatic: true });
  const wallR = Matter.Bodies.rectangle(width + 20, height / 2, 40, height * 2, { isStatic: true });

  // Perch ledge obstacle for Coin 1
  const perchX = width * 0.14;
  const perchY = height * 0.28;
  const perchBody = Matter.Bodies.rectangle(perchX, perchY + 30, coinRadius * 2.6, 24, {
    isStatic: true,
    friction: 0.3,
    restitution: 0.2,
  });

  Matter.Composite.add(engine.world, [floorBody, wallL, wallR, perchBody]);

  // 6. Coin Bodies & Meshes
  interface CoinItem {
    body: Matter.Body;
    mesh: THREE.Mesh;
    shadow: THREE.Mesh;
    isPerched: boolean;
  }

  const coins: CoinItem[] = [];

  function addCoin(startX: number, startY: number, isPerched = false): CoinItem {
    const body = Matter.Bodies.circle(startX, startY, coinRadius, {
      restitution: 0.2,
      friction: 0.04,
      frictionStatic: 0.08,
      frictionAir: 0.014,
      slop: 0.02,
      density: 0.0016,
      angle: (Math.random() - 0.5) * 0.4,
    });

    Matter.Composite.add(engine.world, body);

    const mesh = new THREE.Mesh(coinGeo, coinMats);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const shadow = new THREE.Mesh(shadowPlaneGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.renderOrder = -1;
    scene.add(shadow);

    const item: CoinItem = { body, mesh, shadow, isPerched };
    coins.push(item);
    return item;
  }

  // Coin 1: perched on rule ledge
  addCoin(perchX, perchY - 10, true);

  // Coins 2-5: drop sequentially and settle into pyramid
  const clusterCenterX = width * 0.72;
  const offsets = [-coinRadius * 1.8, -coinRadius * 0.6, coinRadius * 0.6, coinRadius * 1.8];

  offsets.forEach((ox, i) => {
    setTimeout(() => {
      addCoin(clusterCenterX + ox + (Math.random() - 0.5) * 20, -coinRadius - i * 40, false);
    }, 400 + i * 180);
  });

  // 7. Interactive Drag / Toss
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let draggedCoin: CoinItem | null = null;
  let dragOffset = { x: 0, y: 0 };
  let lastPos = { x: 0, y: 0 };
  let vel = { x: 0, y: 0 };

  const onPointerDown = (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const meshes = coins.map((c) => c.mesh);
    const hits = raycaster.intersectObjects(meshes);

    if (hits.length > 0) {
      const hitMesh = hits[0].object as THREE.Mesh;
      const found = coins.find((c) => c.mesh === hitMesh);
      if (found) {
        draggedCoin = found;
        dragOffset = {
          x: found.body.position.x - (e.clientX - rect.left),
          y: found.body.position.y - (e.clientY - rect.top),
        };
        lastPos = { x: e.clientX, y: e.clientY };
        Matter.Body.setStatic(found.body, true);
      }
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!draggedCoin) return;
    const rect = renderer.domElement.getBoundingClientRect();
    const targetX = e.clientX - rect.left + dragOffset.x;
    const targetY = e.clientY - rect.top + dragOffset.y;

    vel.x = e.clientX - lastPos.x;
    vel.y = e.clientY - lastPos.y;
    lastPos = { x: e.clientX, y: e.clientY };

    Matter.Body.setPosition(draggedCoin.body, { x: targetX, y: targetY });
  };

  const onPointerUp = () => {
    if (draggedCoin) {
      Matter.Body.setStatic(draggedCoin.body, false);
      Matter.Body.setVelocity(draggedCoin.body, {
        x: Math.max(-25, Math.min(25, vel.x * 0.7)),
        y: Math.max(-25, Math.min(25, vel.y * 0.7)),
      });
      draggedCoin = null;
    }
  };

  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // 8. Animation Loop
  let animId = 0;
  let lastTime = performance.now();

  function animate(now: number) {
    animId = requestAnimationFrame(animate);
    const delta = Math.min(now - lastTime, 32);
    lastTime = now;

    Matter.Engine.update(engine, delta);

    // Apply gentle home pyramid attraction force for ground cluster
    for (const c of coins) {
      if (!c.isPerched && !draggedCoin) {
        const dx = clusterCenterX - c.body.position.x;
        if (Math.abs(dx) > coinRadius * 0.5) {
          Matter.Body.applyForce(c.body, c.body.position, {
            x: Math.sign(dx) * c.body.mass * 0.00012,
            y: 0,
          });
        }
      }

      // Sync 3D Three.js mesh with Matter body
      // Coordinate transform: 2D (0..w, 0..h) -> 3D (-w/2..w/2, h/2..-h/2)
      const x3d = c.body.position.x - width / 2;
      const y3d = height / 2 - c.body.position.y;

      c.mesh.position.set(x3d, y3d, 0);
      c.mesh.rotation.z = -c.body.angle;
      c.mesh.rotation.x = Math.PI / 2 + Math.sin(c.body.angle * 1.5) * 0.15;
      c.mesh.rotation.y = Math.cos(c.body.angle * 1.5) * 0.15;

      // Drop shadow contact plane
      c.shadow.position.set(x3d, y3d - coinRadius * 0.88, -2);
      const speed = Matter.Vector.magnitude(c.body.velocity);
      (c.shadow.material as THREE.MeshBasicMaterial).opacity = Math.max(0.2, 0.65 - speed * 0.02);
    }

    renderer.render(scene, camera);
  }

  animId = requestAnimationFrame(animate);

  const onResize = () => {
    width = container.clientWidth || 1400;
    height = container.clientHeight || 860;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(clampDPR(2));

    Matter.Body.setPosition(floorBody, { x: width / 2, y: floorY + 40 });
    Matter.Body.setPosition(wallR, { x: width + 20, y: height / 2 });
  };

  window.addEventListener('resize', onResize);

  return {
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      renderer.dispose();
      faceTex.dispose();
      blobTex.dispose();
      coinGeo.dispose();
      faceMat.dispose();
      rimMat.dispose();
      shadowMat.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    },
    toss() {
      for (const c of coins) {
        Matter.Body.setVelocity(c.body, {
          x: (Math.random() - 0.5) * 20,
          y: -12 - Math.random() * 8,
        });
        Matter.Body.setAngularVelocity(c.body, (Math.random() - 0.5) * 0.3);
      }
    },
  };
}
