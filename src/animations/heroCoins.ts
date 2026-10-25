import Matter from 'matter-js';
import { prefersReducedMotion } from './tokens';

export interface HeroCoinsOptions {
  container: HTMLElement;
  floorSelector?: string;
  aboveSelector?: string;
}

export interface HeroCoinsInstance {
  destroy: () => void;
  toss: () => void;
}

// Initial sequence matches the user's reference screenshot:
// 1. White with red text, 2. Dark with pink text, 3. Cream with red text, 4. Peach/Orange, etc.
// Exact color palette matching the user's reference image and Awake Agency:
// Soft pale pink, rose pink, slate grey, white, charcoal black, silver, medium grey, vibrant pink
const COIN_PALETTE = [
  { coin: '#ffd9e2', logo: '#ff2d5e' }, // Pale pink with pink logo
  { coin: '#ff6f95', logo: '#ffffff' }, // Rose pink with white logo
  { coin: '#5d646b', logo: '#ffffff' }, // Dark slate grey with white logo
  { coin: '#ffffff', logo: '#8b9298' }, // White with grey logo
  { coin: '#161d25', logo: '#ffffff' }, // Charcoal black with white logo
  { coin: '#e3e5e7', logo: '#8b9298' }, // Light silver with grey logo
  { coin: '#c3c8cc', logo: '#5d646b' }, // Soft grey with dark grey logo
  { coin: '#ffb0c5', logo: '#ff2d5e' }, // Medium pink with dark pink logo
  { coin: '#ffffff', logo: '#c3c8cc' }, // White with silver logo
  { coin: '#8b9298', logo: '#ffffff' }, // Medium grey with white logo
  { coin: '#ff2d5e', logo: '#ffffff' }, // Vibrant pink with white logo
  { coin: '#ffd9e2', logo: '#ff6f95' }, // Soft pale pink with coral logo
];

const MAX_COINS = 21;
const SPAWN_INTERVAL_MS = 500; // 0.5 sec per ball
const CYCLE_INTERVAL_MS = 10000; // 10 sec pause and 10 sec drop/disappear cycle

interface Coin {
  body: Matter.Body;
  element: HTMLDivElement;
  hops: number;
  isRemoving?: boolean;
}

interface LetterInfo {
  body: Matter.Body;
  element: HTMLElement;
  slotElement: HTMLElement;
  home: { x: number; y: number };
}

