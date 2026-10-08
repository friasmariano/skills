'use client';

import { checklistSections } from '@/lib/features/greenwallet/checklist';
import { setAllCollapsed, toggleItem, toggleSection } from '@/lib/features/greenwallet/greenwallet-slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './page.module.css';

const levels = [
  { number: 1, title: 'Correctness and security', description: 'Establish safe ownership, financial rules, and authentication before handling real user data.' },
  { number: 2, title: 'Production readiness', description: 'Build on Level 1 with reliable writes, operations, and a repeatable verification workflow.' },
  { number: 3, title: 'Capabilities justified by requirements', description: 'Choose these capabilities when product requirements justify the additional complexity.' },
];

export default function GreenWalletPage() {
  const dispatch = useAppDispatch();
  const { completed, collapsed } = useAppSelector(state => state.greenwallet);
  const items = checklistSections.flatMap(section => section.items);
  const done = items.filter(item => completed[item.id]).length;
  const percentage = Math.round(done / items.length * 100);

  return (
    <article className={styles.page} aria-label="Greenwallet engineering checklist">
      <header className={styles.overview}>
        <div>
          <span className={styles.eyebrow}>GREENWALLET / API IMPROVEMENTS</span>
          <h2>A stronger foundation,<br />one step at a time.</h2>
          <p>Work through the financeM-api roadmap. Check off improvements and their required tests as you verify each section.</p>
          <span className={styles.saved}><i className="bi bi-check-circle" aria-hidden="true" /> Progress saved on this device</span>
        </div>
        <div className={styles.summary}>
          <span className={styles.trophy} aria-hidden="true"><i className={`bi ${done === items.length ? 'bi-trophy-fill' : 'bi-bar-chart-fill'}`} /></span>
          <strong>{percentage}%</strong>
          <p role="status">{done === items.length ? 'Checklist completed!' : `${done} of ${items.length} steps completed`}</p>
          <progress max={items.length} value={done} aria-label="Overall checklist completion" />
          <small>{done === items.length ? 'All improvements and verification tasks checked.' : 'Every verified step moves the API forward.'}</small>
        </div>
      </header>

      <div className={styles.toolbar}>
        <nav aria-label="Checklist levels">{levels.map(level => <a key={level.number} href={`#level-${level.number}`}>Level {level.number}</a>)}</nav>
        <div><button onClick={() => dispatch(setAllCollapsed(false))}>Open all</button><button onClick={() => dispatch(setAllCollapsed(true))}>Collapse all</button></div>
      </div>

      {levels.map(level => {
        const sections = checklistSections.filter(section => section.level === level.number);
        const levelItems = sections.flatMap(section => section.items);
        const levelDone = levelItems.filter(item => completed[item.id]).length;
        return (
          <section key={level.number} id={`level-${level.number}`} className={styles.level} aria-labelledby={`level-title-${level.number}`}>
            <header className={styles.levelHeading}>
              <span className={styles.levelNumber}>0{level.number}</span>
              <div><h2 id={`level-title-${level.number}`}>{level.title}</h2><p>{level.description}</p></div>
              <span className={styles.levelCount}>{levelDone} / {levelItems.length}</span>
            </header>
            <div className={styles.cards}>
              {sections.map(section => {
                const sectionDone = section.items.filter(item => completed[item.id]).length;
                const isOpen = !collapsed[section.id];
                return (
                  <section key={section.id} className={styles.card} aria-labelledby={`${section.id}-title`}>
                    <div className={styles.cardHeading}>
                      <div><span className={styles.eyebrow}>{sectionDone === section.items.length ? 'SECTION COMPLETE' : `LEVEL ${level.number} / ${section.items.length} STEPS`}</span><h3 id={`${section.id}-title`}>{section.title}</h3></div>
                      <button className={styles.toggle} onClick={() => dispatch(toggleSection(section.id))} aria-expanded={isOpen} aria-controls={`${section.id}-content`} aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${section.title}`}><i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`} aria-hidden="true" /></button>
                    </div>
                    <div className={styles.segments} role="progressbar" aria-label={`${section.title} completion`} aria-valuemin={0} aria-valuemax={section.items.length} aria-valuenow={sectionDone}>{section.items.map(item => <span key={item.id} className={completed[item.id] ? styles.filled : ''} />)}</div>
                    <p className={styles.count}>{sectionDone} of {section.items.length} steps completed</p>
                    <div id={`${section.id}-content`} hidden={!isOpen}>
                      {(['improvement', 'test'] as const).map(kind => {
                        const group = section.items.filter(item => item.kind === kind);
                        if (!group.length) return null;
                        return <div key={kind} className={styles.group}><h4>{kind === 'test' ? 'Required tests' : 'Improvements'}</h4><ul>{group.map(item => <li key={item.id}><label className={completed[item.id] ? styles.checked : ''}><input type="checkbox" checked={Boolean(completed[item.id])} onChange={() => dispatch(toggleItem(item.id))} /><span>{item.text}</span></label></li>)}</ul></div>;
                      })}
                      {section.acceptance && <div className={styles.acceptance}><i className="bi bi-flag" aria-hidden="true" /><p><strong>Acceptance</strong>{section.acceptance}</p></div>}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        );
      })}
      <aside className={styles.note}><strong>Work in order. Verify the behavior.</strong><p>Levels are cumulative. Start with a PostgreSQL-backed test harness and two-user fixtures, then address ownership, financial validation, authentication, and API errors before production readiness. Choose Level 3 work from actual requirements.</p><p>The source review covered selected files and did not execute application tests. Unchecked items represent work or verification tasks; they do not establish that a capability is absent.</p></aside>
    </article>
  );
}
