'use client';

/**
 * BuildUpSection — Scroll-driven SVG "build-up" animation
 *
 * Layout:  LEFT sticky panel  |  RIGHT scrolling cards
 * Tech:    GSAP ScrollTrigger (scrub: 1.2), CSS sticky, pathLength="1" SVG trick
 * Designs: Robot → Phone → Laptop → Watch  (add more below the DESIGNS array)
 *
 * Animation per card (3 phases, all scrubbed to scroll):
 *   Phase 1  (0 → 0.45)  Stroke outlines draw in via strokeDashoffset
 *   Phase 2  (0.25 → 0.75) Body parts appear: opacity + translateY + scale
 *   Phase 3  (0.65 → 1.0)  Glow fills and color details appear
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const DESIGNS = [
  {
    id: 'robot',
    number: '01',
    title: 'Intelligent Robot',
    description:
      'Autonomous AI agents that adapt and learn, executing complex workflows with human-like precision and superhuman speed.',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.22)',
  },
  {
    id: 'phone',
    number: '02',
    title: 'Mobile Experience',
    description:
      'Native-quality mobile apps designed for real-world usage patterns, combining beauty with blazing performance.',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.22)',
  },
  {
    id: 'laptop',
    number: '03',
    title: 'Desktop Platform',
    description:
      'Powerful web applications that transform complex enterprise workflows into elegant, intuitive interfaces.',
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.22)',
  },
  {
    id: 'watch',
    number: '04',
    title: 'Wearable Interface',
    description:
      'Always-on, glanceable experiences engineered for the most personal and intimate screen you own.',
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.22)',
  },
  // ─── Add more designs here ───────────────────────────────────────────────────
  // { id: 'tablet', number: '05', title: 'Tablet', description: '...', accent: '#fbbf24', glow: 'rgba(251,191,36,0.22)' },
];

// ─── SVG Designs ──────────────────────────────────────────────────────────────
// Conventions per element:
//   data-stroke  → animated via strokeDashoffset 1→0 (draw-in)
//   data-part    → animated via opacity+translateY+scale (appear)
//   data-glow    → animated via opacity last (color/glow layer)

// 01 ROBOT ─────────────────────────────────────────────────────────────────────
function RobotSVG({ color }: { color: string }) {
  const s = {
    stroke: color, strokeWidth: 1.5, fill: 'none',
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1,
  };
  const d = { ...s, strokeWidth: 1, opacity: 0.45 };
  return (
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" className="bu-svg" aria-hidden="true">
      <g data-part="robot-antenna">
        <line data-stroke="" {...s} x1="100" y1="10" x2="100" y2="32" strokeWidth={2} />
        <circle data-stroke="" {...s} cx="100" cy="7" r="5" strokeWidth={1.5} />
      </g>
      <g data-part="robot-head">
        <rect data-stroke="" {...s} x="58" y="32" width="84" height="62" rx="13" />
        <rect data-stroke="" {...s} x="70" y="48" width="20" height="13" rx="3" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="110" y="48" width="20" height="13" rx="3" strokeWidth={1.25} />
        <rect data-stroke="" {...d} x="72" y="72" width="56" height="10" rx="5" />
        <circle data-stroke="" {...d} cx="84" cy="77" r="2" />
        <circle data-stroke="" {...d} cx="100" cy="77" r="2" />
        <circle data-stroke="" {...d} cx="116" cy="77" r="2" />
      </g>
      <g data-part="robot-neck">
        <rect data-stroke="" {...d} x="88" y="94" width="24" height="11" rx="4" strokeWidth={1.25} />
      </g>
      <g data-part="robot-body">
        <rect data-stroke="" {...s} x="40" y="105" width="120" height="96" rx="14" />
        <rect data-stroke="" {...d} x="56" y="120" width="88" height="66" rx="8" />
        <circle data-stroke="" {...s} cx="78" cy="145" r="7" strokeWidth={1.25} />
        <circle data-stroke="" {...s} cx="100" cy="145" r="7" strokeWidth={1.25} />
        <circle data-stroke="" {...s} cx="122" cy="145" r="7" strokeWidth={1.25} />
        <rect data-stroke="" {...d} x="72" y="162" width="56" height="8" rx="4" />
        <line data-stroke="" {...d} x1="72" y1="176" x2="128" y2="176" />
        <line data-stroke="" {...d} x1="72" y1="182" x2="128" y2="182" />
      </g>
      <g data-part="robot-left-arm">
        <rect data-stroke="" {...s} x="8" y="105" width="30" height="72" rx="10" />
        <rect data-stroke="" {...d} x="10" y="177" width="26" height="20" rx="9" />
      </g>
      <g data-part="robot-right-arm">
        <rect data-stroke="" {...s} x="162" y="105" width="30" height="72" rx="10" />
        <rect data-stroke="" {...d} x="164" y="177" width="26" height="20" rx="9" />
      </g>
      <g data-part="robot-legs">
        <rect data-stroke="" {...s} x="58" y="201" width="34" height="46" rx="10" />
        <rect data-stroke="" {...s} x="108" y="201" width="34" height="46" rx="10" />
        <rect data-stroke="" {...s} x="50" y="238" width="50" height="12" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="100" y="238" width="50" height="12" rx="6" strokeWidth={1.25} />
      </g>
      <g data-glow="" style={{ opacity: 0 }}>
        <rect x="71" y="49" width="18" height="11" rx="2" fill={color} opacity={0.7} />
        <rect x="111" y="49" width="18" height="11" rx="2" fill={color} opacity={0.7} />
        <circle cx="100" cy="7" r="3" fill={color} />
        <circle cx="78" cy="145" r="4.5" fill={color} opacity={0.8} />
        <circle cx="100" cy="145" r="4.5" fill={color} opacity={0.8} />
        <circle cx="122" cy="145" r="4.5" fill={color} opacity={0.8} />
        <rect x="57" y="121" width="86" height="64" rx="7" fill={color} opacity={0.04} />
      </g>
    </svg>
  );
}

// 02 PHONE ─────────────────────────────────────────────────────────────────────
function PhoneSVG({ color }: { color: string }) {
  const s = {
    stroke: color, strokeWidth: 1.5, fill: 'none',
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1,
  };
  const d = { ...s, strokeWidth: 1, opacity: 0.45 };
  return (
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" className="bu-svg" aria-hidden="true">
      <g data-part="phone-frame">
        <rect data-stroke="" {...s} x="52" y="10" width="96" height="230" rx="22" />
        <line data-stroke="" {...d} x1="52" y1="70" x2="48" y2="70" strokeWidth={3} />
        <line data-stroke="" {...d} x1="52" y1="85" x2="48" y2="85" strokeWidth={3} />
        <line data-stroke="" {...d} x1="148" y1="75" x2="152" y2="75" strokeWidth={4} />
      </g>
      <g data-part="phone-camera">
        <rect data-stroke="" {...s} x="72" y="18" width="56" height="20" rx="10" strokeWidth={1.25} />
        <circle data-stroke="" {...s} cx="90" cy="28" r="5" strokeWidth={1.25} />
        <circle data-stroke="" {...s} cx="110" cy="28" r="5" strokeWidth={1.25} />
      </g>
      <g data-part="phone-screen">
        <rect data-stroke="" {...d} x="60" y="44" width="80" height="168" rx="6" />
      </g>
      <g data-part="phone-status">
        <line data-stroke="" {...d} x1="68" y1="54" x2="98" y2="54" />
        <circle data-stroke="" {...d} cx="132" cy="54" r="4" strokeWidth={1} />
        <rect data-stroke="" {...d} x="136" y="51" width="8" height="6" rx="2" strokeWidth={1} />
      </g>
      <g data-part="phone-apps">
        <rect data-stroke="" {...s} x="68" y="70" width="22" height="22" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="97" y="70" width="22" height="22" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="126" y="70" width="22" height="22" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="68" y="100" width="22" height="22" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="97" y="100" width="22" height="22" rx="6" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="126" y="100" width="22" height="22" rx="6" strokeWidth={1.25} />
      </g>
      <g data-part="phone-card">
        <rect data-stroke="" {...s} x="66" y="132" width="80" height="52" rx="8" />
        <line data-stroke="" {...d} x1="74" y1="148" x2="114" y2="148" />
        <line data-stroke="" {...d} x1="74" y1="158" x2="104" y2="158" />
        <line data-stroke="" {...d} x1="74" y1="168" x2="120" y2="168" />
        <circle data-stroke="" {...d} cx="132" cy="158" r="8" strokeWidth={1} />
      </g>
      <g data-part="phone-nav">
        <line data-stroke="" {...d} x1="78" y1="198" x2="122" y2="198" strokeWidth={3} />
        <rect data-stroke="" {...s} x="78" y="228" width="44" height="5" rx="2.5" strokeWidth={1.5} />
      </g>
      <g data-glow="" style={{ opacity: 0 }}>
        <rect x="73" y="19" width="54" height="18" rx="9" fill={color} opacity={0.15} />
        <circle cx="90" cy="28" r="3" fill={color} opacity={0.6} />
        <circle cx="110" cy="28" r="3" fill={color} opacity={0.6} />
        <rect x="61" y="45" width="78" height="166" rx="5" fill={color} opacity={0.03} />
        <rect x="69" y="71" width="20" height="20" rx="5" fill={color} opacity={0.18} />
        <rect x="98" y="71" width="20" height="20" rx="5" fill={color} opacity={0.12} />
        <rect x="127" y="101" width="20" height="20" rx="5" fill={color} opacity={0.18} />
      </g>
    </svg>
  );
}

// 03 LAPTOP ────────────────────────────────────────────────────────────────────
function LaptopSVG({ color }: { color: string }) {
  const s = {
    stroke: color, strokeWidth: 1.5, fill: 'none',
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1,
  };
  const d = { ...s, strokeWidth: 1, opacity: 0.45 };
  const row1Xs = [28, 44, 60, 76, 92, 108, 124, 140, 156];
  const row2Xs = [32, 48, 64, 80, 96, 112, 128, 144];
  return (
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" className="bu-svg" aria-hidden="true">
      <g data-part="laptop-lid">
        <rect data-stroke="" {...s} x="20" y="30" width="160" height="110" rx="8" />
        <circle data-stroke="" {...d} cx="100" cy="36" r="3" strokeWidth={1} />
        <rect data-stroke="" {...d} x="28" y="42" width="144" height="92" rx="4" strokeWidth={1} />
      </g>
      <g data-part="laptop-screen">
        <rect data-stroke="" {...d} x="30" y="44" width="140" height="14" rx="3" strokeWidth={1} />
        <circle data-stroke="" {...d} cx="38" cy="51" r="3" strokeWidth={1} />
        <circle data-stroke="" {...d} cx="48" cy="51" r="3" strokeWidth={1} />
        <circle data-stroke="" {...d} cx="58" cy="51" r="3" strokeWidth={1} />
        <rect data-stroke="" {...d} x="70" y="46" width="60" height="10" rx="3" strokeWidth={1} />
        <line data-stroke="" {...d} x1="36" y1="68" x2="100" y2="68" />
        <line data-stroke="" {...d} x1="36" y1="78" x2="120" y2="78" />
        <line data-stroke="" {...d} x1="36" y1="88" x2="90" y2="88" />
        <rect data-stroke="" {...s} x="36" y="96" width="76" height="32" rx="5" strokeWidth={1.25} />
        <rect data-stroke="" {...s} x="120" y="64" width="44" height="64" rx="5" strokeWidth={1.25} />
        <line data-stroke="" {...d} x1="42" y1="108" x2="72" y2="108" />
        <line data-stroke="" {...d} x1="42" y1="118" x2="64" y2="118" />
      </g>
      <g data-part="laptop-hinge">
        <rect data-stroke="" {...d} x="18" y="138" width="164" height="4" rx="2" strokeWidth={1} />
      </g>
      <g data-part="laptop-base">
        <path data-stroke="" {...s} d="M16 142 L20 196 Q20 202 26 202 L174 202 Q180 202 180 196 L184 142 Z" strokeWidth={1.5} />
        <rect data-stroke="" {...s} x="76" y="168" width="48" height="28" rx="6" strokeWidth={1.25} />
      </g>
      <g data-part="laptop-keyboard">
        {row1Xs.map((x, i) => (
          <rect key={`r1-${i}`} data-stroke="" {...d} x={x} y={146} width={12} height={8} rx={2} />
        ))}
        {row2Xs.map((x, i) => (
          <rect key={`r2-${i}`} data-stroke="" {...d} x={x} y={158} width={12} height={8} rx={2} />
        ))}
      </g>
      <g data-part="laptop-feet">
        <rect data-stroke="" {...d} x="26" y="202" width="14" height="4" rx="2" strokeWidth={1} />
        <rect data-stroke="" {...d} x="160" y="202" width="14" height="4" rx="2" strokeWidth={1} />
      </g>
      <g data-glow="" style={{ opacity: 0 }}>
        <rect x="29" y="43" width="142" height="90" rx="3" fill={color} opacity={0.04} />
        <rect x="37" y="97" width="74" height="30" rx="4" fill={color} opacity={0.12} />
        <rect x="121" y="65" width="42" height="62" rx="4" fill={color} opacity={0.1} />
        <circle cx="38" cy="51" r="2" fill="#ef4444" opacity={0.8} />
        <circle cx="48" cy="51" r="2" fill="#f59e0b" opacity={0.8} />
        <circle cx="58" cy="51" r="2" fill="#22c55e" opacity={0.8} />
        <rect x="77" y="169" width="46" height="26" rx="5" fill={color} opacity={0.06} />
      </g>
    </svg>
  );
}

// 04 WATCH ─────────────────────────────────────────────────────────────────────
function WatchSVG({ color }: { color: string }) {
  const s = {
    stroke: color, strokeWidth: 1.5, fill: 'none',
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1,
  };
  const d = { ...s, strokeWidth: 1, opacity: 0.45 };
  return (
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" className="bu-svg" aria-hidden="true">
      <g data-part="watch-strap-top">
        <path data-stroke="" {...s} d="M74 10 Q74 6 78 6 L122 6 Q126 6 126 10 L126 68 Q126 72 122 72 L78 72 Q74 72 74 68 Z" />
        <circle data-stroke="" {...d} cx="100" cy="26" r="2.5" />
        <circle data-stroke="" {...d} cx="100" cy="38" r="2.5" />
        <circle data-stroke="" {...d} cx="100" cy="50" r="2.5" />
      </g>
      <g data-part="watch-strap-bottom">
        <path data-stroke="" {...s} d="M74 182 Q74 178 78 178 L122 178 Q126 178 126 182 L126 240 Q126 244 122 244 L78 244 Q74 244 74 240 Z" />
        <line data-stroke="" {...d} x1="80" y1="194" x2="120" y2="194" strokeWidth={1.5} />
        <circle data-stroke="" {...d} cx="100" cy="212" r="2.5" />
        <circle data-stroke="" {...d} cx="100" cy="226" r="2.5" />
      </g>
      <g data-part="watch-case">
        <rect data-stroke="" {...s} x="54" y="64" width="92" height="122" rx="28" />
        <rect data-stroke="" {...d} x="148" y="98" width="8" height="20" rx="4" strokeWidth={1.25} />
        <rect data-stroke="" {...d} x="148" y="126" width="6" height="12" rx="3" strokeWidth={1} />
      </g>
      <g data-part="watch-screen">
        <rect data-stroke="" {...d} x="62" y="72" width="76" height="106" rx="22" />
      </g>
      <g data-part="watch-face">
        <circle data-stroke="" {...s} cx="100" cy="125" r="36" />
        <circle data-stroke="" {...s} cx="100" cy="125" r="36" strokeWidth={4}
          strokeDasharray="0.72 0.28"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 125px' }} />
        <line data-stroke="" {...d} x1="88" y1="118" x2="112" y2="118" strokeWidth={3} />
        <line data-stroke="" {...d} x1="84" y1="128" x2="116" y2="128" strokeWidth={2} />
        <line data-stroke="" {...d} x1="90" y1="138" x2="98" y2="138" strokeWidth={1.5} />
        <line data-stroke="" {...d} x1="102" y1="138" x2="110" y2="138" strokeWidth={1.5} />
        <line data-stroke="" {...d} x1="100" y1="92" x2="100" y2="98" strokeWidth={2} />
        <line data-stroke="" {...d} x1="100" y1="152" x2="100" y2="158" strokeWidth={2} />
        <line data-stroke="" {...d} x1="66" y1="125" x2="72" y2="125" strokeWidth={2} />
        <line data-stroke="" {...d} x1="128" y1="125" x2="134" y2="125" strokeWidth={2} />
      </g>
      <g data-glow="" style={{ opacity: 0 }}>
        <circle cx="100" cy="125" r="36" stroke={color} strokeWidth={5} fill="none"
          strokeDasharray="0.72 0.28" opacity={0.65}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 125px' }} />
        <rect x="63" y="73" width="74" height="104" rx="21" fill={color} opacity={0.05} />
        <line x1="88" y1="118" x2="112" y2="118" stroke={color} strokeWidth={4} strokeLinecap="round" opacity={0.9} />
        <line x1="84" y1="128" x2="116" y2="128" stroke={color} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        <rect x="55" y="65" width="90" height="120" rx="27" fill={color} opacity={0.04} />
      </g>
    </svg>
  );
}

// ─── SVG registry — add new designs here ──────────────────────────────────────
const SVG_MAP: Record<string, React.FC<{ color: string }>> = {
  robot: RobotSVG,
  phone: PhoneSVG,
  laptop: LaptopSVG,
  watch: WatchSVG,
};

// ─── Main component ────────────────────────────────────────────────────────────
export function BuildUpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const designRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // prefers-reduced-motion: show first design fully assembled, others hidden
    if (prefersReduced) {
      designRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === 0 ? '1' : '0';
        el.querySelectorAll<SVGElement>('[data-stroke]').forEach((el) => {
          (el as SVGElement & { style: CSSStyleDeclaration }).style.strokeDashoffset = '0';
        });
        el.querySelectorAll<HTMLElement>('[data-part]').forEach((g) => { g.style.opacity = '1'; });
        el.querySelectorAll<HTMLElement>('[data-glow]').forEach((g) => { g.style.opacity = '1'; });
      });
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      // ── Initial state ────────────────────────────────────────────────────────
      designRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0 });
        el.querySelectorAll<SVGElement>('[data-stroke]').forEach((stroke) => {
          gsap.set(stroke, { strokeDashoffset: 1 });
        });
        el.querySelectorAll<HTMLElement>('[data-part]').forEach((part) => {
          gsap.set(part, { opacity: 0, y: 14, scale: 0.93, transformOrigin: 'center center' });
        });
        el.querySelectorAll<HTMLElement>('[data-glow]').forEach((g) => {
          gsap.set(g, { opacity: 0 });
        });
      });

      // Show first design immediately
      if (designRefs.current[0]) {
        gsap.set(designRefs.current[0], { opacity: 1 });
        const firstEl = designRefs.current[0];
        firstEl.querySelectorAll<HTMLElement>('[data-part]').forEach((p) => {
          gsap.set(p, { opacity: 1, y: 0, scale: 1 });
        });
      }
      if (glowRef.current) glowRef.current.style.backgroundColor = DESIGNS[0].glow;

      // ── Per-card ScrollTrigger ───────────────────────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const design = designRefs.current[i];
        if (!design) return;

        const strokes = design.querySelectorAll<SVGElement>('[data-stroke]');
        const parts = design.querySelectorAll<HTMLElement>('[data-part]');
        const glows = design.querySelectorAll<HTMLElement>('[data-glow]');

        // Switch active card + glow color
        const activate = () => {
          designRefs.current.forEach((d, j) => {
            if (!d) return;
            gsap.to(d, { opacity: j === i ? 1 : 0, duration: 0.45, ease: 'power2.out', overwrite: true });
          });
          cardRefs.current.forEach((c, j) => {
            if (!c) return;
            c.dataset.active = j === i ? 'true' : 'false';
          });
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              backgroundColor: DESIGNS[i].glow,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.2,
            onEnter: activate,
            onEnterBack: activate,
          },
        });

        // Phase 1: draw outlines
        tl.to(strokes, { strokeDashoffset: 0, stagger: { each: 0.022, from: 'start' }, ease: 'none', duration: 0.45 }, 0);

        // Phase 2: parts appear
        tl.to(parts, { opacity: 1, y: 0, scale: 1, stagger: { each: 0.055, from: 'start' }, ease: 'power2.out', duration: 0.5 }, 0.25);

        // Phase 3: glow fills
        tl.to(glows, { opacity: 1, ease: 'power2.out', duration: 0.35 }, 0.65);
      });

      return () => { /* mm.revert() called below */ };
    });

    return () => { mm.revert(); };
  }, []);

  return (
    <>
      <style>{`
        /* ── BuildUpSection styles ──────────────────────────────────────── */
        .bu-section {
          display: flex;
          align-items: flex-start;
          width: calc(100% - var(--frame, 24px) * 2);
          max-width: 72rem;
          margin: clamp(6rem, 12vh, 10rem) auto 0;
        }
        .bu-left {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 48%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bu-canvas {
          position: relative;
          width: min(310px, 88%);
          aspect-ratio: 4/5;
        }
        .bu-glow {
          position: absolute;
          inset: -28%;
          border-radius: 50%;
          background: rgba(129,140,248,0.22);
          filter: blur(56px);
          pointer-events: none;
          z-index: 0;
        }
        .bu-design {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          will-change: opacity;
          z-index: 1;
        }
        .bu-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .bu-right {
          flex: 1;
          min-width: 0;
          padding-left: clamp(2rem, 5vw, 4.5rem);
          padding-top: 18vh;
          padding-bottom: 18vh;
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 7vh, 5.5rem);
        }
        .bu-card {
          padding: clamp(1.5rem, 3vw, 2.25rem);
          border-radius: 1.125rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
          transition: opacity 0.45s cubic-bezier(.22,1,.36,1),
                      transform 0.45s cubic-bezier(.22,1,.36,1),
                      border-color 0.45s ease,
                      background 0.45s ease;
          opacity: 0.32;
          transform: translateY(6px);
          cursor: default;
        }
        .bu-card[data-active='true'] {
          opacity: 1;
          transform: translateY(0);
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.05);
        }
        .bu-card-num {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--bu-accent, #818cf8);
          margin-bottom: 0.625rem;
          font-family: var(--font-body, system-ui, sans-serif);
        }
        .bu-card-title {
          font-size: clamp(1.4rem, 2.4vw, 2.125rem);
          font-weight: 500;
          color: #fff;
          margin: 0 0 0.75rem;
          line-height: 1.1;
          letter-spacing: -0.022em;
          font-family: var(--font-body, system-ui, sans-serif);
        }
        .bu-card-desc {
          font-size: clamp(0.875rem, 1.15vw, 1rem);
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0;
          max-width: 34ch;
          font-family: var(--font-body, system-ui, sans-serif);
        }
        .bu-card-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }
        .bu-card-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--bu-accent, #818cf8);
          opacity: 0.4;
          transition: opacity 0.4s ease, transform 0.4s ease;
          flex-shrink: 0;
        }
        .bu-card[data-active='true'] .bu-card-dot {
          opacity: 1;
          transform: scale(1.3);
        }
        .bu-card-hint {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: var(--font-body, system-ui, sans-serif);
          transition: color 0.4s ease;
        }
        .bu-card[data-active='true'] .bu-card-hint {
          color: var(--bu-accent, #818cf8);
          opacity: 0.75;
        }
        /* Mobile */
        @media (max-width: 767px) {
          .bu-section {
            flex-direction: column;
            width: 100%;
            margin: 3rem auto 0;
          }
          .bu-left {
            width: 100%;
            height: 58vw;
            min-height: 230px;
            max-height: 360px;
            position: sticky;
            top: 0;
            z-index: 10;
            background: var(--c-ink, #0d1117);
          }
          .bu-canvas { width: min(230px, 70%); }
          .bu-right {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-top: 1.5rem;
            padding-bottom: 5rem;
            gap: 1rem;
          }
          .bu-card { opacity: 1; transform: none; }
        }
      `}</style>

      <section ref={sectionRef} className="bu-section" aria-label="Product capabilities">

        {/* ─── LEFT: Sticky Visual Panel ──────────────────────────────── */}
        <div className="bu-left" ref={leftRef} aria-hidden="true">
          <div className="bu-canvas">
            {/* Soft radial glow — color changes per design */}
            <div className="bu-glow" ref={glowRef} />

            {/* All 4 designs stacked; GSAP controls which is visible */}
            {DESIGNS.map((design, i) => {
              const Svg = SVG_MAP[design.id];
              return (
                <div
                  key={design.id}
                  className="bu-design"
                  id={`bu-design-${design.id}`}
                  ref={(el) => { designRefs.current[i] = el; }}
                >
                  {Svg && <Svg color={design.accent} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── RIGHT: Scrolling Cards ──────────────────────────────────── */}
        <div className="bu-right">
          {DESIGNS.map((design, i) => (
            <div
              key={design.id}
              id={`bu-card-${design.id}`}
              className="bu-card"
              data-active={i === 0 ? 'true' : 'false'}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ '--bu-accent': design.accent } as React.CSSProperties}
            >
              <span className="bu-card-num">{design.number}</span>
              <h3 className="bu-card-title">{design.title}</h3>
              <p className="bu-card-desc">{design.description}</p>
              <div className="bu-card-footer">
                <span className="bu-card-dot" aria-hidden="true" />
                <span className="bu-card-hint">Scroll to build</span>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
