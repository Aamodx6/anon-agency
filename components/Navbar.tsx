'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useMenu } from '../context/MenuContext';

interface NavbarProps {
  variant?: 'hero' | 'dev';
}

export function Navbar({ variant = 'dev' }: NavbarProps) {
  const { isOpen, toggle } = useMenu();

  return (
    <header
      className={`Navbar-module__O8Na-a__navbar Navbar-module__O8Na-a__${variant}`}
      data-node-id="45:284"
      data-site-nav={variant}
    >
      <Link href="/" className="Navbar-module__O8Na-a__logoLink" aria-label="Anon, home">
        <Logo />
      </Link>
      <div className="Navbar-module__O8Na-a__actions">
        <Link href="/contacts" className="Navbar-module__O8Na-a__contactPill">
          get in touch.
        </Link>
        <button
          type="button"
          className="Navbar-module__O8Na-a__menuPill"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          data-open={isOpen ? "true" : "false"}
          onClick={toggle}
        >
          <span className="Navbar-module__O8Na-a__pillLabel" aria-hidden="true">
            <span className="Navbar-module__O8Na-a__pillWordOut">menu.</span>
            <span className="Navbar-module__O8Na-a__pillWordIn">close.</span>
          </span>
          <span className="Navbar-module__O8Na-a__burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
}
