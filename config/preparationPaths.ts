// Video titles, channels, availability, and durations checked on YouTube on 2026-10-07.
export type PreparationVideo = {
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  focus: string;
  practice: string;
  startSeconds?: number;
  endSeconds?: number;
};

export type PreparationStep = {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  priority: string;
  recall: string;
  video: PreparationVideo;
  sources?: { label: string; url: string }[];
};

export const togglPreparationSteps: PreparationStep[] = [
  {
    id: "format",
    sources: [
      { label: "Toggl candidate booklet", url: "https://toggl.com/candidate-booklet/" },
      { label: "Toggl careers and hiring process", url: "https://toggl.com/jobs" },
    ],
    video: {
      youtubeId: "dr82Qlj4jaM",
      title: "Verbal Reasoning Tests | How to succeed during the test #shorts",
      channel: "Graduates First",
      duration: "0:45",
      focus: "Careful reading under pressure",
      practice: "Apply the reading tips to technical statements: identify qualifiers before choosing. This is a general reasoning clip, not a Toggl format overview.",
    },
    title: "Assessment strategy",
    priority: "High priority",
    description: "Use the practice round to calibrate technical reasoning and senior engineering judgment under time pressure.",
    tasks: [
      "Expect 11 questions in a maximum of 32 minutes, with individual limits of 30–240 seconds. Complete the three practice questions to calibrate the interface and pace.",
      "Prepare for Concept Checks, Real-World Scenarios, and Outcome/Experience Stories. Questions may combine technologies with engineering judgment.",
      "The public candidate booklet gives a broader hiring sequence: skills/video screening, an assignment or live coding test, cultural interview, hiring-manager interview, paid test week, and offer. Steps vary by role and seniority; use your assessment invitation for the specific timer and format.",
      "The careers page describes skills assessments, cultural and technical interviews, a paid 3–5-day test week, and an offer. The individual job posting is the most accurate source for your role’s hiring stages; check it before each round.",
      "You cannot return to previous questions: commit, submit, and move forward. Reserve one uninterrupted sitting.",
      "Read qualifiers carefully: guarantees, always, only, safe, prevents, and full type safety can change whether a statement is correct.",
      "The supplied overview describes AI scoring followed by Talent review. Make the key technical concepts explicit rather than implied.",
      "For open answers, prioritize decision → reasoning → validation/metrics over lengthy explanations.",
    ],
    recall: "Recognize what the question is testing within the first 10–20 seconds.",
  },
  {
    id: "typescript-state",
    video: {
      youtubeId: "HDaPLwZWguo",
      title: "You HAVE to know this TypeScript pattern",
      channel: "Matt Pocock",
      duration: "1:45",
      focus: "Discriminated unions",
      practice: "Model an API request as idle, loading, success, or error. Explain how narrowing prevents invalid states. This clip focuses on TypeScript; use the tasks above for Zustand and TanStack Query.",
    },
    title: "TypeScript + state/data management",
    priority: "Highest technical priority",
    description: "Close the gap exposed by the practice round: reason about types, React state, and asynchronous data, including unfamiliar store code.",
    tasks: [
      "Review discriminated unions and control-flow narrowing. Model idle | loading | success | error states without allowing contradictory combinations.",
      "Review any vs unknown, interfaces/types, generics, inference, optional properties, and type guards. Understand why any removes type guarantees.",
      "Understand how typed API/query functions propagate type safety to consumers, and distinguish server state from client/UI state.",
      "Learn Zustand fundamentals: typed store state/actions, selectors, selecting the smallest needed state slice, async actions, and avoiding unnecessary subscriptions/renders.",
      "Learn TanStack Query fundamentals: typed queryFn, query keys, loading/error/success states, caching and stale data, refetching, mutations and invalidation, and select.",
    ],
    recall: "Make invalid states difficult to represent, subscribe only to what a component needs, and avoid escaping the type system with any.",
  },
  {
    id: "react-performance",
    video: {
      youtubeId: "7vI7w0DsZ2A",
      title: "Frontend Performance: Virtualized List",
      channel: "Code Tour",
      duration: "1:49",
      focus: "List virtualization/windowing",
      practice: "Explain why rendering only visible rows helps the 10,000-record scenario while preserving the five-second refresh requirement.",
    },
    title: "React performance & scalability",
    priority: "Highest technical priority",
    description: "Use the 10,000-row practice scenario to identify the real bottleneck before choosing an optimization.",
    tasks: [
      "Review list/window virtualization: 10,000 records do not require 10,000 DOM rows to exist simultaneously.",
      "Distinguish virtualization from React.memo. Review React.memo, useMemo, and useCallback, including when they do not solve the underlying problem.",
      "Review unnecessary rerenders, state subscriptions, polling/refetching, and how they interact with rendering.",
      "Separate data volume, DOM/rendering cost, network cost, and computation cost. Use React profiling to identify the dominant cost.",
      "Preserve product requirements: changing refresh from 5 seconds to 30 seconds weakens freshness and does not solve a rendering bottleneck.",
    ],
    recall: "Measure → identify bottleneck → targeted optimization → validate.",
  },
  {
    id: "performance-metrics",
    video: {
      youtubeId: "9rlGSahksLQ",
      title: "What are P50, P95, P99? - Backend Performance 101",
      channel: "Kamran Ahmed",
      duration: "1:28",
      focus: "Latency percentiles",
      practice: "Explain p50, p95, and p99, then choose a metric to compare before and after a backend optimization.",
    },
    title: "Performance metrics & profiling",
    priority: "High priority",
    description: "Replace vague performance claims with measurable outcomes and representative workloads.",
    tasks: [
      "Backend/API: p50/p95/p99 latency, throughput, error rate, database query count/time, CPU, memory/allocations, and representative load/data sizes.",
      "Frontend: render duration, rerender count, DOM nodes/components mounted, interaction responsiveness, request frequency, payload size, CPU/memory, and behavior during polling/refetches.",
      "SQL: execution time, query plans, indexes, rows scanned, N+1 queries, and unnecessary joins or data retrieval.",
      "Practice a specific response: profile with representative data, identify the bottleneck, and compare p95 latency and database query time before and after the change.",
    ],
    recall: "When performance is involved, name at least one metric and explain how you would compare before and after.",
  },
  {
    id: "fundamentals",
    video: {
      youtubeId: "WRsKs-K6iII",
      title: "What is a Rest API? (in 2 Minutes)",
      channel: "Warp",
      duration: "2:11",
      focus: "REST API fundamentals",
      practice: "Describe a request across the frontend/API boundary, including validation and error handling. This clip reinforces API basics within the broader full-stack review.",
    },
    title: "Full-stack engineering judgment",
    priority: "High priority",
    description: "Reason across the stack rather than memorizing framework definitions.",
    tasks: [
      "React/TypeScript: component boundaries, state ownership, state management, and type safety.",
      "APIs: validation, error handling, service boundaries, and API contracts. Spring Boot: controllers, services, persistence, and dependency boundaries.",
      "PostgreSQL: schema design, indexes, transactions, query plans, and slow-query diagnosis.",
      "Product practice inspired by Toggl’s official walkthrough: model effective billable rates and rate history, fixed-fee revenue, and labor costs. Explain how to keep profitability reports correct as rates change.",
      "Security: authentication vs authorization, sessions/JWT, input validation, and protecting sensitive data.",
      "Testing: unit vs integration vs E2E vs performance tests. Production: debugging, observability, deployment, and rollback.",
    ],
    recall: "Where is the bottleneck? Which requirement must remain intact? What is the simplest targeted solution? How do I prove it worked?",
  },
  {
    id: "unfamiliar-technology",
    sources: [{ label: "Toggl candidate booklet", url: "https://toggl.com/candidate-booklet/" }],
    video: {
      youtubeId: "u2uYEMna-WU",
      title: "The FIRST Step In Learning a New Programming Language",
      channel: "Tech With Tim",
      duration: "0:42",
      focus: "Starting with an unfamiliar language",
      practice: "Describe your first learning step, then extend it into the guide’s workflow: inspect existing code, implement, test correctness, and measure performance.",
    },
    title: "Learning unfamiliar technology",
    priority: "High priority",
    description: "Prepare for scenarios such as Go/Python by showing how you become productive, rather than studying Go deeply for this assessment.",
    tasks: [
      "Inspect similar implementations in the existing codebase first, learn the concepts needed for the task, and follow established project conventions.",
      "Use documentation and AI to accelerate learning and implementation. Review and validate generated or transformed code rather than trusting it blindly. The candidate booklet expects people to own their AI-assisted work and be able to explain what they ship.",
      "Test correctness, then profile or benchmark with representative workloads. Compare measurable results against requirements.",
      "Distinguish correctness tests from performance tests and use both when appropriate.",
    ],
    recall: "Existing code → targeted learning → implementation → testing → measurement. AI accelerates the work; engineering validation remains your responsibility.",
  },
  {
    id: "culture",
    sources: [{ label: "Toggl candidate booklet", url: "https://toggl.com/candidate-booklet/" }],
    video: {
      youtubeId: "ffghAwoaQys",
      title: "Toggl: Time Tracking, Now With Time Intelligence",
      channel: "Toggl",
      duration: "0:47",
      focus: "Trust, not surveillance",
      practice: "Identify the product decisions that support trust. Then write an async proposal that connects a user outcome, a trade-off, and measurable validation. This official product clip complements the candidate booklet’s culture guidance.",
    },
    title: "Toggl culture + async engineering",
    priority: "High priority",
    description: "Connect engineering decisions with Toggl’s seven values, async-first work, and accountability for outcomes.",
    tasks: [
      "Review all seven values: Trust, Communication, Respect, Sustained speed, Ownership, Innovativeness, and Freedom. Connect each to an example from your work.",
      "The booklet describes async-first work through Notion and Slack, transparent information, and RAFT (Results and Accountability First at Toggl). Practice clear written updates and early escalation when plans change.",
      "Small cross-functional Tribes own user outcomes; teams of 3–5 prototype, test, ship, and iterate. Preparation prompt: explain how you define success, gather user feedback, and sustain delivery without heavy approval layers.",
      "Trust includes rejecting surveillance in both operations and products. Preparation prompt: explain how useful product telemetry differs from monitoring employees.",
      "Rehearse a short async message proposing row virtualization, describing the trade-off and validation, and asking for alignment before implementation when appropriate.",
      "Practice a blocker scenario: gather context, document assumptions, communicate asynchronously, make a safe decision within your scope, and escalate when the impact warrants it.",
      "Avoid waiting passively for instructions or making major architectural/product decisions without informing relevant people.",
    ],
    recall: "Observation → proposed solution → trade-off → evidence/validation → request alignment when appropriate. Take ownership while keeping people informed.",
  },
  {
    id: "domain-vocabulary",
    sources: [{ label: "Ace Your Interview", url: "https://toggl.notion.site/Ace-Your-Interview-cda2148086d74620944269b744a29630" }],
    video: {
      youtubeId: "I9CpIH0QO6U",
      title: "The argument for tracking capacity over utilization",
      channel: "Toggl",
      duration: "1:02",
      focus: "Capacity vs utilisation",
      practice: "Explain why logged hours alone do not describe capacity or completed work. Define the denominator and time period before interpreting a utilisation figure.",
    },
    title: "Product/domain vocabulary",
    priority: "Medium priority",
    description: "Reduce cognitive load by learning the vocabulary used in time tracking, planning, and project profitability scenarios.",
    tasks: [
      "Toggl’s interview guide asks candidates to research its products, target market, and competitors. Preparation prompt: identify a user need Toggl serves and explain one product trade-off compared with an alternative.",
      "Capacity: working time already committed compared with the time available in a period.",
      "Utilisation: the share of available time spent on the relevant category of work. Toggl’s current product walkthrough specifically reports billable utilisation; check the question’s definition and denominator.",
      "Billable rate: the hourly amount charged to a client. Toggl’s product walkthrough describes workspace, member, project, and project-member rates, with the most specific rate taking precedence and history preserved.",
      "Fixed fees and labor costs: revenue is not always hours multiplied by rate. Toggl’s walkthrough shows fixed fees overriding billable rates in reporting and labor costs used to calculate profit.",
      "Capacity planning: the official add-on video shows future availability, scheduled/unassigned work, draft projects, holiday calendars, and forecast reports. Preparation prompt: distinguish historical utilisation from future capacity.",
      "Margin: billed revenue minus the cost of the work. Distinguish margin amount from margin percentage (margin divided by revenue, multiplied by 100).",
      "Timesheet approval: manager review/sign-off of logged hours before billing or reporting.",
      "Time entry: an individual record of time spent, recorded by timer or entered afterward and attached to a project and optionally a task.",
    ],
    recall: "Know the terms so you can spend the timer on engineering reasoning. Read the definitions supplied in each question.",
  },
  {
    id: "stories",
    sources: [{ label: "Ace Your Interview", url: "https://toggl.notion.site/Ace-Your-Interview-cda2148086d74620944269b744a29630" }],
    video: {
      youtubeId: "D2-kZ4I5opo",
      title: "Use the STAR Method to Answer Competency Based Interview Questions | Indeed #Shorts",
      channel: "Indeed",
      duration: "0:38",
      focus: "Structuring experience stories",
      practice: "Outline one real GreenWallet example using Situation, Task, Action, and Result; add validation and learning. Use only outcomes you can support.",
    },
    title: "GreenWallet story bank",
    priority: "High priority",
    description: "Build five or six compact examples from your own work for Outcome Story questions.",
    tasks: [
      "Cover React/Next.js/TypeScript architecture, Spring Boot APIs, PostgreSQL decisions, authentication/JWT, production debugging, and performance or maintainability.",
      "Include learning unfamiliar technology, ownership, disagreement, and making trade-offs with incomplete information.",
      "For each story, write: Situation → Problem → Decision → Why → Validation → Result → Learning.",
      "Clarify your personal contribution and the alternatives considered. Do not invent results or metrics: use actual observations, or explain what you would measure today.",
      "Toggl’s Ace Your Interview guide emphasizes concrete examples, your first-hand actions and impact, quantifiable achievements where available, and concise answers. Rehearse each story with a brief context, your specific actions, and an evidenced outcome.",
    ],
    recall: "Prepare evidence for your decisions, including how you validated the outcome and what you learned.",
  },
  {
    id: "situational-judgment",
    video: {
      youtubeId: "o-Ufd-KHkgA",
      title: "Ace the SJT! | 5 Situational Judgement Test Tips #shorts",
      channel: "Graduates First",
      duration: "0:58",
      focus: "Comparing situational responses",
      practice: "Apply the general tips to an engineering scenario: preserve requirements, address the root cause, and keep relevant people informed.",
    },
    title: "Situational judgment",
    priority: "High priority",
    description: "Use the 10,000-row scenario to practice comparing technically possible options and selecting the strongest engineering response.",
    tasks: [
      "Evaluate technical correctness → preserves requirements → addresses root cause → user impact → maintainability → communication/alignment.",
      "Spot distractors that mask symptoms, weaken requirements, overengineer, introduce major scope changes, or optimize without evidence.",
      "Watch for options that ignore communication or apply memoization without addressing the underlying rendering cost.",
      "Practice a feature due tomorrow with architectural debt: identify risk, choose the smallest safe change, communicate the compromise, and plan follow-up work.",
    ],
    recall: "A technically possible answer is not necessarily the best senior-engineer answer.",
  },
  {
    id: "reasoning",
    video: {
      youtubeId: "WOUpABHsVg4",
      title: "The P.R.E.P. Method for Answering Questions without Rambling",
      channel: "Virtual Speech Coach",
      duration: "0:50",
      focus: "Answering without rambling",
      practice: "Practice Point, Reason, Example/Evidence, Point in three sentences, then adapt it to Decision → Why → Validation for a technical answer.",
    },
    title: "Concise answer frameworks",
    priority: "Highest practical priority",
    description: "Structure the most relevant points clearly. Three strong sentences can be enough; exhaustive essays are not the goal.",
    tasks: [
      "Hypothetical technical problem: Decision → Why → Validation.",
      "Unfamiliar technology: Learn → Implement → Test → Measure.",
      "Situational judgment: Problem → Risk/trade-off → Decision → Communication → Validation.",
      "Experience: Situation → Decision → Outcome → Learning.",
      "Lead with the decision and make assumptions or key trade-offs explicit. Name at least one metric when performance is involved.",
    ],
    recall: "Decision → reasoning → validation/metrics.",
  },
  {
    id: "timed-practice",
    video: {
      youtubeId: "P9mcASYqSt4",
      title: "Improve your speed in online employer tests | Top Tips to get Quicker #shorts",
      channel: "Graduates First",
      duration: "0:50",
      focus: "Practice, pace, and moving on",
      practice: "Rehearse a 30-second concept check and a 60–120-second scenario. Practice committing and moving on within each question’s time limit.",
    },
    title: "Timed rehearsal",
    priority: "Final priority",
    description: "Reproduce the assessment pressure. These are suggested rehearsal timings, not guaranteed timings for specific question types.",
    tasks: [
      "30 seconds: technical recognition/concept checks. Spot incorrect absolutes and choose quickly.",
      "60–120 seconds: situational judgment. Identify the root problem, preserve requirements, and choose a targeted solution.",
      "240 seconds: Outcome Story. Spend 15–30 seconds thinking, 2–3 minutes writing, and the remaining time reviewing.",
      "Move forward after submitting; do not mentally revisit previous answers.",
      "Before starting: eat, hydrate, use the bathroom, close distractions, check your connection, reserve the full window plus the practice round, and avoid starting while mentally fatigued.",
    ],
    recall: "Calibrate with the practice round, then commit, submit, and move forward.",
  },
];

