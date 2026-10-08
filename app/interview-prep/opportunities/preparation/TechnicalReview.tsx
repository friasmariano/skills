import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { reviewTopics } from "./reviewTopics";
import styles from "./TechnicalReview.module.css";

export default function TechnicalReview({ topicIds }: { topicIds?: string[] }) {
  const topics = topicIds ? topicIds.map(id => reviewTopics.find(topic => topic.id === id)!).filter(Boolean) : reviewTopics;
  const headingId = `technical-review-${topicIds?.join("-") ?? "all"}`;
  return (
    <section className={styles.review} aria-labelledby={headingId}>
      <h2 id={headingId}>Technical review</h2>
      <p>Open a topic to review the concepts, methods, examples, and interview exercises.</p>
      {topics.map((topic) => (
        <details key={topic.id} className={styles.topic}>
          <summary><span>{topic.title}</span><span className={styles.count}>{topic.entries.length} reference entries</span></summary>
          <div className={styles.body}>
            <p>{topic.intro}</p>
            <nav className={styles.index} aria-label={`${topic.title} methods`}>
              {topic.entries.map((entry, index) => (
                <a key={entry.name} href={`#review-${topic.id}-${index}`}>{entry.name}</a>
              ))}
            </nav>
            {topic.entries.map((entry, index) => (
              <article key={entry.name} id={`review-${topic.id}-${index}`} className={styles.method}>
                <h3>{entry.name}</h3>
                <p>{entry.detail}</p>
                {entry.cost && <p className={styles.cost}><strong>Complexity:</strong> {entry.cost}</p>}
                <figure>
                  <figcaption>{topic.id === "ssr" ? "TypeScript / TSX" : "TypeScript"}</figcaption>
                  <pre tabIndex={0} aria-label={`${entry.name} example`}><code
                    className={`language-${topic.id === "ssr" ? "tsx" : "typescript"}`}
                    dangerouslySetInnerHTML={{ __html: Prism.highlight(entry.code,
                      Prism.languages[topic.id === "ssr" ? "tsx" : "typescript"],
                      topic.id === "ssr" ? "tsx" : "typescript") }} /></pre>
                </figure>
              </article>
            ))}
            <aside className={styles.practice}><h3>Practice aloud</h3><p>{topic.practice}</p></aside>
            <div className={styles.sources}><strong>Documentation</strong>
              {topic.sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}
            </div>
          </div>
        </details>
      ))}
    </section>
  );
}
