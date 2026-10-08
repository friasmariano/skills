"use client";

import { togglArchitectureLessons, togglArchitectureComparison, togglArchitectureChecklist } from "@/config/togglArchitectureStudy";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleArchitectureItem } from "@/lib/features/opportunities/store/opportunities-slice";
import styles from "./PreparationReference.module.css";
import VideoCard from "./VideoCard";

export default function ArchitectureStudy() {
  const dispatch = useAppDispatch();
  const opportunityId = "toggl-senior-full-stack";
  const completed = useAppSelector(state => state.opportunities.completedArchitectureItems?.[opportunityId]);
  const itemIds = [...togglArchitectureLessons.map(lesson => lesson.id), "breaks-review"];
  const completedCount = itemIds.filter(id => completed?.includes(id)).length;
  function checkbox(itemId: string, title: string) {
    return <input
      type="checkbox"
      aria-label={`Mark ${title} complete`}
      checked={completed?.includes(itemId) ?? false}
      onChange={() => dispatch(toggleArchitectureItem({ opportunityId, itemId }))}
    />;
  }
  return (
    <section id="architecture-study" className={styles.reference} aria-labelledby="architecture-study-heading">
      <h3 id="architecture-study-heading">Day 1 · Architecture & engineering decisions</h3>
      <p>Understand how system boundaries, frontend structure, data contracts, and operational constraints influence decisions, then explain those decisions clearly. Added from your October 8, 2026 study guide. Time-tracking examples illustrate concepts rather than Toggl’s internal architecture.</p>
      <p><strong>Study route:</strong> allow 3 hours 30 minutes, including two short breaks and checklist review. Follow boundaries → implementation choices → trade-offs and communication. Video budgets are viewing allocations, not verified runtimes; save the remainder of longer talks for later.</p>
      <div className={styles.tableWrap}>
        <table>
          <caption className={styles.tableCaption}>Day 1 reading and viewing schedule</caption>
          <thead><tr><th scope="col">Done</th><th scope="col">Topic</th><th scope="col">Reading & notes</th><th scope="col">Video budget</th><th scope="col">Total</th></tr></thead>
          <tbody>
            {togglArchitectureLessons.map((lesson, index) => <tr key={lesson.id}><td>{checkbox(lesson.id, lesson.title)}</td><th scope="row"><a href={`#architecture-${lesson.id}`}>{index + 1}. {lesson.title}</a></th><td>{lesson.reading} min</td><td>{lesson.video} min</td><td>{lesson.reading + lesson.video} min</td></tr>)}
            <tr><td>{checkbox("breaks-review", "Breaks & checklist review")}</td><th scope="row">Breaks & checklist review</th><td colSpan={2}>Two short breaks and review</td><td>30 min</td></tr>
          </tbody>
        </table>
      </div>
      <p aria-live="polite">{completedCount} of {itemIds.length} schedule items complete. Progress is saved on this browser.</p>
      {togglArchitectureLessons.map((lesson, index) => (
        <details key={lesson.id} id={`architecture-${lesson.id}`}>
          <summary>{index + 1}. {lesson.title} · {lesson.reading + lesson.video} min</summary>
          <p><strong>Learning objective:</strong> {lesson.objective}</p>
          <ul>{lesson.notes.map(note => <li key={note}>{note}</li>)}</ul>
          {lesson.id === "deployment" && <div className={styles.tableWrap}><table>
            <caption className={styles.tableCaption}>Deployment choices and their costs</caption>
            <thead><tr><th scope="col">Consideration</th><th scope="col">Modular monolith</th><th scope="col">Microservices</th></tr></thead>
            <tbody>{togglArchitectureComparison.map(([dimension, monolith, services]) => <tr key={dimension}><th scope="row">{dimension}</th><td>{monolith}</td><td>{services}</td></tr>)}</tbody>
          </table></div>}
          <VideoCard title={lesson.watch.title} presenter={lesson.watch.authors} focus={lesson.watch.focus} timing={`${lesson.video} min viewing budget`} href={lesson.watch.url} />
          {lesson.id === "contracts" && <VideoCard title="Staying in Sync: From Transactions to Streams" presenter="Martin Kleppmann" focus="Optional depth: transactions, streams, and consistency." timing="Optional viewing" href="https://martin.kleppmann.com/2016/03/07/qcon-london.html" />}
          {lesson.readings.length > 0 && <ul>{lesson.readings.map(reading => <li key={reading.url}><a href={reading.url} target="_blank" rel="noopener noreferrer">{reading.title} ↗</a></li>)}</ul>}
          <p><strong>BFE.dev connection for later:</strong> {lesson.connection}</p>
        </details>
      ))}
      <h4>Day 1 completion checklist</h4>
      <ul>{togglArchitectureChecklist.map(item => <li key={item}>{item}</li>)}</ul>
      <p>Finish with a short notes page: key concepts, trade-offs to remember, and topics needing another pass.</p>
      <p className={styles.callout}>This section covers study and note-taking. The PDF reserves the larger BFE.dev question bank and scenario exercises for later stages. These themes are preparation guidance rather than an official Toggl interview syllabus.</p>
    </section>
  );
}
