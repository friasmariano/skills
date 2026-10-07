"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { togglPreparationSteps, type PreparationStep } from "@/config/preparationPaths";
import { togglePreparationStep } from "@/lib/features/opportunities/store/opportunities-slice";
import styles from "@/css/Opportunities.module.css";
import pathStyles from "@/css/PreparationPath.module.css";
import TechnicalReview from "./TechnicalReview";
import PreparationStepModal from "./PreparationStepModal";

export default function PreparationPage() {
  const dispatch = useAppDispatch();
  const [selectedStep, setSelectedStep] = useState<PreparationStep | null>(null);
  const opportunity = useAppSelector(state =>
    state.opportunities.items.find(item => item.id === state.opportunities.focusedId)
  );
  const completed = useAppSelector(state => opportunity
    ? state.opportunities.completedPreparationSteps?.[opportunity.id] ?? []
    : []);
  const hasPath = opportunity?.id === "toggl-senior-full-stack";
  const completedCount = togglPreparationSteps.filter(step => completed.includes(step.id)).length;

  return (
    <div className={`${styles.page} ${pathStyles.page}`}>
      <Link className={styles.preparationLink} href="/interview-prep/opportunities">Back to opportunities</Link>
      {opportunity ? (
        <section className={styles.addSection} aria-labelledby="preparation-heading">
          <header className={pathStyles.banner}>
          <div className={pathStyles.bannerHeading}>
          <p className={pathStyles.bannerCompany}>{opportunity.company} · In focus</p>
          <h2 id="preparation-heading">{opportunity.role} preparation</h2>
          <p className={styles.intro}>
            Follow a preparation path tailored to this opportunity, with assessment
            requirements, practice tasks, and review milestones in one place.
          </p>
          </div>
          {hasPath && (
            <div className={pathStyles.bannerDetails}>
              <div className={pathStyles.bannerStats}>
                <span><strong>11</strong> questions</span>
                <span><strong>32 min</strong> maximum</span>
                <span><strong>30–240 sec</strong> per question</span>
                <span><strong>3</strong> unscored practice questions</span>
              </div>
              <p>Based on your supplied assessment overview and preparation notes. Work through the steps in order, then mark each one complete.</p>
              <a className={pathStyles.bannerLink} href="https://toggl.com/candidate-booklet/" target="_blank" rel="noopener noreferrer">Read Toggl’s candidate booklet <span>(opens in a new tab) ↗</span></a>
            </div>
          )}
          </header>
          {hasPath ? (
            <>
              <div className={pathStyles.progress}>
                <progress id="preparation-progress" max={togglPreparationSteps.length} value={completedCount} />
                <label htmlFor="preparation-progress" aria-live="polite">{completedCount} of {togglPreparationSteps.length} steps complete</label>
              </div>
              <ol className={pathStyles.path}>
                {togglPreparationSteps.map((step, index) => (
                  <li key={step.id} className={pathStyles.step} data-complete={completed.includes(step.id)}>
                    <div className={pathStyles.marker} aria-hidden="true">
                      <span className={pathStyles.pill}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={pathStyles.cylinder}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          {completed.includes(step.id) ? <path d="m5 12 4 4L19 6" /> : <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>}
                        </svg>
                      </span>
                    </div>
                    <div className={`${pathStyles.content} ${pathStyles.whiteboard}`}>
                    <p className={pathStyles.eyebrow}>Step {index + 1} · {completed.includes(step.id) ? "Complete" : "To prepare"}</p>
                    <h3>{step.title}</h3>
                    <button
                      type="button"
                      className={pathStyles.detailsButton}
                      aria-haspopup="dialog"
                      aria-label={`Show details: ${step.title}`}
                      onClick={() => setSelectedStep(step)}
                    >Show details</button>
                    <label className={styles.completion}>
                      <input type="checkbox" checked={completed.includes(step.id)} onChange={() => dispatch(togglePreparationStep({ opportunityId: opportunity.id, stepId: step.id }))} />
                      Mark “{step.title}” complete
                    </label>
                    </div>
                  </li>
                ))}
              </ol>
              <PreparationStepModal step={selectedStep} onClose={() => setSelectedStep(null)} />
            </>
          ) : (
            <p className={styles.empty}>A preparation path has not been added for this opportunity yet.</p>
          )}
        </section>
      ) : (
        <section className={styles.addSection} aria-labelledby="preparation-heading">
          <h2 id="preparation-heading">Choose an opportunity to prepare for</h2>
          <p className={styles.intro}>Set an opportunity in focus on the opportunities page to open its preparation path.</p>
        </section>
      )}
      <TechnicalReview />
    </div>
  );
}
