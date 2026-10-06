"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addOpportunity, setFocusedOpportunity, setPriorityOpportunity } from "@/lib/features/opportunities/store/opportunities-slice";
import styles from "@/css/Opportunities.module.css";

export default function OpportunitiesPage() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(state => state.theme.data.isDark);
  const { items, priorityId, focusedId } = useAppSelector(state => state.opportunities);
  const orderedItems = [...items].sort((a, b) => Number(b.id === priorityId) - Number(a.id === priorityId));

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const role = String(data.get("role") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const nextStep = String(data.get("nextStep") ?? "").trim();
    if (!role || !company || !nextStep) return;
    dispatch(addOpportunity({ id: crypto.randomUUID(), role, company, nextStep }));
    form.reset();
  }

  return (
    <div className={styles.page} data-theme={isDark ? "dark" : "light"}>
      <section aria-label="Introduction" className={styles.intro}>
        <p>
          Keep your current opportunities in one place so you can prepare with a
          clear direction. Track each role, the company, and your next step, then
          mark the most important opportunity to give it extra attention.
        </p>
        <p>
          Set an opportunity in focus when you are actively preparing for it.
          Your top priority stays highlighted while you can switch focus between
          roles as interviews and next steps approach.
        </p>
      </section>

      <section aria-labelledby="opportunities-heading">
        <header className={styles.header}>
          <h2 id="opportunities-heading">Current opportunities</h2>
          <p role="status">{items.length} {items.length === 1 ? "opportunity" : "opportunities"} · {focusedId ? "1 in focus" : "None in focus"}</p>
        </header>
        {items.length === 0 ? (
          <p className={styles.empty}>Add your first opportunity below to start tracking your next steps.</p>
        ) : (
          <ul className={styles.grid}>
            {orderedItems.map(opportunity => {
              const isPriority = opportunity.id === priorityId;
              const isFocused = opportunity.id === focusedId;
              return (
                <li key={opportunity.id} className={`${styles.card} ${styles.opportunityCard} ${isPriority ? styles.priority : ""} ${isFocused ? styles.focused : ""}`}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="7" width="18" height="14" rx="3" />
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a24 24 0 0 0 18 0M10 13h4" />
                      </svg>
                    </span>
                    <div className={styles.badges}>
                    {isPriority && <span className={styles.badge}>Top priority</span>}
                    {isFocused && <span className={styles.badge}>In focus</span>}
                    </div>
                  </div>
                  <p className={styles.company}>{opportunity.company}</p>
                  <h3>{opportunity.role}</h3>
                  <p className={styles.nextStep}><strong>Next step:</strong> {opportunity.nextStep}</p>
                  <div className={styles.actions}>
                    {isFocused && <Link className={styles.preparationLink} href="/interview-prep/opportunities/preparation">Open preparation path <span aria-hidden="true">→</span></Link>}
                    <button type="button" aria-pressed={isPriority} aria-label={`Make ${opportunity.role} at ${opportunity.company} top priority`} onClick={() => dispatch(setPriorityOpportunity(opportunity.id))}>
                      {isPriority ? "Top priority" : "Make top priority"}
                    </button>
                    <button type="button" aria-pressed={isFocused} aria-label={`${isFocused ? "Clear focus on" : "Focus on"} ${opportunity.role} at ${opportunity.company}`} onClick={() => dispatch(setFocusedOpportunity(isFocused ? null : opportunity.id))}>
                      {isFocused ? "Clear focus" : "Focus this opportunity"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={styles.addSection} aria-labelledby="add-opportunity-heading">
        <h2 id="add-opportunity-heading">Add an opportunity</h2>
        <form className={styles.form} onSubmit={handleAdd}>
          <label>Role<input name="role" required maxLength={120} placeholder="Front End Engineer" /></label>
          <label>Company<input name="company" required maxLength={120} placeholder="Company name" /></label>
          <label className={styles.fullWidth}>Next step<textarea name="nextStep" required maxLength={500} rows={3} placeholder="Prepare for the technical interview" /></label>
          <button type="submit">Add opportunity</button>
        </form>
      </section>
    </div>
  );
}
