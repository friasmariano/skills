'use client';

import { useEffect, useRef } from 'react';
import SidebarLinks from './SidebarLinks';
import styles from '@/css/Sidebar.module.css';

export default function SidebarMobile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) dialog?.showModal();
    else dialog?.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} id="mobile-sidebar" className={styles.mobile}
      aria-label="Section navigation" onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.drawer}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close section navigation">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
        <SidebarLinks onNavigate={onClose} />
      </div>
    </dialog>
  );
}
