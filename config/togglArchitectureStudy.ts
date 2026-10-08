// Transcribed from the supplied Day 1 architecture study guide (October 8, 2026).
// These are study themes and viewing budgets, not an official interview syllabus or video runtimes.
export const togglArchitectureLessons = [
  {
    id: "boundaries", title: "Architecture fundamentals", reading: 15, video: 10,
    objective: "Describe a module’s responsibility, its dependencies, and why its boundary makes change easier.",
    notes: [
      "Modularity divides a system into units with explicit responsibilities and interfaces. Cohesion keeps closely related behavior together; coupling describes dependence on another module’s details. Prefer stable contracts over shared implementation knowledge.",
      "Separate presentation, business rules, persistence, and integrations. Time entries, reporting, and billing can be useful domain boundaries; reporting should consume an intentional interface rather than unrelated internals.",
      "Folders alone do not establish modularity: dependency direction, ownership, and contracts determine whether modules can change independently. Introduce abstractions when they clarify responsibilities.",
    ],
    watch: { title: "The C4 Model: Visualizing Software Architecture", authors: "Simon Brown & Susanne Kaiser", url: "https://gotopia.tech/episodes/449/c4-model", focus: "Communicate the system, its major parts, and their relationships." },
    readings: [], connection: "Module systems, MVC/MVVM/Flux, and principles for leading a large frontend project.",
  },
  {
    id: "deployment", title: "Modular monolith vs microservices", reading: 15, video: 15,
    objective: "Explain when deployment independence justifies the cost of a distributed system.",
    notes: [
      "A modular monolith can support fast delivery and straightforward operations. Microservices become attractive when independent scaling, deployment, ownership, or isolation solves a concrete need; useful boundaries and operational capability remain essential.",
      "Expensive report generation might first move to a background worker. A separately deployed reporting service is a further decision supported by load and ownership evidence.",
      "Micro frontends are a related frontend ownership and deployment choice; a microservices backend does not automatically require them.",
    ],
    watch: { title: "Modular Monoliths", authors: "Simon Brown", url: "https://gotober.com/2018/sessions/515/modular-monoliths", focus: "Connect good module boundaries with deployment choices." },
    readings: [{ title: "Fowler and Lewis on microservices", url: "https://martinfowler.com/articles/microservices.html" }], connection: "Micro frontends and independent frontend ownership.",
  },
  {
    id: "frontend", title: "Frontend architecture", reading: 25, video: 10,
    objective: "Choose component boundaries, state ownership, and rendering approaches for a React/Next.js feature.",
    notes: [
      "Organize around meaningful features and reusable UI responsibilities. Keep domain rules out of display-only components; extract components where responsibility or reuse creates a useful boundary.",
      "Local UI state belongs near its component; shared client state belongs in a common owner, context, or suitable store; server state belongs in a fetching/cache layer; URL state such as filters and pagination belongs in route or search parameters.",
      "Derive values from existing state when possible and keep one source of truth to reduce synchronization bugs. Review loading, empty, error, and success states together.",
      "Compare client rendering, server rendering, static generation, and hydration. Server Components determine where component logic executes; SSR provides initial HTML. App Router server capabilities suit data access and rendering, while Client Components handle interaction and browser APIs and can participate in initial server prerendering.",
    ],
    watch: { title: "Next.js 15 Tutorial - 51 - React Server Components", authors: "Codevolution", url: "https://www.youtube.com/watch?v=Nnr6w8vamUo", focus: "Use the tutorial for conceptual orientation and the linked current documentation for implementation details." },
    readings: [{ title: "React: Choosing the State Structure", url: "https://react.dev/learn/choosing-the-state-structure" }, { title: "Next.js: Server and Client Components", url: "https://nextjs.org/docs/app/getting-started/server-and-client-components" }], connection: "SSR, Redux trade-offs, React performance, skeleton screens, pagination, and design systems.",
  },
  {
    id: "contracts", title: "API and data architecture", reading: 20, video: 20,
    objective: "Describe a stable API contract and identify the data guarantees a feature requires.",
    notes: [
      "Model REST resources clearly and use HTTP methods and status codes consistently. Include validation, authorization, pagination, and predictable errors. Plan how consumers handle additive changes and how breaking changes are managed.",
      "Start data modeling with entities, relationships, and invariants: for example, workspaces, users, projects, and time entries. Enforce ownership and authorization on the server. Choose indexes from access patterns and denormalize when a demonstrated read need justifies synchronization costs.",
      "Define what users must observe: an edit may require immediate read-after-write visibility, while an aggregate report may tolerate a documented delay. Transactions protect related changes within their supported boundary; queues and replicated data need explicit failure and duplicate-delivery handling.",
      "Retries can repeat writes; idempotency mechanisms help make repeats safe. Caches require freshness decisions, and optimistic UI requires recovery when a write fails. Review no-cache versus no-store and remember that CORS does not replace authorization.",
    ],
    watch: { title: "Principles of Web API Design: Delivering Value with APIs and Microservices", authors: "James Higginbotham", url: "https://gotopia.tech/episodes/170/principles-of-web-api-design-delivering-value-with-apis-and-microservices", focus: "Consumer needs and intentional contracts." },
    readings: [{ title: "Cloud API Design Guide", url: "https://docs.cloud.google.com/apis/design" }, { title: "Optional depth: Staying in Sync: From Transactions to Streams — Martin Kleppmann", url: "https://martin.kleppmann.com/2016/03/07/qcon-london.html" }], connection: "HTTP methods/status codes, HTTP caching, pagination, login, and cross-origin access.",
  },
  {
    id: "trade-offs", title: "Engineering trade-offs", reading: 15, video: 15,
    objective: "Compare plausible options using explicit constraints and measurable consequences.",
    notes: [
      "Compare scalability (load, bottlenecks, latency, cost), maintainability (understanding, changing, validating behavior), complexity (moving parts, failure modes, operations), and delivery (time to useful release and safe iteration).",
      "A cache can lower latency while adding invalidation work. A shared library can reduce duplication while coordinating consumer releases. Asynchronous reporting can protect request latency while delaying results.",
      "Start with the requirement and the simplest viable options. Separate observed constraints from forecasts. Record the accepted cost and evidence that would justify revisiting the decision. Measure before optimizing and include rollout and recovery costs.",
    ],
    watch: { title: "Software Architecture: The Hard Parts", authors: "Neal Ford & Mark Richards", url: "https://gotopia.tech/episodes/213/software-architecture-the-hard-parts", focus: "Coupling and trade-off analysis." },
    readings: [], connection: "Performance bottlenecks and metrics, error tracking, image loading, and validation strategy.",
  },
  {
    id: "decisions", title: "Senior-level decision-making", reading: 10, video: 10,
    objective: "Communicate a recommendation, its assumptions, consequences, and how it will be evaluated.",
    notes: [
      "Use Context → constraints → options → recommendation → consequences → validation → revisit trigger. Capture the reasoning in a short architecture decision record, name uncertainty, gather evidence where it matters, and involve the people who will build and operate the result.",
      "Growth: improve queries, add caching, introduce a worker, or extract a service based on the measured bottleneck. Frontend coordination: balance shared components and conventions with feature ownership.",
      "Data correctness: identify workflows needing immediate consistency and those tolerating delayed updates. Delivery pressure: make a bounded compromise with an owner and clear revisit condition.",
      "When a decision is disputed or mistaken, compare evidence, explain consequences, and revise the recommendation when needed.",
    ],
    watch: { title: "Facilitating Software Architecture: Empowering Teams to Make Architectural Decisions", authors: "Andrew Harmel-Law & Sonya Natanzon", url: "https://gotopia.tech/episodes/348/facilitating-software-architecture-empowering-teams-to-make-architectural-decisions", focus: "Shared decision-making and cognitive biases." },
    readings: [], connection: "Feedback after a wrong decision, disagreement, retrospectives, and collaboration.",
  },
];

export const togglArchitectureComparison = [
  ["Deployment", "Modules deployed together", "Services can deploy independently"],
  ["Communication", "Usually in-process", "Network calls or messages"],
  ["Data integrity", "Local transactions are often simpler", "Cross-service consistency needs explicit design"],
  ["Scaling", "Scale the application or isolate heavy work", "Scale services independently"],
  ["Operations", "Fewer moving parts", "More deployment, monitoring, and failure handling"],
];

export const togglArchitectureChecklist = [
  "Review modularity, cohesion, coupling, and separation of concerns.",
  "Summarize the operational costs and benefits of both deployment models.",
  "Review React component boundaries and the four categories of state.",
  "Distinguish SSR, Server Components, Client Components, and hydration.",
  "Review API contracts, pagination, validation, and authorization.",
  "Review data invariants, transactions, freshness, retries, and idempotency.",
  "Capture one benefit and one accepted cost for each architecture choice studied.",
  "Save the senior decision-making sequence in your notes.",
  "Watch the core videos within the suggested time budgets.",
  "Mark remaining videos and unclear concepts for a later session.",
];
