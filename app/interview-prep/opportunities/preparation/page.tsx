"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { togglPreparationSteps } from "@/config/preparationPaths";
import { togglePreparationStep } from "@/lib/features/opportunities/store/opportunities-slice";
import styles from "@/css/Opportunities.module.css";

export default function PreparationPage() {
  const dispatch = useAppDispatch();
  const opportunity = useAppSelector(state =>
    state.opportunities.items.find(item => item.id === state.opportunities.focusedId)
  );
  const completed = useAppSelector(state => opportunity
    ? state.opportunities.completedPreparationSteps?.[opportunity.id] ?? []
    : []);
  const hasPath = opportunity?.id === "toggl-senior-full-stack";
  const completedCount = togglPreparationSteps.filter(step => completed.includes(step.id)).length;

  return (
    <div className={styles.page}>
      <Link className={styles.preparationLink} href="/interview-prep/opportunities">Back to opportunities</Link>
      {opportunity ? (
        <section className={styles.addSection} aria-labelledby="preparation-heading">
          <p className={styles.company}>{opportunity.company} · In focus</p>
          <h2 id="preparation-heading">{opportunity.role} preparation</h2>
          <p className={styles.intro}>
            Follow a preparation path tailored to this opportunity, with assessment
            requirements, practice tasks, and review milestones in one place.
          </p>
          {hasPath ? (
            <>
              <div className={styles.assessmentSummary}>
                <span className={styles.badge}>11 questions</span>
                <span className={styles.badge}>32 minutes max</span>
                <span className={styles.badge}>30–240 seconds per question</span>
                <span className={styles.badge}>3 unscored practice questions</span>
              </div>
              <p className={styles.intro}>Based on your supplied assessment overview and preparation notes. Work through the steps in order, then mark each one complete.</p>
              <a className={styles.preparationLink} href="https://toggl.com/candidate-booklet/" target="_blank" rel="noopener noreferrer">Read Toggl’s candidate booklet (opens in a new tab)</a>
              <div className={styles.progress}>
                <label htmlFor="preparation-progress">{completedCount} of {togglPreparationSteps.length} steps complete</label>
                <progress id="preparation-progress" max={togglPreparationSteps.length} value={completedCount} />
              </div>
              <ol className={styles.path}>
                {togglPreparationSteps.map((step, index) => (
                  <li key={step.id} className={styles.card}>
                    <p className={styles.company}>Step {index + 1}</p>
                    <h3>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    <ul className={styles.tasks}>{step.tasks.map(task => <li key={task}>{task}</li>)}</ul>
                    <label className={styles.completion}>
                      <input type="checkbox" checked={completed.includes(step.id)} onChange={() => dispatch(togglePreparationStep({ opportunityId: opportunity.id, stepId: step.id }))} />
                      Mark “{step.title}” complete
                    </label>
                  </li>
                ))}
              </ol>
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
    </div>
  );
}
