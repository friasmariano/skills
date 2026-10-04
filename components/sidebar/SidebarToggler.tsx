import styles from '@/css/Sidebar.module.css';

export default function SidebarToggler({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={styles.toggler} onClick={onToggle}
      aria-label={isOpen ? 'Close section navigation' : 'Open section navigation'}
      aria-expanded={isOpen} aria-controls="mobile-sidebar">
      <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`} aria-hidden="true" />
    </button>
  );
}
