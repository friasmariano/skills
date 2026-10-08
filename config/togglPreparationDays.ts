export const togglPreparationDays = [
  {
    id: "day-1", title: "Day 1 · Thursday, October 8", focus: "Architecture and full-stack foundations",
    window: "Continue from Architecture fundamentals · about 5 hours including breaks",
    plan: ["Architecture fundamentals is your current starting point; continue through the six architecture lessons in order (3 hours 30 minutes including breaks).", "Review full-stack engineering judgment (45 minutes), then the Next.js SSR technical reference (45 minutes)."],
    stepIds: ["fundamentals"], reviewIds: ["ssr"], architecture: true, priorities: false, official: false, frameworks: false,
    outcome: "Finish the architecture checklist and save your notes on boundaries, state ownership, contracts, accepted costs, and revisit triggers.",
  },
  {
    id: "day-2", title: "Day 2 · Friday, October 9", focus: "TypeScript, state, and measured performance",
    window: "Suggested study budget: 4 hours 30 minutes including breaks",
    plan: ["Read the priority tiers, then TypeScript + state/data management (70 minutes).", "Work through the array and Map technical references (60 minutes).", "Review React performance (45 minutes), performance metrics (35 minutes), and the unfamiliar-technology workflow (30 minutes). Allow 30 minutes for breaks and notes."],
    stepIds: ["typescript-state", "react-performance", "performance-metrics", "unfamiliar-technology"], reviewIds: ["arrays", "maps"], architecture: false, priorities: true, official: false, frameworks: false,
    outcome: "Explain discriminated unions, selectors, query caching, virtualization, and a measured before/after comparison. Note remaining gaps for the final review.",
  },
  {
    id: "day-3", title: "Day 3 · Saturday, October 10", focus: "Toggl context, story evidence, and senior judgment",
    window: "Suggested study budget: 4 hours including breaks",
    plan: ["Review Inside Toggl, all official resources, and both product videos (35 minutes).", "Study culture + async engineering (30 minutes) and product/domain vocabulary (25 minutes).", "Review the story-bank step and all six GreenWallet cards (60 minutes).", "Practice situational judgment (35 minutes) and concise answers with the framework table (25 minutes). Allow 30 minutes for breaks and notes."],
    stepIds: ["culture", "domain-vocabulary", "stories", "situational-judgment", "reasoning"], reviewIds: [], architecture: false, priorities: false, official: true, frameworks: true,
    outcome: "Have six defensible story outlines, a concise async update, and clear decision → reasoning → validation answers ready.",
  },
  {
    id: "day-4", title: "Day 4 · Sunday, October 11", focus: "Assessment strategy and final rehearsal",
    window: "8:30–11:00 a.m. · America/Caracas (UTC−4) · preparation ends at 11:00 a.m.",
    plan: ["8:30–8:50: review Assessment strategy and open ‘Two things before you begin’ in its details.", "8:50–9:10: revisit only the unclear concepts saved in your Day 1–3 notes.", "9:10–9:50: complete Timed rehearsal using the suggested 30-, 60–120-, and 240-second formats; include a short reset between answers.", "9:50–10:00: break.", "10:00–10:30: recall your six story outlines and the answer frameworks from Day 3 aloud.", "10:30–10:45: check remaining step checkboxes, connection, distractions, hydration, and your assessment invitation.", "10:45–11:00: stop studying and settle in. The preparation deadline is 11:00 a.m.; follow your invitation for the assessment start time."],
    stepIds: ["format", "timed-practice"], reviewIds: [], architecture: false, priorities: false, official: false, frameworks: false,
    outcome: "Finish preparation by Sunday, October 11 at 11:00 a.m. Caracas time, with your setup ready and no new topics left to start.",
  },
];
