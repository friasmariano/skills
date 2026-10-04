import SidebarLinks from './SidebarLinks';
import styles from '@/css/Sidebar.module.css';

export default function SidebarNew() {
  return <aside className={styles.desktop}><SidebarLinks /></aside>;
}
