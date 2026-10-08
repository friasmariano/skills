"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { togglPreparationSteps, togglPreparationTiers, togglAnswerFrameworks, togglOfficialContext, togglOfficialResources, togglOfficialVideos, type PreparationStep, type PreparationVideo as Video } from "@/config/preparationPaths";
import { togglePreparationStep } from "@/lib/features/opportunities/store/opportunities-slice";
import styles from "@/css/Opportunities.module.css";
import pathStyles from "@/css/PreparationPath.module.css";
import TechnicalReview from "./TechnicalReview";
import PreparationStepModal from "./PreparationStepModal";
import PreparationVideo from "./PreparationVideo";
import Modal from "@/components/Modal";
import videoStyles from "./PreparationVideo.module.css";
import referenceStyles from "./PreparationReference.module.css";
import GreenWalletStoryBank from "./GreenWalletStoryBank";
import ArchitectureStudy from "./ArchitectureStudy";
import { togglPreparationDays } from "@/config/togglPreparationDays";

export default function PreparationPage() {
  const dispatch = useAppDispatch();
  const [selectedStep, setSelectedStep] = useState<PreparationStep | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isStoryBankOpen, setIsStoryBankOpen] = useState(false);
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
              <p>Four study days, starting with Architecture fundamentals and finishing October 11 at 11:00 a.m. Caracas time. All twelve steps, references, videos, and story cards are assigned below. Mark each step complete as you finish it. Topics are preparation guidance, not guaranteed assessment questions.</p>
              <a className={pathStyles.bannerLink} href="https://toggl.com/candidate-booklet/" target="_blank" rel="noopener noreferrer">Read Toggl’s candidate booklet <span>(opens in a new tab) ↗</span></a>
            </div>
          )}
          </header>
          {hasPath ? (
            <>
              <section className={referenceStyles.reference} aria-labelledby="daily-plan-heading">
                <h3 id="daily-plan-heading">Your preparation calendar</h3>
                <p>October 8–11, 2026 · America/Caracas (UTC−4). Continue from Architecture fundamentals; no earlier topic is assumed complete. Day 1–3 budgets are flexible viewing and study allocations. Sunday’s plan ends at 11:00 a.m.</p>
                <nav aria-label="Preparation days"><ul>{togglPreparationDays.map(day => <li key={day.id}><a href={`#${day.id}`}>{day.title}: {day.focus}</a></li>)}</ul></nav>
              </section>
              <div className={pathStyles.progress}>
                <progress id="preparation-progress" max={togglPreparationSteps.length} value={completedCount} />
                <label htmlFor="preparation-progress" aria-live="polite">{completedCount} of {togglPreparationSteps.length} steps complete</label>
              </div>
              {togglPreparationDays.map(day => (
                <section key={day.id} id={day.id} className={referenceStyles.day} aria-labelledby={`${day.id}-heading`}>
                  <header className={referenceStyles.reference}>
                    <h3 id={`${day.id}-heading`}>{day.title}</h3>
                    <h4>{day.focus}</h4>
                    <p><strong>{day.window}</strong></p>
                    <ol>{day.plan.map(item => <li key={item}>{item}</li>)}</ol>
                    <p className={referenceStyles.callout}><strong>Finish with:</strong> {day.outcome}</p>
                  </header>
                  {day.architecture && <ArchitectureStudy />}
                  {day.priorities && (
                    <section className={referenceStyles.reference} aria-labelledby="preparation-priorities-heading">
                      <h3 id="preparation-priorities-heading">Where to focus first</h3>
                      <p>Allocate preparation time using the gaps exposed by the practice round. The step numbers organize the guide; these tiers set the study order.</p>
                      <div className={referenceStyles.tiers}>
                        {togglPreparationTiers.map(tier => <article key={tier.title}><h4>{tier.title}</h4><p>{tier.topics}</p></article>)}
                      </div>
                      <p className={referenceStyles.callout}><strong>Algorithms:</strong> keep them in your broader interview routine. For immediate Toggl preparation, the supplied guide prioritizes TypeScript, React performance, state/data management, engineering judgment, and communication.</p>
                    </section>
                  )}
                  {day.official && (
                    <section className={referenceStyles.reference} aria-labelledby="official-toggl-heading">
                      <h3 id="official-toggl-heading">Inside Toggl: product, culture, and hiring</h3>
                      <p>Reviewed October 7, 2026 against Toggl’s official resources below. The practice prompts apply those sources to your preparation.</p>
                      <nav aria-label="Official Toggl preparation resources">
                        <ul className={referenceStyles.resources}>
                          {togglOfficialResources.map(resource => <li key={resource.url}><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title} <span>(opens in a new tab) ↗</span></a><p>{resource.detail}</p></li>)}
                        </ul>
                      </nav>
                      <div className={referenceStyles.tiers}>
                        {togglOfficialContext.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.detail}</p><p className={referenceStyles.callout}><strong>Practice:</strong> {item.prompt}</p></article>)}
                      </div>
                      <h4>Short official product lessons</h4>
                      <p>Use these examples alongside the culture and vocabulary steps. Videos play here in a modal; the longer walkthrough is limited to a relevant excerpt.</p>
                      {togglOfficialVideos.map(video => <PreparationVideo key={video.youtubeId} video={video} onWatch={() => setSelectedVideo(video)} />)}
                    </section>
                  )}
                  <ol className={pathStyles.path} aria-label={`${day.title} preparation steps`}>
                    {day.stepIds.map(stepId => togglPreparationSteps.find(step => step.id === stepId)!).map((step) => (
                      <li key={step.id} className={pathStyles.step} data-complete={completed.includes(step.id)}>
                        <div className={pathStyles.marker} aria-hidden="true">
                          <span className={pathStyles.pill}>{String(togglPreparationSteps.indexOf(step) + 1).padStart(2, "0")}</span>
                          <span className={pathStyles.cylinder}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              {completed.includes(step.id) ? <path d="m5 12 4 4L19 6" /> : <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>}
                            </svg>
                          </span>
                        </div>
                        <div className={`${pathStyles.content} ${pathStyles.whiteboard}`}>
                        <p className={pathStyles.eyebrow}>Step {togglPreparationSteps.indexOf(step) + 1} · {completed.includes(step.id) ? "Complete" : "To prepare"}</p>
                        <h3>{step.title}</h3>
                        <p className={referenceStyles.priority}>{step.priority}</p>
                        <p className={referenceStyles.description}>{step.description}</p>
                        <div className={pathStyles.stepActions}>
                        <button
                          type="button"
                          className={pathStyles.detailsButton}
                          aria-haspopup="dialog"
                          aria-label={`Show details: ${step.title}`}
                          onClick={() => setSelectedStep(step)}
                        >Show details</button>
                        {step.id === "stories" && (
                          <button
                            type="button"
                            className={`${pathStyles.detailsButton} ${pathStyles.storyBankButton}`}
                            aria-haspopup="dialog"
                            onClick={() => setIsStoryBankOpen(true)}
                          >Open the six GreenWallet story cards</button>
                        )}
                        </div>
                        <PreparationVideo video={step.video} onWatch={() => setSelectedVideo(step.video)} />
                        <label className={styles.completion}>
                          <input type="checkbox" checked={completed.includes(step.id)} onChange={() => dispatch(togglePreparationStep({ opportunityId: opportunity.id, stepId: step.id }))} />
                          Mark “{step.title}” complete
                        </label>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {day.reviewIds.length > 0 && <TechnicalReview topicIds={day.reviewIds} />}
                  {day.frameworks && (
                    <section className={referenceStyles.reference} aria-labelledby="answer-frameworks-heading">
                      <h3 id="answer-frameworks-heading">Answer frameworks to recall</h3>
                      <p>Decision → reasoning → validation/metrics. Three strong sentences can be enough.</p>
                      <div className={referenceStyles.tableWrap}>
                        <table>
                          <caption className={referenceStyles.tableCaption}>Choose a concise structure for each question type</caption>
                          <thead><tr><th scope="col">Question</th><th scope="col">Framework</th></tr></thead>
                          <tbody>{togglAnswerFrameworks.map(item => <tr key={item.question}><th scope="row">{item.question}</th><td>{item.framework}</td></tr>)}</tbody>
                        </table>
                      </div>
                      <p className={referenceStyles.callout}>When performance is involved, name at least one metric. Validate with representative workloads and compare results against requirements.</p>
                    </section>
                  )}
                </section>
              ))}
              {isStoryBankOpen && (
                <Modal isOpen onClose={() => setIsStoryBankOpen(false)} title="GreenWallet story bank" size="full">
                  <GreenWalletStoryBank />
                </Modal>
              )}
              {selectedStep && <PreparationStepModal step={selectedStep} onClose={() => setSelectedStep(null)} />}
              {selectedVideo && (
                <Modal isOpen onClose={() => setSelectedVideo(null)} title={selectedVideo.focus} size="large">
                  <div className={videoStyles.modalContent}>
                    <PreparationVideo video={selectedVideo} showPlayer />
                  </div>
                </Modal>
              )}

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
      {!hasPath && <TechnicalReview />}
    </div>
  );
}