export const togglPreparationTiers = [
  { title: "Tier 1 · Immediate focus", topics: "TypeScript discriminated unions/narrowing · Zustand selectors/state · React virtualization/performance · Performance metrics · Concise timed reasoning" },
  { title: "Tier 2 · Next focus", topics: "TanStack Query · Async engineering communication · Unfamiliar-technology/AI workflow · Full-stack/API/SQL judgment · GreenWallet stories" },
  { title: "Tier 3 · Supporting review", topics: "Toggl vocabulary · Spring Boot refresher · Security/testing fundamentals · Candidate-booklet review" },
];

export const togglAnswerFrameworks = [
  { question: "Hypothetical technical", framework: "Decision → Why → Validation" },
  { question: "Unfamiliar technology", framework: "Learn → Implement → Test → Measure" },
  { question: "Situational judgment", framework: "Problem → Risk/trade-off → Decision → Communication → Validation" },
  { question: "Experience", framework: "Situation → Decision → Outcome → Learning" },
];

// Official source review: 2026-10-07. Prompts are preparation exercises, not promised interview topics.
export const togglOfficialResources = [
  { title: "Candidate booklet", url: "https://toggl.com/candidate-booklet/", detail: "Review Toggl’s values, product direction, and ways of working." },
  { title: "Careers and hiring process", url: "https://toggl.com/jobs", detail: "Check current openings and hiring stages. Your individual job posting defines the process for your role." },
  { title: "Ace Your Interview", url: "https://toggl.notion.site/Ace-Your-Interview-cda2148086d74620944269b744a29630", detail: "Prepare specific examples, measurable impact, concise answers, and research into Toggl’s market and competitors." },
  { title: "Official YouTube channel", url: "https://www.youtube.com/@toggl", detail: "See product workflows in action and reinforce the domain vocabulary below." },
];

