'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { appPages, type AppPage } from '@/config/pages';
import styles from '@/css/Sidebar.module.css';

export default function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/+$/, '') || '/';

  function renderPages(pages: AppPage[], nested = false) {
    return (
      <ul className={nested ? `${styles.links} ${styles.nested}` : styles.links}>
        {pages.map(page => (
          <li key={page.href}>
            <Link href={page.href} title={page.title}
              className={`${styles.link} ${currentPath === page.href ? styles.active : ''} ${page.href !== '/' && currentPath.startsWith(`${page.href}/`) ? styles.ancestor : ''}`}
              aria-current={currentPath === page.href ? 'page' : undefined}
              onClick={onNavigate}>
              <span className={styles.label}>{page.navigationTitle ?? page.title}</span>
            </Link>
            {page.children && renderPages(page.children, true)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <nav aria-label="App pages">
      {renderPages(appPages)}
    </nav>
  );
}
