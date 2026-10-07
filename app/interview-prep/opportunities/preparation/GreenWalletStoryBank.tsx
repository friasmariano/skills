import { greenWalletStories } from "@/config/greenWalletStories";
import styles from "./GreenWalletStoryBank.module.css";

const storyFields = [
  ["situation", "Situation"],
  ["problem", "Problem"],
  ["decision", "Decision"],
  ["why", "Why"],
  ["validation", "Validation"],
  ["result", "Result"],
  ["learning", "Learning"],
] as const;

export default function GreenWalletStoryBank() {
  return (
    <section id="greenwallet-story-bank" className={styles.bank} aria-labelledby="greenwallet-stories-heading">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>GreenWallet · Step 09 · High priority</p>
        <h3 id="greenwallet-stories-heading">Your story wallet</h3>
        <p>Six evidence-based stories for Outcome Story questions. Open a card to rehearse the decision, reasoning, validation, and outcome.</p>
        <p className={styles.note}>From your supplied story bank, grounded in code and Git history. Use “I” where it reflects your contribution. Reasons and lessons are suggested framing; the repository cannot establish your thought process, historical test results, or whether a technology was unfamiliar to you.</p>
      </header>
      <ol className={styles.cards}>
        {greenWalletStories.map((story, index) => (
          <li key={story.id} className={styles.card} data-color={story.color}>
            <article aria-labelledby={`gw-story-${story.id}`}>
              <header className={styles.cardHeader}>
                <span className={styles.brand}><span className={styles.logo} aria-hidden="true">GW</span> GreenWallet</span>
                <span className={styles.number}>Story {String(index + 1).padStart(2, "0")}</span>
              </header>
              <div className={styles.preview}>
                <p className={styles.topic}>{story.topic}</p>
                <h4 id={`gw-story-${story.id}`}>{story.title}</h4>
                <p className={styles.situation}>{story.situation}</p>
              </div>
              <details className={styles.details}>
                <summary>Open story <span className={styles.chevron} aria-hidden="true">⌄</span><span className={styles.srOnly}>: {story.title}</span></summary>
                <div className={styles.story}>
                  {story.caveat && <p className={styles.caveat}>{story.caveat}</p>}
                  <dl>
                    {storyFields.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{story[key]}</dd></div>)}
                  </dl>
                  <section className={styles.evidence} aria-label="Implementation evidence">
                    <h5>Implementation evidence</h5>
                    <p>Paths relative to the GreenWallet workspace</p>
                    <ul>{story.evidence.map(item => <li key={item}><code>{item}</code></li>)}</ul>
                  </section>
                </div>
              </details>
            </article>
          </li>
        ))}
      </ol>
      <p className={styles.note}>Keep results at the level the evidence supports: “I implemented…”, “the change allowed…”, or “the code now checks…”. Add historical observations only where you personally remember and can defend them.</p>
    </section>
  );
}