export const togglOfficialContext = [
  { title: "Product direction", detail: "The booklet describes a unified modular platform combining time tracking, planning, and insights. Track is the legacy flagship; Plan is being integrated and Work is becoming a module.", prompt: "Explain one user workflow connecting planned work, tracked time, and profitability." },
  { title: "Culture and ownership", detail: "Seven values: Trust, Communication, Respect, Sustained speed, Ownership, Innovativeness, and Freedom. Work emphasizes written communication, results, and autonomy.", prompt: "Prepare an example of an early written update when a delivery risk appeared." },
  { title: "AI and hiring", detail: "The booklet encourages AI-assisted work with personal accountability. Hiring considers both role skills and values, with later human interviews and hands-on work; stages vary by role.", prompt: "Explain an AI-assisted change you reviewed and validated, including what you can personally defend." },
];

export const togglOfficialVideos: PreparationVideo[] = [
  {
    youtubeId: "j0wvd_LaPIs",
    title: "Capacity Management Add-on in Toggl",
    channel: "Toggl",
    duration: "1:20",
    focus: "Future capacity, draft work, and forecasting",
    practice: "Design a capacity view for confirmed and draft projects. Explain what changes when work is scheduled or a holiday reduces availability, and how you would validate the forecast. This is a preparation exercise inspired by the product demo.",
  },
  {
    youtubeId: "XCpEB6pkjTY",
    title: "Project Planning and Profitability in Toggl",
    channel: "Toggl",
    duration: "1:07 excerpt",
    startSeconds: 57,
    endSeconds: 124,
    focus: "Billable rates and labor costs · 0:57–2:04",
    practice: "This excerpt comes from the official 10:24 walkthrough. Explain rate precedence and historical rates, then distinguish billed revenue from labor cost and profit. The full walkthrough also covers fixed fees, profitability, and billable utilisation.",
  },
];
