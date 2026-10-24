'use client';

import React from 'react';

interface ServiceDiagramProps {
  figure: string;
}

export function ServiceDiagram({ figure }: ServiceDiagramProps) {
  if (figure === '02') {
    return (
      <svg className="ServiceDiagram__svg ServiceDiagram__svg--devices" viewBox="0 0 480 340" aria-hidden="true" focusable="false">
        {/* Background grid */}
        <g className="ServiceDiagram__grid">
          <path d="M0 60h480M0 130h480M0 200h480M0 270h480M80 0v340M180 0v340M280 0v340M380 0v340" />
        </g>

        {/* Left phone — shorter, mid-height */}
        <g className="ServiceDiagram__devices">
          <rect x="42" y="110" width="88" height="150" rx="10" />
          {/* avatar circle */}
          <circle cx="86" cy="148" r="14" />
          {/* content lines */}
          <line x1="58" y1="172" x2="114" y2="172" />
          <line x1="58" y1="186" x2="100" y2="186" />
          {/* pill button */}
          <rect x="62" y="200" width="48" height="12" rx="6" />
          {/* notch indicator */}
          <line x1="78" y1="224" x2="94" y2="224" />
        </g>

        {/* Center phone — tallest, most prominent */}
        <g className="ServiceDiagram__devices">
          <rect x="176" y="40" width="96" height="195" rx="11" />
          {/* avatar circle */}
          <circle cx="224" cy="84" r="16" />
          {/* content lines */}
          <line x1="190" y1="112" x2="258" y2="112" />
          <line x1="190" y1="128" x2="244" y2="128" />
          <line x1="190" y1="144" x2="252" y2="144" />
          {/* pill button */}
          <rect x="196" y="162" width="56" height="14" rx="7" />
          {/* bottom indicator */}
          <line x1="210" y1="218" x2="238" y2="218" />
        </g>

        {/* Right phone — shorter, lower position */}
        <g className="ServiceDiagram__devices">
          <rect x="322" y="148" width="88" height="148" rx="10" />
          {/* avatar circle */}
          <circle cx="366" cy="185" r="14" />
          {/* content lines */}
          <line x1="338" y1="208" x2="394" y2="208" />
          <line x1="338" y1="222" x2="376" y2="222" />
          {/* pill button */}
          <rect x="342" y="236" width="48" height="12" rx="6" />
          {/* notch indicator */}
          <line x1="356" y1="276" x2="376" y2="276" />
        </g>

        {/* Bezier connector: left phone → center phone */}
        <path
          className="ServiceDiagram__connector"
          d="M130 185 C155 185 155 135 176 135"
        />
        {/* Bezier connector: center phone → right phone */}
        <path
          className="ServiceDiagram__connector"
          d="M272 175 C297 175 297 220 322 220"
        />
      </svg>
    );
  }

  if (figure === '03') {
    return (
      <svg className="ServiceDiagram__svg ServiceDiagram__svg--branding" viewBox="0 0 460 320" aria-hidden="true" focusable="false">
        {/* Bezier curves forming a rounded "B"-like letterform */}
        <g className="ServiceDiagram__brandingPaths">
          {/* Outer B stroke — spine */}
          <path d="M90 60 L90 260" />
          {/* Top bowl outer */}
          <path d="M90 60 C90 60 200 60 230 100 C260 140 240 168 200 172" />
          {/* Top bowl inner */}
          <path d="M90 172 C90 172 200 172 230 100" />
          {/* Bottom bowl outer */}
          <path d="M90 172 C90 172 220 172 255 216 C280 248 248 260 200 260" />
          {/* Bottom bowl inner close */}
          <path d="M200 260 L90 260" />
        </g>

        {/* Handle lines (control point arms) */}
        <g className="ServiceDiagram__brandingHandles">
          {/* Top bowl top-right control arms */}
          <line x1="200" y1="60" x2="245" y2="60" />
          <line x1="200" y1="60" x2="160" y2="60" />
          {/* Top bowl apex control arms */}
          <line x1="245" y1="100" x2="260" y2="120" />
          <line x1="245" y1="100" x2="260" y2="80" />
          {/* Mid junction control arms */}
          <line x1="200" y1="172" x2="240" y2="172" />
          <line x1="200" y1="172" x2="155" y2="172" />
          {/* Bottom bowl right control arms */}
          <line x1="255" y1="216" x2="285" y2="200" />
          <line x1="255" y1="216" x2="280" y2="236" />
          {/* Bottom close control arms */}
          <line x1="200" y1="260" x2="240" y2="260" />
          <line x1="200" y1="260" x2="160" y2="260" />
        </g>

        {/* Square anchor nodes */}
        <g className="ServiceDiagram__brandingNodes">
          <rect x="86"  y="56"  width="8" height="8" />  {/* top-left (spine top) */}
          <rect x="196" y="56"  width="8" height="8" />  {/* top bowl top-right */}
          <rect x="86"  y="168" width="8" height="8" />  {/* mid-left (spine mid) */}
          <rect x="196" y="168" width="8" height="8" />  {/* mid junction */}
          <rect x="251" y="212" width="8" height="8" />  {/* bottom bowl apex */}
          <rect x="196" y="256" width="8" height="8" />  {/* bottom-right */}
          <rect x="86"  y="256" width="8" height="8" />  {/* bottom-left (spine bottom) */}
        </g>

        {/* Circular control handle points */}
        <g className="ServiceDiagram__brandingControlPts">
          <circle cx="245" cy="60"  r="4" />
          <circle cx="160" cy="60"  r="4" />
          <circle cx="260" cy="80"  r="4" />
          <circle cx="260" cy="120" r="4" />
          <circle cx="240" cy="172" r="4" />
          <circle cx="155" cy="172" r="4" />
          <circle cx="285" cy="200" r="4" />
          <circle cx="280" cy="236" r="4" />
          <circle cx="240" cy="260" r="4" />
          <circle cx="160" cy="260" r="4" />
        </g>
      </svg>
    );
  }

  if (figure === '04') {
    return (
      <svg className="ServiceDiagram__svg ServiceDiagram__svg--orbit" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
        <g className="ServiceDiagram__orbit">
          <circle cx="220" cy="155" r="72" />
          <ellipse cx="220" cy="155" rx="145" ry="38" transform="rotate(-18 220 155)" />
          <circle className="ServiceDiagram__planet" cx="348" cy="124" r="14" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className="ServiceDiagram__svg"
      viewBox="0 0 420 300"
      aria-hidden="true"
      focusable="false"
    >
      <g className="ServiceDiagram__lines">
        <path d="M210 28v48M210 76v42M210 118H92M210 118h118M92 118v55M210 118v55M328 118v55M92 173H34M92 173h116M210 173h116M328 173h58M210 173v52M92 225v42M328 225v42" />
      </g>
      <g className="ServiceDiagram__nodes">
        <rect x="172" y="10" width="76" height="36" />
        <rect x="172" y="100" width="76" height="36" />
        <rect x="54" y="155" width="76" height="36" />
        <rect x="172" y="155" width="76" height="36" />
        <rect x="290" y="155" width="76" height="36" />
        <rect x="54" y="207" width="76" height="36" />
        <rect x="290" y="207" width="76" height="36" />
      </g>
      <g className="ServiceDiagram__handles">
        <circle cx="210" cy="76" r="3" />
        <circle cx="210" cy="118" r="3" />
        <circle cx="92" cy="173" r="3" />
        <circle cx="210" cy="173" r="3" />
        <circle cx="328" cy="173" r="3" />
        <circle cx="210" cy="225" r="3" />
      </g>
    </svg>
  );
}
