import SidebarLinks from './SidebarLinks';
import styles from '@/css/Sidebar.module.css';

export default function SidebarNew({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <>
      <button type="button" className={styles.desktopToggle} onClick={onToggle}
        aria-label={isOpen ? 'Collapse section navigation' : 'Expand section navigation'}
        aria-expanded={isOpen} aria-controls="desktop-sidebar-links">
        <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`} aria-hidden="true" />
      </button>
      <aside className={`${styles.desktop} ${isOpen ? '' : styles.collapsed}`}>
      <div id="desktop-sidebar-links" className={styles.desktopLinks} inert={!isOpen} aria-hidden={!isOpen}><SidebarLinks /></div>
    </aside>
    </>
  );
}
