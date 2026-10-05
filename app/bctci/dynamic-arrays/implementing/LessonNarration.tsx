"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function LessonNarration() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setError("Audio could not play. Please try again.");
    }
  }

  return (
    <div className={styles.narration}>
      <button type="button" className={styles.narrationButton} onClick={togglePlayback}
        aria-controls="lesson-narration" aria-pressed={playing}
        aria-label={playing ? "Pause narration" : "Play lesson narration"}
        title={playing ? "Pause narration" : "Play lesson narration"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {playing ? (
            <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>
          ) : (
            <path d="M8 5.5a1 1 0 0 1 1.5-.86l11 6.5a1 1 0 0 1 0 1.72l-11 6.5A1 1 0 0 1 8 18.5z" />
          )}
        </svg>
      </button>
      <audio id="lesson-narration" ref={audioRef} controls preload="none"
        aria-label="Implementing dynamic arrays lesson narration"
        src="/audio/implementing-dynamic-arrays-siri-voice-2.m4a"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setPlaying(false); setError("Audio could not load. Please try again."); }} />
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
