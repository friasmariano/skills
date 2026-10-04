"use client";

import styles from "@/css/FeaturedSection.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFocusedCard, type FeaturedCardId } from "@/lib/features/featured/store/featured-slice";

const features = [
  { title: "Beyond Cracking the Coding Interview", category: "Problem solving", description: "Explore the thinking behind the solution, from first principles to confident implementation.", symbol: "{ }" },
  { title: "Front End Challenges", category: "Build & explore", description: "Turn interface ideas into thoughtful, responsive experiences, one challenge at a time.", symbol: "</>" },
  { title: "React Playground", category: "Experimentation", description: "A space to explore components, interactions, and new ways to build with React.", symbol: "⌘" },
  { title: "Typescript Adventures", category: "Type it better", description: "Discover expressive types and practical patterns for more reliable code.", symbol: "TS" },
];

export default function FeaturedSection() {
  const dispatch = useAppDispatch();
  const focusedCardId = useAppSelector((state) => state.featured.focusedCardId);
  const isDark = useAppSelector((state) => state.theme.data.isDark);
  const cardIds: FeaturedCardId[] = ["interview", "frontend", "react", "typescript"];

  return (
    <section className={styles.section} data-theme={isDark ? "dark" : "light"} aria-labelledby="featured-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Ideas into practice</p>
        <h2 id="featured-heading" className={styles.heading}>Featured explorations</h2>
      </header>
      <ul className={styles.grid}>
        {features.map((feature, index) => (
          <li key={feature.title} className={`${styles.card} ${focusedCardId === cardIds[index] ? styles.highlighted : ""}`}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{feature.category}</span>
              <span className={styles.number}>0{index + 1}</span>
            </div>
            <span className={styles.symbol} aria-hidden="true">{feature.symbol}</span>
            <div className={styles.content}>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
            <button
              type="button"
              className={styles.focusButton}
              aria-pressed={focusedCardId === cardIds[index]}
              aria-label={`Focus on ${feature.title}`}
              onClick={() => dispatch(setFocusedCard(cardIds[index]))}
            >
              {focusedCardId === cardIds[index] ? "In focus" : "Focus this card"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
