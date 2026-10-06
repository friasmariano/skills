'use client';

import { useCallback, useEffect, useState } from 'react';
import SidebarNew from './SidebarNew';
import SidebarMobile from './SidebarMobile';
import SidebarToggler from './SidebarToggler';

export default function SidebarContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)');
    const handleResize = () => { if (media.matches) close(); };
    media.addEventListener('change', handleResize);
    return () => media.removeEventListener('change', handleResize);
  }, [close]);

  return <>
    <SidebarToggler isOpen={isOpen} onToggle={() => setIsOpen(open => !open)} />
    <SidebarNew isOpen={isDesktopOpen} onToggle={() => setIsDesktopOpen(open => !open)} />
    <SidebarMobile isOpen={isOpen} onClose={close} />
  </>;
}
