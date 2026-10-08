'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { appPages, type AppPage } from '@/config/pages';
import styles from '@/css/Sidebar.module.css';

export default function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/+$/, '') || '/';
  const navigationId = useId();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function renderPages(pages: AppPage[], nested = false) {
    return (
      <ul className={nested ? `${styles.links} ${styles.nested}` : styles.links}>
        {pages.map(page => {
          const hasChildren = Boolean(page.children?.length);
          const isCurrentSection = currentPath === page.href || currentPath.startsWith(`${page.href}/`);
          const stateKey = `${currentPath}:${page.href}`;
          const isExpanded = expanded[stateKey] ?? isCurrentSection;
          const childrenId = `${navigationId}-${page.href.replaceAll('/', '-')}`;
          return (
          <li key={page.href}>
            <div className={`${styles.linkRow} ${hasChildren ? styles.hasChildren : ''}`}>
            <Link href={page.href} title={page.title}
              className={`${styles.link} ${currentPath === page.href ? styles.active : ''} ${page.href !== '/' && currentPath.startsWith(`${page.href}/`) ? styles.ancestor : ''}`}
              aria-current={currentPath === page.href ? 'page' : undefined}
              onClick={onNavigate}>
              <span className={styles.label}>{page.navigationTitle ?? page.title}</span>
            </Link>
            {hasChildren && (
              <button type="button" className={styles.sectionToggle}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${page.navigationTitle ?? page.title}`}
                aria-expanded={isExpanded} aria-controls={childrenId}
                onClick={() => setExpanded(previous => ({ ...previous, [stateKey]: !isExpanded }))}>
                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`} aria-hidden="true" />
              </button>
            )}
            </div>
            {hasChildren && <div id={childrenId} hidden={!isExpanded}>{renderPages(page.children!, true)}</div>}
          </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label="App pages">
      {renderPages(appPages)}
    </nav>
  );
}
