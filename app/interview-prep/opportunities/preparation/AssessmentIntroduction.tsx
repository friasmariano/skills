import styles from "@/css/PreparationPath.module.css";

const vocabulary = [
  ["capacity", "how much of a person's working time is already committed, against how much they have available in a period"],
  ["utilisation", "the share of someone's available time that is booked to client or project work"],
  ["billable rate", "the hourly amount a client is charged for a person's time, which can differ per client, project or person"],
  ["margin", "what is left of what a client is billed once the cost of the time spent on their work is taken off"],
  ["timesheet approval", "the step where a manager reviews and signs off the hours a person logged for a period before those hours can be billed or reported on"],
  ["time entry", "a single record of time spent, either run on a timer or typed in afterwards, attached to a project and optionally a task"],
];

export default function AssessmentIntroduction({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.assessmentIntroduction}>
      <p className={styles.assessmentIntro}>Worth a minute — both change how you should approach the questions. Nothing has started yet, so take as long as you like, and come back later if you would rather.</p>
      <section className={styles.productCard} aria-labelledby="assessment-product-heading">
        <h3 id="assessment-product-heading"><i className="bi bi-boxes" aria-hidden="true" />About the product</h3>
        <p>Toggl’s current candidate booklet describes a unified modular platform for time tracking, planning, and insights. Customers use time data to understand workloads, utilisation, and profitability. Some questions are set in that world, so they use its vocabulary:</p>
        <ul>{vocabulary.map(([term, definition]) => <li key={term}><strong>{term}</strong> — {definition}</li>)}</ul>
        <p>Every question explains the terms it relies on, so you can answer them all from what is on the screen.</p>
      </section>
      <section className={styles.expectationsCard} aria-labelledby="assessment-expectations-heading">
        <h3 id="assessment-expectations-heading"><i className="bi bi-bullseye" aria-hidden="true" />What we&apos;re looking for</h3>
        <p>Some open questions are <strong>intentionally</strong> timed and designed to be answered in just a few minutes. We&apos;re not expecting long, fully polished, or exhaustive answers. What matters is your ability to quickly identify what counts, structure your thinking, and communicate the most relevant points clearly and concisely, including key trade-offs, assumptions, or metrics where relevant.</p>
      </section>
      <button type="button" className={styles.assessmentToggle} onClick={onBack}><i className="bi bi-chevron-left" aria-hidden="true" />Back to assessment format</button>
    </div>
  );
}
