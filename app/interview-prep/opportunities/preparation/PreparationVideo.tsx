import type { PreparationVideo as Video } from "@/config/preparationPaths";
import styles from "./PreparationVideo.module.css";

type Props = { video: Video } & (
  | { showPlayer: true; onWatch?: never }
  | { showPlayer?: false; onWatch: () => void }
);

export default function PreparationVideo({ video, showPlayer = false, onWatch }: Props) {
  const params = new URLSearchParams();
  if (video.startSeconds !== undefined) params.set("start", String(video.startSeconds));
  if (video.endSeconds !== undefined) params.set("end", String(video.endSeconds));
  const query = params.size ? `?${params.toString()}` : "";

  return (
    <div className={`${styles.video} ${showPlayer ? styles.expanded : styles.compact}`}>
      <p className={styles.label}>Reinforce learning · {video.duration}</p>
      {showPlayer && (
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}${query}`}
          title={`${video.title} by ${video.channel}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      {showPlayer ? <p className={styles.title}>{video.title}</p> : (
        <button className={styles.watchButton} type="button" onClick={onWatch} aria-haspopup="dialog" aria-label={`Watch video: ${video.title}`}>
          <span aria-hidden="true">▶</span> Watch video · {video.duration}
        </button>
      )}
      {!showPlayer && <p className={styles.title}>{video.title}</p>}
      <p className={styles.meta}>{video.channel} · {video.focus}</p>
      {showPlayer && <p className={styles.practice}><strong>After watching:</strong> {video.practice}</p>}
    </div>
  );
}
