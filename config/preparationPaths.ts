export type PreparationStep = {
  id: string;
  title: string;
  description: string;
  tasks: string[];
};

export const togglPreparationSteps: PreparationStep[] = [
  {
    id: "format",
    title: "Understand the assessment format",
    description: "Use the supplied assessment overview to plan your preparation.",
    tasks: [
      "Expect 11 questions, a maximum of 32 minutes, and individual limits of 30–240 seconds.",
      "Complete the 3 optional, unscored practice questions to learn the interface and calibrate your pace.",
      "Prepare for multiple-choice, situational judgment, and open-ended reasoning or experience questions.",
      "Reserve one uninterrupted sitting. You cannot return to previous questions.",
      "The overview says questions are generated from the job requirements, assessed by AI, then reviewed by the Talent team alongside your application.",
    ],
  },
  {
    id: "culture",
    title: "Connect culture with engineering decisions",
    description: "Read the candidate booklet and use the culture themes from your notes as discussion prompts.",
    tasks: [
      "Review communication, trust, freedom, ownership, and respect in the candidate booklet. Check the current wording and hiring guidance.",
      "Reflect on Results and Accountability First (RAFT): describe how you plan your work and take responsibility for outcomes.",
      "Practice a blocker scenario: gather context, write down assumptions, communicate asynchronously, make a safe decision within your scope, and escalate when impact warrants it.",
      "Explain how you balance autonomy with visibility, and how a simple, maintainable solution supports sustained delivery.",
    ],
  },
  {
    id: "fundamentals",
    title: "Refresh full stack judgment",
    description: "Review decisions and tradeoffs across the stack. The supplied format suggests emphasizing reasoning; it does not guarantee specific topics.",
    tasks: [
      "React and TypeScript: component boundaries, state ownership, type safety, and state-management choices.",
      "APIs and Spring Boot: request validation, error handling, service boundaries, and backend fundamentals.",
      "SQL and PostgreSQL: schema design, indexes, transactions, and diagnosing slow queries.",
      "Security and authentication: authorization, session handling, input validation, and protecting sensitive data.",
      "Testing and production: useful test coverage, debugging, incident communication, deployment, and rollback.",
      "Performance and scalability: measure the bottleneck, consider user impact, and compare the simplest viable solutions.",
    ],
  },
  {
    id: "stories",
    title: "Build your GreenWallet story bank",
    description: "Prepare concrete examples from your own work without inventing results or metrics.",
    tasks: [
      "Choose examples involving Next.js, React, TypeScript, Spring Boot, PostgreSQL, authentication, API design, deployment, performance, architecture, or UX.",
      "For each example, write: situation → decision → why → result → what you learned.",
      "Clarify your personal contribution and the alternatives you considered.",
      "Include stories about ownership, disagreement, incomplete requirements, and balancing product value with technical quality.",
    ],
  },
  {
    id: "reasoning",
    title: "Practice concise answers",
    description: "Make your reasoning easy to follow under time pressure.",
    tasks: [
      "For situational questions, use: context → risk or tradeoff → decision → communication → validation.",
      "For open-ended questions, lead with the decision, then reasoning, tradeoff, and a relevant example or result.",
      "Practice a feature due tomorrow with architectural debt: identify the risk, choose the smallest safe change, communicate the compromise, and plan follow-up work.",
      "For multiple-choice questions, compare correctness, user impact, simplicity, maintainability, and communication before committing.",
    ],
  },
  {
    id: "timed-practice",
    title: "Rehearse the timer and get ready",
    description: "These are suggested practice tactics, rather than confirmed question-type timings.",
    tasks: [
      "Try a 30-second recognition exercise: read carefully and make a decision.",
      "Try a 60–120-second scenario: identify the core problem, compare options, and explain your choice.",
      "Try a 240-second experience response: leave time to review clarity and completeness before submitting.",
      "Practice moving on after submitting an answer instead of revisiting it mentally.",
      "Before starting, check your connection, remove distractions, and reserve the full assessment window plus time for the practice round.",
    ],
  },
];
