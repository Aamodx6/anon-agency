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

const COIN_COLORS = [
  { coin: '#FFFFFF', logo: '#FF003C', weight: 12 },
  { coin: '#FFE3EA', logo: '#E0224F', weight: 12 },
  { coin: '#FFB3C6', logo: '#FFFFFF', weight: 12 },
  { coin: '#FFD9B8', logo: '#D9482B', weight: 12 },
  { coin: '#FFF1C9', logo: '#E0224F', weight: 12 },
  { coin: '#FFC94D', logo: '#B8460B', weight: 13 },
  { coin: '#FF7A59', logo: '#FFFFFF', weight: 12 },
  { coin: '#7A0F2B', logo: '#FFB3C6', weight: 8 },
  { coin: '#2B0A14', logo: '#FF6B8A', weight: 7 },
];
const MAX_COINS = 15;

interface Coin {
  body: Matter.Body;
  element: HTMLDivElement;
}

interface Letter {
  body: Matter.Body;
  element: HTMLElement;
  home: { x: number; y: number };
  hitUntil: number;
}

export function initHeroCoins({
  container,
  floorSelector = '[data-coins-floor]',
  aboveSelector = '[data-coins-above]',
}: HeroCoinsOptions): HeroCoinsInstance {
  if (prefersReducedMotion()) return { destroy: () => {}, toss: () => {} };

  const engine = Matter.Engine.create({
    enableSleeping: false,
    positionIterations: 8,
    velocityIterations: 6,
  });
  engine.gravity.y = 1;
  engine.gravity.scale = 0.0011;

  const layer = document.createElement('div');
  layer.className = 'hero-coins-layer';
  container.appendChild(layer);

  let width = container.clientWidth;
  let height = container.clientHeight;
  let coinRadius = Math.max(22, Math.min(32, width * 0.025));
  let floorY = height - 36;
  let floorBody: Matter.Body;
  let leftWall: Matter.Body;
  let rightWall: Matter.Body;
  const coins: Coin[] = [];
  const letters: Letter[] = [];
  const timers: number[] = [];
  let previousCoinColor = '';

  const getFloorY = () => {
    const floor = container.querySelector<HTMLElement>(floorSelector);
    if (!floor) return height - 36;
    const containerRect = container.getBoundingClientRect();
    return floor.getBoundingClientRect().top - containerRect.top;
  };

  const buildBounds = () => {
    floorY = getFloorY();
    const bounds = [
      Matter.Bodies.rectangle(width / 2, floorY + coinRadius, width * 2, coinRadius * 2, {
        isStatic: true,
        friction: 0.8,
        restitution: 0.35,
      }),
      Matter.Bodies.rectangle(-coinRadius, height / 2, coinRadius * 2, height * 2, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(width + coinRadius, height / 2, coinRadius * 2, height * 2, {
        isStatic: true,
      }),
    ];
    floorBody = bounds[0];
    leftWall = bounds[1];
    rightWall = bounds[2];
    Matter.Composite.add(engine.world, bounds);
  };

  const getLetterHome = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    };
  };

  const buildLetters = () => {
    const elements = Array.from(
      container.querySelectorAll<HTMLElement>('[data-split-char]')
    );
    elements.forEach((element) => {
      const home = getLetterHome(element);
      const rect = element.getBoundingClientRect();
      const body = Matter.Bodies.rectangle(
        home.x,
        home.y,
        Math.max(5, rect.width),
        Math.max(10, rect.height * 0.82),
        {
          restitution: 0.15,
          friction: 0.3,
          frictionAir: 0.18,
          density: 0.00035,
          collisionFilter: { category: 0x0002, mask: 0x0001 },
        }
      );
      Matter.Body.setInertia(body, Infinity);
      letters.push({ body, element, home, hitUntil: 0 });
    });
    Matter.Composite.add(engine.world, letters.map((letter) => letter.body));
  };

  const createCoinElement = () => {
    const element = document.createElement('div');
    element.className = 'hero-coin';
    const availableColors = COIN_COLORS.filter((color) => color.coin !== previousCoinColor);
    const totalWeight = availableColors.reduce((sum, color) => sum + color.weight, 0);
    let weight = Math.random() * totalWeight;
    const selectedColor =
      availableColors.find((color) => {
        weight -= color.weight;
        return weight <= 0;
      }) ?? availableColors[availableColors.length - 1];
    previousCoinColor = selectedColor.coin;
    element.style.setProperty('--coin-color', selectedColor.coin);
    element.style.setProperty('--coin-logo-color', selectedColor.logo);
    element.innerHTML = '<span aria-hidden="true">a.</span>';
    layer.appendChild(element);
    return element;
  };

  const addCoin = (x = Math.random() * Math.max(1, width), y = -coinRadius * 2) => {
    if (coins.length >= MAX_COINS) {
      const oldest = coins.shift();
      if (oldest) {
        Matter.Composite.remove(engine.world, oldest.body);
        oldest.element.remove();
      }
    }
    const body = Matter.Bodies.circle(x, y, coinRadius, {
      restitution: 0.38,
      friction: 0.65,
      frictionAir: 0.012,
      density: 0.0012,
      slop: 0.02,
      angle: (Math.random() - 0.5) * 0.18,
      collisionFilter: { category: 0x0001, mask: 0x0003 },
    });
    Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 });
    const coin = { body, element: createCoinElement() };
    coins.push(coin);
    Matter.Composite.add(engine.world, body);
  };

  buildBounds();
  buildLetters();

  let spawnTimer = 0;
  const spawn = () => {
    addCoin();
    spawnTimer = window.setTimeout(spawn, 400 + Math.random() * 400);
    timers.push(spawnTimer);
  };
  spawnTimer = window.setTimeout(spawn, 250);
  timers.push(spawnTimer);

  const onCollision = (event: Matter.IEvent< Matter.Engine >) => {
    const now = performance.now();
    event.pairs.forEach(({ bodyA, bodyB }) => {
      const letter = letters.find((item) => item.body === bodyA || item.body === bodyB);
      const coin = coins.find((item) => item.body === bodyA || item.body === bodyB);
      if (!letter || !coin || letter.hitUntil > now) return;
      letter.hitUntil = now + 180;
      const direction = coin.body.position.x < letter.body.position.x ? 1 : -1;
      Matter.Body.applyForce(letter.body, letter.body.position, {
        x: direction * 0.018,
        y: -0.012,
      });
    });
  };
  Matter.Events.on(engine, 'collisionStart', onCollision);

  let animationId = 0;
  let lastTime = performance.now();
  const animate = (now: number) => {
    animationId = requestAnimationFrame(animate);
    const delta = Math.min(16.667, now - lastTime);
    lastTime = now;
    Matter.Engine.update(engine, delta);

    coins.forEach(({ body, element }) => {
      element.style.transform = `translate3d(${body.position.x - coinRadius}px, ${body.position.y - coinRadius}px, 0) rotate(${body.angle}rad)`;
    });

    letters.forEach((letter) => {
      const dx = letter.home.x - letter.body.position.x;
      const dy = letter.home.y - letter.body.position.y;
      Matter.Body.applyForce(letter.body, letter.body.position, {
        x: dx * 0.00045,
        y: dy * 0.00045,
      });
      elementTransform(letter);
    });
  };
  animationId = requestAnimationFrame(animate);

  const onResize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    coinRadius = Math.max(22, Math.min(32, width * 0.025));
    floorY = getFloorY();
    Matter.Body.setPosition(floorBody, { x: width / 2, y: floorY + coinRadius });
    Matter.Body.setPosition(leftWall, { x: -coinRadius, y: height / 2 });
    Matter.Body.setPosition(rightWall, { x: width + coinRadius, y: height / 2 });
  };
  window.addEventListener('resize', onResize);

  return {
    destroy() {
      cancelAnimationFrame(animationId);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('resize', onResize);
      Matter.Events.off(engine, 'collisionStart', onCollision);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      layer.remove();
    },
    toss() {
      coins.forEach(({ body }) => {
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 8, y: -8 });
      });
    },
  };

  function elementTransform(letter: Letter) {
    const x = letter.body.position.x - letter.home.x;
    const y = letter.body.position.y - letter.home.y;
    letter.element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${letter.body.angle}rad)`;
  }
}
