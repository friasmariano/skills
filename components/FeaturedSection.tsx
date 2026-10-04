"use client";

import { featuredSections } from "@/config/featuredSections";
import styles from "@/css/FeaturedSection.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFocusedCard } from "@/lib/features/featured/store/featured-slice";



export default function FeaturedSection() {
  const dispatch = useAppDispatch();
  const focusedCardId = useAppSelector((state) => state.featured.focusedCardId);
  const isDark = useAppSelector((state) => state.theme.data.isDark);

  return (
    <section className={styles.section} data-theme={isDark ? "dark" : "light"} aria-labelledby="featured-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Ideas into practice</p>
        <h2 id="featured-heading" className={styles.heading}>Featured explorations</h2>
      </header>
      <ul className={styles.grid}>
        {featuredSections.map((feature, index) => (
          <li id={feature.id} key={feature.id} className={`${styles.card} ${focusedCardId === feature.id ? styles.highlighted : ""}`}>
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
              aria-pressed={focusedCardId === feature.id}
              aria-label={`Focus on ${feature.title}`}
              onClick={() => dispatch(setFocusedCard(feature.id))}
            >
              {focusedCardId === feature.id ? "In focus" : "Focus this card"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
