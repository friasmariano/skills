'use client';

import { usePathname } from 'next/navigation';
import { findAppPage } from '@/config/pages';
import styles from '@/css/Banner.module.css';

export default function Banner() {
  const pathname = usePathname();
  const page = findAppPage(pathname);
  return (
    <section className={styles.container} aria-labelledby="app-hero-title">
      <div className={styles.content}>
        <h1 id="app-hero-title" className={styles.title}>{page?.title ?? 'Page not found'}</h1>
        <p className={styles.subtitle}>{page?.subtitle ?? 'Explore the developer gym using the sidebar.'}</p>
      </div>
      <div className={styles.base} aria-hidden="true" />
    </section>
  );
}
