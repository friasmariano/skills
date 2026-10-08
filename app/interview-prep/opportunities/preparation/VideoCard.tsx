import styles from "./VideoCard.module.css";

type Props = {
  title: string;
  presenter: string;
  focus: string;
  timing: string;
} & (
  | { href: string; onWatch?: never }
  | { href?: never; onWatch: () => void }
);

export default function VideoCard({ title, presenter, focus, timing, href, onWatch }: Props) {
  const content = <>
    <span className={styles.identity}>
      <span className={styles.play} aria-hidden="true"><svg viewBox="0 0 32 32" fill="currentColor"><path d="M11 6v20l17-10z" /></svg></span>
      <span className={styles.copy}>
        <span className={styles.eyebrow}>Video lesson · {timing}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.presenter}>{presenter}</span>
      </span>
    </span>
    <span className={styles.focus}>
      <span className={styles.focusLabel}>Study focus</span>
      <span>{focus}</span>
      <span className={styles.action}>{href ? "Open video resource ↗" : "Watch video →"}</span>
    </span>
  </>;

  return href
    ? <a className={styles.card} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open video resource: ${title} (opens in a new tab)`}>{content}</a>
    : <button className={styles.card} type="button" onClick={onWatch} aria-haspopup="dialog" aria-label={`Watch video: ${title}`}>{content}</button>;
}
