export const greenWalletStories = [
  {
    "id": "architecture",
    "color": "mint",
    "title": "Structuring a React/Next.js/TypeScript application",
    "topic": "Architecture and maintainability",
    "caveat": null,
    "situation": "GreenWallet needed public pages, authenticated finance screens, interactive forms, and shared UI state.",
    "problem": "Mixing authentication, API calls, and presentation inside components would make features harder to maintain.",
    "decision": "Separate routes into (auth), (app), and (internal) groups; use server components for authentication checks, client components for interactions, typed services for API calls, and Redux slices for shared state.",
    "why": "Give each concern a clear home while keeping feature screens consistent.",
    "validation": "The authenticated layout verifies the user and redirects to login. Transaction screens delegate requests to TransactionService, which validates response shapes using Zod.",
    "result": "The implementation has reusable boundaries across finance features. There is no measured development-time improvement.",
    "learning": "TypeScript describes expected data; runtime validation checks what actually arrives. The remaining any types show that these boundaries can still improve.",
    "evidence": [
      "financeM-app/app/(app)/layout.tsx",
      "financeM-app/services/TransactionService.ts",
      "financeM-app/lib/store.ts"
    ]
  },
  {
    "id": "api-rules",
    "color": "blue",
    "title": "Designing a Spring Boot API around financial rules",
    "topic": "API design and data correctness",
    "caveat": null,
    "situation": "Transactions could represent external activity or activity funded from a saving pot.",
    "problem": "Accepting inconsistent combinations would undermine the financial model.",
    "decision": "Use request/response DTOs, controller-service-repository layers, and service validation: external transactions cannot reference a source pot; internal transactions must reference one.",
    "why": "Enforce the rule on the backend regardless of how a client submits data, and keep persistence entities separate from response contracts.",
    "validation": "TransactionService.save() rejects invalid combinations; the entity repeats the invariant through persistence callbacks. Controllers use @Valid and explicit response DTOs.",
    "result": "The normal save path contains explicit protection against invalid transaction origins. The repository does not demonstrate comprehensive behavioral test coverage.",
    "learning": "Authentication and record ownership require separate checks. Today I would add cross-user update/delete tests, because those controller paths do not consistently perform ownership-scoped lookups.",
    "evidence": [
      "financeM-api/src/main/java/com/finance/manager/controllers/TransactionController.java",
      "financeM-api/src/main/java/com/finance/manager/services/TransactionService.java"
    ]
  },
  {
    "id": "database-constraints",
    "color": "violet",
    "title": "Evolving PostgreSQL constraints",
    "topic": "Database decisions and incomplete information",
    "caveat": null,
    "situation": "The initial schema placed a global unique constraint on a budget's category.",
    "problem": "That constraint prevented multiple budgets from sharing a category, including budgets belonging to different users.",
    "decision": "Remove that uniqueness constraint through a Flyway migration, retain relational foreign keys, and express user-specific budget rules in the service.",
    "why": "Global category uniqueness was stronger than the product needed. Versioned migrations made the correction explicit. Monetary fields use SQL decimals and Java BigDecimal.",
    "validation": "V1 establishes the original constraint; V11 explicitly removes it. BudgetService checks names per user and prevents multiple default budgets per user.",
    "result": "The migration removes the global category restriction. Successful rollout and migration duration are not established by the repository.",
    "learning": "Constraints encode product assumptions. Application checks are useful, but concurrent requests may require matching database constraints; today I would test migration upgrades and concurrent budget creation.",
    "evidence": [
      "financeM-api/src/main/resources/db/migration/V1__.sql",
      "financeM-api/src/main/resources/db/migration/V11__Budgets_category-id_unique-constraint-deletion.sql",
      "financeM-api/src/main/java/com/finance/manager/services/BudgetService.java"
    ]
  },
  {
    "id": "jwt-authentication",
    "color": "amber",
    "title": "Connecting JWT authentication across Spring Boot and Next.js",
    "topic": "Authentication and security",
    "caveat": "Use this as a learning-unfamiliar-technology example only if JWT or Spring Security was new to you.",
    "situation": "The Java API and Next.js application needed to recognize the same authenticated user.",
    "problem": "Both systems needed trustworthy token verification and consistent browser cookie behavior.",
    "decision": "Issue RSA-signed JWTs from Spring Boot, transport them in HttpOnly cookies, and verify them using the public key in both the API and Next.js server code.",
    "why": "Next.js can verify identity without holding the signing private key. HttpOnly cookies prevent frontend JavaScript from reading the token.",
    "validation": "The backend configures a Nimbus encoder/decoder; Next.js explicitly verifies RS256; the authenticated layout rejects an unverifiable token.",
    "result": "Both applications implement verification of the same signed identity. No security audit or attack-resistance measurements are documented.",
    "learning": "Token verification, authorization, cookie lifetime, and CSRF protection are distinct concerns. Today I would test expired/tampered tokens and review cookie lifetime alignment and CSRF handling.",
    "evidence": [
      "financeM-api/src/main/java/com/finance/manager/config/SecurityConfig.java",
      "financeM-api/src/main/java/com/finance/manager/services/CookieService.java",
      "financeM-app/lib/auth.ts"
    ]
  },
  {
    "id": "cookie-configuration",
    "color": "rose",
    "title": "Debugging a production configuration problem",
    "topic": "Production debugging",
    "caveat": "The fix is documented; confirm the incident symptoms and recovery from your own experience.",
    "situation": "GreenWallet's deployment used an API subdomain and an application domain.",
    "problem": "The production JWT cookie was scoped to api.greenwalletapp.com, limiting its availability to the API host. That conflicts with the application server needing the cookie for authentication.",
    "decision": "Change the production cookie domain to greenwalletapp.com.",
    "why": "A parent-domain cookie can be available to the application and API hosts. Cookie clearing also needs matching domain and path attributes.",
    "validation": "Commit ead3967, dated September 4, 2026, records this exact configuration change. Today I would inspect Set-Cookie, confirm authenticated application navigation, and verify logout removes the cookie.",
    "result": "The production configuration was corrected. There is no evidence here of recovery time, affected-user count, or a successful post-deployment login.",
    "learning": "When login succeeds but the application appears logged out, trace cookie delivery and scope across hosts before assuming token generation is broken.",
    "evidence": [
      "financeM-api/src/main/resources/application-prod.properties",
      "Backend Git commit: ead3967"
    ]
  },
  {
    "id": "pagination",
    "color": "teal",
    "title": "Introducing pagination and consolidating error handling",
    "topic": "Performance and maintainability",
    "caveat": null,
    "situation": "Transaction history could grow, while multiple frontend services needed similar response handling.",
    "problem": "Loading complete histories increases response and rendering work; repeated error-handling code makes behavior harder to keep consistent.",
    "decision": "Add Spring Data pagination and frontend page controls, and move shared parsing, validation, and error handling into BaseService.",
    "why": "Bound transaction-list responses and reuse common service behavior. Offset pagination is a straightforward starting point without evidence requiring a more complex approach.",
    "validation": "Backend commit 42720a7 adds pagination; frontend commit 54be716 connects it to the transaction screen. Commit cac8286 records the error-handling abstraction.",
    "result": "Initial transaction loading requests pages of ten items, and services share error-handling helpers. No latency or maintainability improvement was measured. Create/update refreshes still call the unpaginated endpoint.",
    "learning": "An optimization must cover every refresh path. Today I would measure payload size, query time, and rendering duration, and test page-number consistency and stable ordering.",
    "evidence": [
      "financeM-app/app/(app)/transactions/TransactionsClient.tsx",
      "financeM-api/src/main/java/com/finance/manager/repositories/TransactionRepository.java",
      "financeM-app/services/BaseService.ts"
    ]
  }
] as const;
