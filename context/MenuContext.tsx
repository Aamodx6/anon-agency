'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface MenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
  lenisRef: React.MutableRefObject<any>;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lockCountRef = useRef(0);
  const lenisRef = useRef<any>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const lockScroll = useCallback(() => {
    lockCountRef.current++;
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current === 0 && !isOpen) {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenisRef.current = (window as any).__lenis;
    }
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, open, close, toggle, lockScroll, unlockScroll, lenisRef }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