export function initHeroCoins({
  container,
  floorSelector = '[data-coins-floor]',
}: HeroCoinsOptions): HeroCoinsInstance {
  if (prefersReducedMotion()) return { destroy: () => {}, toss: () => {} };

  // 1. Matter.js Physics Engine
  const engine = Matter.Engine.create({
    enableSleeping: false,
    positionIterations: 10,
    velocityIterations: 8,
  });
  engine.gravity.y = 1;
  engine.gravity.scale = 0.0018;

  // 2. Layer for DOM Coin elements
  const layer = document.createElement('div');
  layer.className = 'hero-coins-layer';
  container.appendChild(layer);

  let width = container.clientWidth;
  let height = container.clientHeight;
  let coinRadius = Math.max(24, Math.min(34, Math.round(width * 0.022)));

  let floorBody: Matter.Body;
  let leftWall: Matter.Body;
  let rightWall: Matter.Body;
  let ceilingBody: Matter.Body;
  let kickerBody: Matter.Body | null = null;

  const coins: Coin[] = [];
  const letters: LetterInfo[] = [];
  const timers: number[] = [];
  let colorIndex = 0;

  // Interactive Dragging State
  let draggedCoin: Coin | null = null;
  let dragOffset = { x: 0, y: 0 };
  let lastPointer = { x: 0, y: 0, time: 0 };
  let pointerVelocity = { x: 0, y: 0 };

  // 3. Exact target border line calculation (bottom line of the hero)
  const getFloorY = () => {
    const floor = container.querySelector<HTMLElement>(floorSelector);
    if (!floor) return height - 36;
    const rule = floor.querySelector<HTMLElement>('.Hero-module__KTD73a__metaRule');
    const containerRect = container.getBoundingClientRect();
    if (rule) {
      return rule.getBoundingClientRect().top - containerRect.top;
    }
    return floor.getBoundingClientRect().top - containerRect.top;
  };

  let floorY = getFloorY();

  // 4. Build Boundaries (Floor, Left, Right, Top)
  const buildBounds = () => {
    floorY = getFloorY();
    const floorThickness = 120;
    const wallThickness = 100;

    // Floor top edge is placed exactly at floorY so balls gather directly above the border line
    floorBody = Matter.Bodies.rectangle(
      width / 2,
      floorY + floorThickness / 2,
      width * 3,
      floorThickness,
      {
        isStatic: true,
        friction: 0.12,
        restitution: 0.68, // Bouncy floor
        collisionFilter: { category: 0x0001 },
      }
    );

    // Left wall
    leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      {
        isStatic: true,
        friction: 0.05,
        restitution: 0.5,
        collisionFilter: { category: 0x0001 },
      }
    );

    rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      {
        isStatic: true,
        friction: 0.05,
        restitution: 0.5,
        collisionFilter: { category: 0x0001 },
      }
    );

    ceilingBody = Matter.Bodies.rectangle(
      width / 2,
      -300,
      width * 3,
      wallThickness,
      {
        isStatic: true,
        collisionFilter: { category: 0x0001 },
      }
    );

    Matter.Composite.add(engine.world, [floorBody, leftWall, rightWall, ceilingBody]);
  };

  // 5. Letter platforms for hopping
  const setupLetters = () => {
    const elements = Array.from(
      container.querySelectorAll<HTMLElement>('.Hero-module__KTD73a__headline [data-split-char]')
    );
    const containerRect = container.getBoundingClientRect();

    elements.forEach((element) => {
      const slotElement = (element.closest('[data-swap-char]') ?? element.parentElement ?? element) as HTMLElement;
      const rect = element.getBoundingClientRect();
      const home = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };

      // Create a bouncy platform body for the letter with smooth chamfered edges
      const body = Matter.Bodies.rectangle(
        home.x,
        home.y + 2,
        Math.max(16, rect.width * 0.96),
        Math.max(16, rect.height * 0.82),
        {
          isStatic: true,
          restitution: 0.90, // Bouncy platform so ball hops energetic across headings
          friction: 0.04,
          chamfer: { radius: 8 },
          collisionFilter: { category: 0x0002 },
        }
      );

      const letterInfo: LetterInfo = {
        body,
        element,
        slotElement,
        home,
      };

      letters.push(letterInfo);
      Matter.Composite.add(engine.world, body);
    });
  };

  // 5b. Solid collision body for the Kicker paragraph text (so balls never overlap it!)
  const setupKicker = () => {
    const kickerEl = container.querySelector<HTMLElement>('.Hero-module__KTD73a__kicker');
    if (!kickerEl) return;
    const kRect = kickerEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const kX = kRect.left - containerRect.left + kRect.width / 2;
    const kY = kRect.top - containerRect.top + kRect.height / 2;

    kickerBody = Matter.Bodies.rectangle(
      kX,
      kY,
      kRect.width + 12,
      kRect.height + 8,
      {
        isStatic: true,
        restitution: 0.82,
        friction: 0.05,
        chamfer: { radius: 10 },
        collisionFilter: { category: 0x0002 }, // Collides with balls
      }
    );
    Matter.Composite.add(engine.world, kickerBody);
  };

  // 6. Coin element creation
  const createCoinElement = () => {
    const element = document.createElement('div');
    element.className = 'hero-coin';

    const colorConfig = COIN_PALETTE[colorIndex % COIN_PALETTE.length];
    colorIndex++;

    element.style.setProperty('--coin-color', colorConfig.coin);
    element.style.setProperty('--coin-logo-color', colorConfig.logo);
    element.style.width = `${coinRadius * 2}px`;
    element.style.height = `${coinRadius * 2}px`;

    element.innerHTML = '<span aria-hidden="true">a.</span>';
    layer.appendChild(element);
    return element;
  };

  // Helper to find the oldest settled coin to disappear when >= MAX_COINS
  const getOldestSettledCoin = (): Coin | null => {
    const candidates = coins.filter(
      (c) => !c.isRemoving && c !== draggedCoin
    );
    if (candidates.length === 0) return null;

    // Prefer coins that have settled near the bottom floor line
    const settled = candidates.filter(
      (c) => c.body.position.y > floorY - coinRadius * 3.5
    );
    if (settled.length > 0) {
      return settled[0]; // First in list is the oldest
    }
    return candidates[0];
  };

  // Disappear a coin with a smooth pop/shrink and fade-out animation
  const removeCoin = (coin: Coin) => {
    if (coin.isRemoving) return;
    coin.isRemoving = true;

    // Immediately remove from physics world so surrounding coins settle
    Matter.Composite.remove(engine.world, coin.body);

    // Smooth shrink and fade out
    coin.element.style.transition = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.32s ease';
    coin.element.style.opacity = '0';
    const lastTransform = coin.element.style.transform || '';
    coin.element.style.transform = `${lastTransform.replace(/scale\([^)]*\)/g, '')} scale(0)`;

    window.setTimeout(() => {
      coin.element.remove();
      const idx = coins.indexOf(coin);
      if (idx !== -1) coins.splice(idx, 1);
    }, 400);
  };

  // 7. Spawning a coin from the left vertical side of the screen
  const addCoin = () => {
    // When active coins reach around 15, remove the oldest settled one so 1 disappears and other comes
    const activeCoins = coins.filter((c) => !c.isRemoving);
    if (activeCoins.length >= MAX_COINS) {
      const oldest = getOldestSettledCoin();
      if (oldest) {
        removeCoin(oldest);
      }
    }

    // Fall from left vertical side of the screen across top-left heading area
    const inset = Math.max(30, Math.min(width * 0.055, 65));
    const dropX = inset + coinRadius * 0.6 + Math.random() * Math.min(200, width * 0.15);
    const dropY = -coinRadius * 2 - Math.random() * 15;

    const element = createCoinElement();
    const body = Matter.Bodies.circle(dropX, dropY, coinRadius, {
      restitution: 0.82, // High bounciness
      friction: 0.05,
      frictionAir: 0.005,
      density: 0.0014,
      slop: 0.02,
      angle: (Math.random() - 0.5) * 0.2,
      // Collide with both boundaries (0x0001) and all headings (0x0002)
      collisionFilter: { category: 0x0001, mask: 0x0001 | 0x0002 },
    });

    // Downward velocity with lively rightward drift toward the headings
    Matter.Body.setVelocity(body, {
      x: 0.8 + Math.random() * 0.9,
      y: 4.2 + Math.random() * 1.4,
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);

    const coin: Coin = { body, element, hops: 0 };
    coins.push(coin);
    Matter.Composite.add(engine.world, body);

    // Bind pointer events for playable drag and toss
    bindCoinInteraction(coin);
  };

  // 8. Playable Pointer Drag & Toss System
  const bindCoinInteraction = (coin: Coin) => {
    const { element, body } = coin;

    element.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      e.stopPropagation();

      draggedCoin = coin;
      element.classList.add('is-dragging');
      element.setPointerCapture(e.pointerId);

      const containerRect = container.getBoundingClientRect();
      const pointerX = e.clientX - containerRect.left;
      const pointerY = e.clientY - containerRect.top;

      dragOffset.x = body.position.x - pointerX;
      dragOffset.y = body.position.y - pointerY;

      lastPointer = { x: pointerX, y: pointerY, time: performance.now() };
      pointerVelocity = { x: 0, y: 0 };

      Matter.Body.setAngularVelocity(body, 0);
    });
  };

  const onGlobalPointerMove = (e: PointerEvent) => {
    if (!draggedCoin) return;
    e.preventDefault();

    const containerRect = container.getBoundingClientRect();
    const pointerX = e.clientX - containerRect.left;
    const pointerY = e.clientY - containerRect.top;
    const now = performance.now();
    const dt = Math.max(8, now - lastPointer.time);

    // Calculate moving average velocity for responsive fling
    const vx = ((pointerX - lastPointer.x) / dt) * 16.667;
    const vy = ((pointerY - lastPointer.y) / dt) * 16.667;
    pointerVelocity = {
      x: pointerVelocity.x * 0.35 + vx * 0.65,
      y: pointerVelocity.y * 0.35 + vy * 0.65,
    };

    lastPointer = { x: pointerX, y: pointerY, time: now };

    const targetX = Math.max(coinRadius, Math.min(width - coinRadius, pointerX + dragOffset.x));
    const targetY = Math.max(coinRadius, Math.min(floorY - coinRadius, pointerY + dragOffset.y));

    Matter.Body.setPosition(draggedCoin.body, { x: targetX, y: targetY });
    Matter.Body.setVelocity(draggedCoin.body, {
      x: Math.max(-25, Math.min(25, pointerVelocity.x * 0.7)),
      y: Math.max(-25, Math.min(25, pointerVelocity.y * 0.7)),
    });
  };

  const onGlobalPointerUp = (e: PointerEvent) => {
    if (!draggedCoin) return;

    draggedCoin.element.classList.remove('is-dragging');
    try {
      draggedCoin.element.releasePointerCapture(e.pointerId);
    } catch {}

    // Apply toss / fling velocity
    const flingX = Math.max(-28, Math.min(28, pointerVelocity.x * 1.15));
    const flingY = Math.max(-28, Math.min(28, pointerVelocity.y * 1.15));

    Matter.Body.setVelocity(draggedCoin.body, { x: flingX, y: flingY });
    Matter.Body.setAngularVelocity(
      draggedCoin.body,
      Math.max(-0.25, Math.min(0.25, flingX * 0.02))
    );

    draggedCoin = null;
  };

  window.addEventListener('pointermove', onGlobalPointerMove, { passive: false });
  window.addEventListener('pointerup', onGlobalPointerUp);
  window.addEventListener('pointercancel', onGlobalPointerUp);

  // 9. Hop on Letters & Kicker Collision Detection
  const onCollision = (event: Matter.IEventCollision<Matter.Engine>) => {
    const now = performance.now();
    event.pairs.forEach(({ bodyA, bodyB }) => {
      // 9a. Collision with hero letters (letters remain completely still, balls collide and bounce)
      const letter = letters.find((item) => item.body === bodyA || item.body === bodyB);
      const coin = coins.find((item) => item.body === bodyA || item.body === bodyB);
      if (letter && coin && !coin.isRemoving) {
        // When the ball strikes any letter from above, give it an energetic HOP toward next heading/floor
        if (coin.body.position.y <= letter.home.y + 16) {
          const hopVx = 3.2 + Math.random() * 2.6;
          const hopVy = -7.5 - Math.random() * 2.2;
          Matter.Body.setVelocity(coin.body, {
            x: hopVx,
            y: hopVy,
          });
          Matter.Body.setAngularVelocity(coin.body, (Math.random() - 0.5) * 0.18);
          coin.hops++;
        }
      }

      // 9b. Collision bounce off the kicker paragraph text so balls never overlap it
      if (kickerBody && (bodyA === kickerBody || bodyB === kickerBody)) {
        const kickerCoin = coins.find((c) => c.body === bodyA || c.body === bodyB);
        if (kickerCoin && !kickerCoin.isRemoving) {
          const dx = kickerCoin.body.position.x - kickerBody.position.x;
          const dy = kickerCoin.body.position.y - kickerBody.position.y;
          const dist = Math.hypot(dx, dy) || 1;
          Matter.Body.setVelocity(kickerCoin.body, {
            x: (dx / dist) * 4.6,
            y: Math.min(-3.5, (dy / dist) * 4.6),
          });
          Matter.Body.setAngularVelocity(kickerCoin.body, (Math.random() - 0.5) * 0.16);
        }
      }
    });
  };
  Matter.Events.on(engine, 'collisionStart', onCollision);

  // 10. Initialization & Two-Phase Spawning Schedule
  buildBounds();
  setupLetters();
  setupKicker();

  let initialDropCount = 0;
  // First ball drops after 150ms
  const initialTimer = window.setTimeout(() => {
    addCoin();
    initialDropCount++;
  }, 150);
  timers.push(initialTimer);

  // Helper to remove 1 oldest settled ball and drop 1 new ball
  const cycleDropAndDisappear = () => {
    const oldest = getOldestSettledCoin();
    if (oldest) {
      removeCoin(oldest);
    }
    addCoin();
  };

  // Phase 1: First 21 balls fall 1 by 1 with 0.5sec gap between them
  const burstInterval = window.setInterval(() => {
    if (initialDropCount < MAX_COINS) {
      addCoin();
      initialDropCount++;
    }

    if (initialDropCount >= MAX_COINS) {
      window.clearInterval(burstInterval);

      // Phase 2: After 10 sec, 1 ball falls and 1 ball disappears every 10 sec
      const pauseTimer = window.setTimeout(() => {
        cycleDropAndDisappear();

        const steadyInterval = window.setInterval(() => {
          cycleDropAndDisappear();
        }, CYCLE_INTERVAL_MS);
        timers.push(steadyInterval as unknown as number);
      }, CYCLE_INTERVAL_MS);
      timers.push(pauseTimer);
    }
  }, SPAWN_INTERVAL_MS); // 500ms gap
  timers.push(burstInterval as unknown as number);

  // 11. Animation Loop
  let animationId = 0;
  let lastTime = performance.now();

  const animate = (now: number) => {
    animationId = requestAnimationFrame(animate);
    const delta = Math.min(16.667, now - lastTime);
    lastTime = now;

    Matter.Engine.update(engine, delta);

    // Guide settling balls along bottom border
    coins.forEach(({ body, element, isRemoving }) => {
      if (isRemoving) return; // Leave inline styles alone during disappearance transition

      // Natural soft settling guide toward the border line
      if (
        body.position.y > floorY - coinRadius * 2.2 &&
        body.position.x < coinRadius * 2.5 &&
        body.speed < 1.0
      ) {
        Matter.Body.applyForce(body, body.position, { x: 0.00018 * body.mass, y: 0 });
      }

      element.style.transform = `translate3d(${body.position.x - coinRadius}px, ${body.position.y - coinRadius}px, 0) rotate(${body.angle}rad)`;
    });

    // Letters remain completely still (no wobble transform) so balls collide with them as rigid obstacles
  };
  animationId = requestAnimationFrame(animate);

  // 12. Resize Handler
  const onResize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    coinRadius = Math.max(24, Math.min(34, Math.round(width * 0.022)));
    floorY = getFloorY();

    const floorThickness = 120;
    const wallThickness = 100;

    Matter.Body.setPosition(floorBody, {
      x: width / 2,
      y: floorY + floorThickness / 2,
    });
    Matter.Body.setPosition(leftWall, {
      x: -wallThickness / 2,
      y: height / 2,
    });
    Matter.Body.setPosition(rightWall, {
      x: width + wallThickness / 2,
      y: height / 2,
    });

    coins.forEach(({ element }) => {
      element.style.width = `${coinRadius * 2}px`;
      element.style.height = `${coinRadius * 2}px`;
    });

    const containerRect = container.getBoundingClientRect();
    letters.forEach((letter) => {
      const rect = letter.element.getBoundingClientRect();
      letter.home = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
      Matter.Body.setPosition(letter.body, {
        x: letter.home.x,
        y: letter.home.y + 2,
      });
    });

    if (kickerBody) {
      const kickerEl = container.querySelector<HTMLElement>('.Hero-module__KTD73a__kicker');
      if (kickerEl) {
        const kRect = kickerEl.getBoundingClientRect();
        Matter.Body.setPosition(kickerBody, {
          x: kRect.left - containerRect.left + kRect.width / 2,
          y: kRect.top - containerRect.top + kRect.height / 2,
        });
      }
    }
  };
  window.addEventListener('resize', onResize);

  return {
    destroy() {
      cancelAnimationFrame(animationId);
      timers.forEach((timer) => { window.clearTimeout(timer); window.clearInterval(timer); });
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onGlobalPointerMove);
      window.removeEventListener('pointerup', onGlobalPointerUp);
      window.removeEventListener('pointercancel', onGlobalPointerUp);
      Matter.Events.off(engine, 'collisionStart', onCollision);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      layer.remove();
    },
    toss() {
      coins.forEach(({ body }) => {
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 14,
          y: -12 - Math.random() * 8,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
      });
    },
  };
}
