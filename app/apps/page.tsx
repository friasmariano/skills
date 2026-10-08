import Link from 'next/link';
import styles from './greenwallet/page.module.css';

export default function AppsPage() {
  return (
    <section className={styles.page} aria-label="Applications">
      <header className={styles.overview}><div><span className={styles.eyebrow}>BUILD / IMPROVE / VERIFY</span><h2>Your applications,<br />moving forward.</h2><p>Turn engineering improvements into a roadmap you can work through and track.</p></div></header>
      <Link href="/apps/greenwallet" className={styles.card} style={{ display: 'block', textDecoration: 'none' }}>
        <span className={styles.eyebrow}>ENGINEERING CHECKLIST</span>
        <h3>Greenwallet <span aria-hidden="true">↗</span></h3>
        <p>Financial correctness, security, and production readiness. Three levels, ten sections, and progress saved as you go.</p>
      </Link>
    </section>
  );
}
