export type ChecklistSection = { id: string; level: number; title: string; items: { id: string; kind: "improvement" | "test"; text: string }[]; acceptance: string };

export const checklistSections: ChecklistSection[] = [
  {
    "id": "controllers-and-services-ownership-and-mutation-behavior",
    "level": 1,
    "title": "Controllers and services: ownership and mutation behavior",
    "items": [
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-1",
        "kind": "improvement",
        "text": "Move transaction creation, relationship resolution, update, and deletion into explicit service use cases with transaction boundaries."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-2",
        "kind": "improvement",
        "text": "Require authenticated ownership for every private resource operation, including deletion."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-3",
        "kind": "improvement",
        "text": "Load an existing transaction by ID and owner before updating it; mutate that entity rather than constructing a replacement with an arbitrary ID."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-4",
        "kind": "improvement",
        "text": "Validate ownership of referenced budgets, pots, bills, and recipients inside the service. Treat global reference data separately."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-5",
        "kind": "improvement",
        "text": "Define PUT replacement semantics and PATCH partial-update semantics if PATCH is offered."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-6",
        "kind": "improvement",
        "text": "Ensure every supported update field is handled, including external and optional relationships."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-7",
        "kind": "improvement",
        "text": "Restrict unscoped service methods to explicitly authorized administrative/internal workflows."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-8",
        "kind": "test",
        "text": "User A cannot read, update, delete, or attach User B's resources."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-9",
        "kind": "test",
        "text": "Direct service calls enforce the same ownership rules as HTTP calls."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-10",
        "kind": "test",
        "text": "Missing and foreign-owned resources follow the documented error policy without leaking ownership."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-11",
        "kind": "test",
        "text": "Successful updates persist every supported field and preserve identity/ownership."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-12",
        "kind": "test",
        "text": "Invalid updates leave the previous state unchanged."
      },
      {
        "id": "controllers-and-services-ownership-and-mutation-behavior-13",
        "kind": "test",
        "text": "Failure during a multi-write use case rolls back all related database changes."
      }
    ],
    "acceptance": "an automated two-user integration suite covers each private resource's read/create/update/delete paths and relationship associations."
  },
  {
    "id": "models-and-request-dtos-financial-integrity",
    "level": 1,
    "title": "Models and request DTOs: financial integrity",
    "items": [
      {
        "id": "models-and-request-dtos-financial-integrity-1",
        "kind": "improvement",
        "text": "Define whether amounts must be positive and how transaction type expresses direction."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-2",
        "kind": "improvement",
        "text": "Define currency, precision, scale, maximum amount, and rounding behavior."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-3",
        "kind": "improvement",
        "text": "Add nonblank and length constraints for descriptions and appropriate limits for other strings."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-4",
        "kind": "improvement",
        "text": "Validate cross-field rules such as external transactions versus source pots."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-5",
        "kind": "improvement",
        "text": "Enforce required ownership and relationships with database constraints as well as application rules."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-6",
        "kind": "improvement",
        "text": "Remove ineffective constraints such as @NotNull on primitive booleans."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-7",
        "kind": "improvement",
        "text": "Keep persistence entities out of public responses, including transaction-type responses."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-8",
        "kind": "improvement",
        "text": "Define the intended effects of deleting transactions, pots, budgets, and recipients."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-9",
        "kind": "test",
        "text": "Missing, blank, oversized, zero, negative, over-limit, and over-precision inputs follow the documented rules."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-10",
        "kind": "test",
        "text": "Valid and invalid combinations of origin, transaction type, and related resources are covered."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-11",
        "kind": "test",
        "text": "Database writes cannot bypass required foreign keys, uniqueness, or nullability."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-12",
        "kind": "test",
        "text": "Balance calculations cover income, expenses, transfers, empty histories, and decimal boundaries."
      },
      {
        "id": "models-and-request-dtos-financial-integrity-13",
        "kind": "test",
        "text": "Deletion behavior preserves the documented financial invariants."
      }
    ],
    "acceptance": "financial rules have explicit examples and automated boundary tests; persisted values match the defined decimal policy."
  },
  {
    "id": "security-configuration-jwt-and-cookies",
    "level": 1,
    "title": "Security configuration, JWT, and cookies",
    "items": [
      {
        "id": "security-configuration-jwt-and-cookies-1",
        "kind": "improvement",
        "text": "Review every public endpoint and filter-chain matcher; default other routes to authenticated access."
      },
      {
        "id": "security-configuration-jwt-and-cookies-2",
        "kind": "improvement",
        "text": "Remove HTTP Basic if it is not an intended authentication mechanism."
      },
      {
        "id": "security-configuration-jwt-and-cookies-3",
        "kind": "improvement",
        "text": "Protect cookie-authenticated state-changing requests against CSRF, including authentication flows where applicable."
      },
      {
        "id": "security-configuration-jwt-and-cookies-4",
        "kind": "improvement",
        "text": "Verify production cookies use HttpOnly, Secure, and an intentional SameSite/domain/path policy."
      },
      {
        "id": "security-configuration-jwt-and-cookies-5",
        "kind": "improvement",
        "text": "Share the configured cookie name between CookieService and CookieBearerTokenResolver."
      },
      {
        "id": "security-configuration-jwt-and-cookies-6",
        "kind": "improvement",
        "text": "Define behavior when header and cookie credentials conflict."
      },
      {
        "id": "security-configuration-jwt-and-cookies-7",
        "kind": "improvement",
        "text": "Configure and validate JWT issuer and audience, expiration, signature, and accepted algorithms; validate not-before when present."
      },
      {
        "id": "security-configuration-jwt-and-cookies-8",
        "kind": "improvement",
        "text": "Require essential token claims and define token lifetime and clock-skew limits."
      },
      {
        "id": "security-configuration-jwt-and-cookies-9",
        "kind": "improvement",
        "text": "Verify RSA key strength and keep private keys outside version control and logs. An X.509 certificate is optional."
      },
      {
        "id": "security-configuration-jwt-and-cookies-10",
        "kind": "improvement",
        "text": "Define logout behavior honestly: clearing a cookie does not revoke a copied JWT."
      },
      {
        "id": "security-configuration-jwt-and-cookies-11",
        "kind": "improvement",
        "text": "Ensure development endpoints and privileged operations cannot be reached by ordinary production users."
      },
      {
        "id": "security-configuration-jwt-and-cookies-12",
        "kind": "test",
        "text": "Missing, malformed, expired, wrong-issuer, wrong-audience, invalid-signature, and unsupported-algorithm tokens are rejected."
      },
      {
        "id": "security-configuration-jwt-and-cookies-13",
        "kind": "test",
        "text": "Tokens missing required claims and tokens outside allowed time bounds are rejected."
      },
      {
        "id": "security-configuration-jwt-and-cookies-14",
        "kind": "test",
        "text": "Anonymous, normal-user, and administrator route permissions are tested."
      },
      {
        "id": "security-configuration-jwt-and-cookies-15",
        "kind": "test",
        "text": "Cookie-authenticated mutations without valid CSRF proof fail; valid requests succeed."
      },
      {
        "id": "security-configuration-jwt-and-cookies-16",
        "kind": "test",
        "text": "Allowed and disallowed CORS origins behave as specified."
      },
      {
        "id": "security-configuration-jwt-and-cookies-17",
        "kind": "test",
        "text": "Cookie creation/deletion attributes and configured names match."
      },
      {
        "id": "security-configuration-jwt-and-cookies-18",
        "kind": "test",
        "text": "Filter-chain matching is tested with the production profile."
      }
    ],
    "acceptance": "tests exercise the real SecurityFilterChain and JwtDecoder. Mock authenticated users are useful for authorization tests but do not establish JWT validation correctness."
  },
  {
    "id": "errors-and-api-limits",
    "level": 1,
    "title": "Errors and API limits",
    "items": [
      {
        "id": "errors-and-api-limits-1",
        "kind": "improvement",
        "text": "Replace generic exception messages with a safe public error and stable error code."
      },
      {
        "id": "errors-and-api-limits-2",
        "kind": "improvement",
        "text": "Correct the EmailAlreadyExistsException handler's mismatched parameter type."
      },
      {
        "id": "errors-and-api-limits-3",
        "kind": "improvement",
        "text": "Map not-found, validation, conflict, authentication, and authorization errors consistently."
      },
      {
        "id": "errors-and-api-limits-4",
        "kind": "improvement",
        "text": "Align security-filter error responses with controller errors."
      },
      {
        "id": "errors-and-api-limits-5",
        "kind": "improvement",
        "text": "Validate page >= 1 and enforce a maximum page size."
      },
      {
        "id": "errors-and-api-limits-6",
        "kind": "improvement",
        "text": "Replace or constrain unbounded transaction-list endpoints."
      },
      {
        "id": "errors-and-api-limits-7",
        "kind": "improvement",
        "text": "Use deterministic pagination ordering, such as date plus ID."
      },
      {
        "id": "errors-and-api-limits-8",
        "kind": "test",
        "text": "Error responses have the documented status, code, and field details."
      },
      {
        "id": "errors-and-api-limits-9",
        "kind": "test",
        "text": "Unexpected errors disclose no SQL, stack traces, secrets, or internal class names."
      },
      {
        "id": "errors-and-api-limits-10",
        "kind": "test",
        "text": "Invalid pagination returns a client error rather than an unexpected server error."
      },
      {
        "id": "errors-and-api-limits-11",
        "kind": "test",
        "text": "Equal-date records retain deterministic ordering on an unchanged dataset."
      },
      {
        "id": "errors-and-api-limits-12",
        "kind": "test",
        "text": "Public responses exclude credentials and unintended entity relationships."
      }
    ],
    "acceptance": ""
  },
  {
    "id": "concurrency-and-safe-retries",
    "level": 2,
    "title": "Concurrency and safe retries",
    "items": [
      {
        "id": "concurrency-and-safe-retries-1",
        "kind": "improvement",
        "text": "Define stale-update behavior and use optimistic versioning or another justified concurrency strategy."
      },
      {
        "id": "concurrency-and-safe-retries-2",
        "kind": "improvement",
        "text": "For retry-sensitive transaction creation, persist an owner-scoped idempotency key and request fingerprint atomically with the result."
      },
      {
        "id": "concurrency-and-safe-retries-3",
        "kind": "improvement",
        "text": "Reject reuse of the same key with different input."
      },
      {
        "id": "concurrency-and-safe-retries-4",
        "kind": "improvement",
        "text": "Define consistency requirements for multi-query balance calculations."
      },
      {
        "id": "concurrency-and-safe-retries-5",
        "kind": "improvement",
        "text": "Protect registration/provisioning uniqueness with database constraints, not only existence checks."
      },
      {
        "id": "concurrency-and-safe-retries-6",
        "kind": "test",
        "text": "Two competing updates produce the documented conflict or serialized result without a silent lost update."
      },
      {
        "id": "concurrency-and-safe-retries-7",
        "kind": "test",
        "text": "Concurrent requests with the same idempotency key create one financial record and return the defined result."
      },
      {
        "id": "concurrency-and-safe-retries-8",
        "kind": "test",
        "text": "Reusing a key with changed input returns a conflict."
      },
      {
        "id": "concurrency-and-safe-retries-9",
        "kind": "test",
        "text": "Failure before commit leaves no orphaned idempotency state or partial financial write."
      },
      {
        "id": "concurrency-and-safe-retries-10",
        "kind": "test",
        "text": "Concurrent registration/provisioning cannot create duplicate identities or defaults."
      }
    ],
    "acceptance": ""
  },
  {
    "id": "repositories-and-database-migrations",
    "level": 2,
    "title": "Repositories and database migrations",
    "items": [
      {
        "id": "repositories-and-database-migrations-1",
        "kind": "improvement",
        "text": "Move transfer aggregation from in-memory processing to an owner-scoped database query where appropriate."
      },
      {
        "id": "repositories-and-database-migrations-2",
        "kind": "improvement",
        "text": "Review query count and fetch behavior for transaction lists and dashboards."
      },
      {
        "id": "repositories-and-database-migrations-3",
        "kind": "improvement",
        "text": "Add indexes based on actual owner/filter/sort queries and measured query plans."
      },
      {
        "id": "repositories-and-database-migrations-4",
        "kind": "improvement",
        "text": "Verify Flyway migration from an empty database and the previous supported release."
      },
      {
        "id": "repositories-and-database-migrations-5",
        "kind": "improvement",
        "text": "Preserve data during migrations and define application/schema compatibility during rollout."
      },
      {
        "id": "repositories-and-database-migrations-6",
        "kind": "improvement",
        "text": "Document and exercise backup restoration."
      },
      {
        "id": "repositories-and-database-migrations-7",
        "kind": "test",
        "text": "Run repository tests against PostgreSQL, preferably through Testcontainers."
      },
      {
        "id": "repositories-and-database-migrations-8",
        "kind": "test",
        "text": "Verify scoped aggregates, empty results, date boundaries, pagination, and relevant constraints."
      },
      {
        "id": "repositories-and-database-migrations-9",
        "kind": "test",
        "text": "Verify rollback and locking behavior with the real database."
      },
      {
        "id": "repositories-and-database-migrations-10",
        "kind": "test",
        "text": "Migration tests preserve representative existing users and financial records."
      },
      {
        "id": "repositories-and-database-migrations-11",
        "kind": "test",
        "text": "Representative list/report requests have bounded query counts and acceptable query plans."
      }
    ],
    "acceptance": ""
  },
  {
    "id": "external-integrations-and-abuse-controls",
    "level": 2,
    "title": "External integrations and abuse controls",
    "items": [
      {
        "id": "external-integrations-and-abuse-controls-1",
        "kind": "improvement",
        "text": "Set connection and response deadlines for email, geolocation, and other dependencies."
      },
      {
        "id": "external-integrations-and-abuse-controls-2",
        "kind": "improvement",
        "text": "Retry only appropriate failures with bounded backoff and jitter; avoid duplicate side effects."
      },
      {
        "id": "external-integrations-and-abuse-controls-3",
        "kind": "improvement",
        "text": "Keep slow network calls outside database transactions where possible."
      },
      {
        "id": "external-integrations-and-abuse-controls-4",
        "kind": "improvement",
        "text": "Rate-limit authentication, recovery, registration, contact, and other abuse-sensitive operations."
      },
      {
        "id": "external-integrations-and-abuse-controls-5",
        "kind": "improvement",
        "text": "Define limiter behavior across multiple instances and cap storage growth."
      },
      {
        "id": "external-integrations-and-abuse-controls-6",
        "kind": "improvement",
        "text": "Define single-use and expiration behavior for verification/recovery tokens."
      },
      {
        "id": "external-integrations-and-abuse-controls-7",
        "kind": "test",
        "text": "Simulated timeouts, malformed responses, connection failures, and transient/permanent errors produce the defined outcomes."
      },
      {
        "id": "external-integrations-and-abuse-controls-8",
        "kind": "test",
        "text": "Retries stop at the configured bound and do not duplicate unsafe operations."
      },
      {
        "id": "external-integrations-and-abuse-controls-9",
        "kind": "test",
        "text": "Rate limits return the documented error and recover after the intended interval."
      },
      {
        "id": "external-integrations-and-abuse-controls-10",
        "kind": "test",
        "text": "Concurrent consumption of a single-use process token permits at most one success."
      },
      {
        "id": "external-integrations-and-abuse-controls-11",
        "kind": "test",
        "text": "Expired and already-used process tokens cannot complete the flow."
      }
    ],
    "acceptance": ""
  },
  {
    "id": "observability-and-runtime",
    "level": 2,
    "title": "Observability and runtime",
    "items": [
      {
        "id": "observability-and-runtime-1",
        "kind": "improvement",
        "text": "Add request correlation and propagate it across integration calls."
      },
      {
        "id": "observability-and-runtime-2",
        "kind": "improvement",
        "text": "Capture request latency, errors, throughput, database-pool pressure, and dependency failures."
      },
      {
        "id": "observability-and-runtime-3",
        "kind": "improvement",
        "text": "Redact credentials, JWTs, sensitive financial fields, and personal data from logs."
      },
      {
        "id": "observability-and-runtime-4",
        "kind": "improvement",
        "text": "Ensure logging failure cannot break or indefinitely block business requests."
      },
      {
        "id": "observability-and-runtime-5",
        "kind": "improvement",
        "text": "Separate liveness from readiness and restrict sensitive diagnostics."
      },
      {
        "id": "observability-and-runtime-6",
        "kind": "improvement",
        "text": "Validate required production configuration at startup."
      },
      {
        "id": "observability-and-runtime-7",
        "kind": "improvement",
        "text": "Verify graceful shutdown, deployment rollback, and operational alerts."
      },
      {
        "id": "observability-and-runtime-8",
        "kind": "improvement",
        "text": "Document numeric latency, throughput, and error-rate targets before load testing."
      },
      {
        "id": "observability-and-runtime-9",
        "kind": "test",
        "text": "Missing essential configuration fails startup with actionable, non-secret diagnostics."
      },
      {
        "id": "observability-and-runtime-10",
        "kind": "test",
        "text": "Dependency/database failures affect readiness according to policy without triggering an inappropriate restart loop."
      },
      {
        "id": "observability-and-runtime-11",
        "kind": "test",
        "text": "Logs and traces contain correlation IDs and exclude secrets."
      },
      {
        "id": "observability-and-runtime-12",
        "kind": "test",
        "text": "Logging storage failure does not take down transaction operations."
      },
      {
        "id": "observability-and-runtime-13",
        "kind": "test",
        "text": "Realistic load meets the documented targets using representative database size and pagination."
      },
      {
        "id": "observability-and-runtime-14",
        "kind": "test",
        "text": "Shutdown handles in-flight requests according to the documented deadline."
      }
    ],
    "acceptance": ""
  },
  {
    "id": "ci-and-coverage-policy",
    "level": 2,
    "title": "CI and coverage policy",
    "items": [
      {
        "id": "ci-and-coverage-policy-1",
        "kind": "improvement",
        "text": "Run unit, HTTP/security, and real-database integration tests on pull requests."
      },
      {
        "id": "ci-and-coverage-policy-2",
        "kind": "improvement",
        "text": "Generate JaCoCo line and branch reports for application code."
      },
      {
        "id": "ci-and-coverage-policy-3",
        "kind": "improvement",
        "text": "Establish the current baseline before introducing numeric gates."
      },
      {
        "id": "ci-and-coverage-policy-4",
        "kind": "improvement",
        "text": "Use an initial target of 80% line and 70% branch coverage for business/application code; tighten where useful. These are project targets, not a definition of seniority."
      },
      {
        "id": "ci-and-coverage-policy-5",
        "kind": "improvement",
        "text": "Require every listed critical financial and security scenario regardless of aggregate coverage percentage."
      },
      {
        "id": "ci-and-coverage-policy-6",
        "kind": "improvement",
        "text": "Exclude only justified generated/framework boilerplate; do not exclude difficult business logic to improve the score."
      },
      {
        "id": "ci-and-coverage-policy-7",
        "kind": "improvement",
        "text": "Block regressions in critical scenarios and unexplained coverage reductions."
      },
      {
        "id": "ci-and-coverage-policy-8",
        "kind": "improvement",
        "text": "Run migration checks on schema changes and load checks on relevant performance changes or release milestones."
      },
      {
        "id": "ci-and-coverage-policy-9",
        "kind": "improvement",
        "text": "Make tests deterministic and independent of developer credentials, production data, or live third-party services."
      }
    ],
    "acceptance": "a fresh checkout can execute the documented verification workflow, and CI protects the same behavior without local secrets."
  },
  {
    "id": "requirements",
    "level": 3,
    "title": "Capabilities justified by requirements",
    "items": [
      {
        "id": "requirements-1",
        "kind": "improvement",
        "text": "Add rotating signing keys with key IDs and an emergency compromise procedure."
      },
      {
        "id": "requirements-2",
        "kind": "improvement",
        "text": "Add refresh-token rotation/reuse detection if refresh tokens are introduced."
      },
      {
        "id": "requirements-3",
        "kind": "improvement",
        "text": "Introduce MFA or step-up authentication for high-risk operations if required."
      },
      {
        "id": "requirements-4",
        "kind": "improvement",
        "text": "Use a transactional outbox and asynchronous delivery when notifications must survive crashes."
      },
      {
        "id": "requirements-5",
        "kind": "improvement",
        "text": "Provide cancellable, owner-scoped import/export jobs when synchronous work exceeds practical deadlines."
      },
      {
        "id": "requirements-6",
        "kind": "improvement",
        "text": "Use ledger records, reversals, and reconciliation if the app becomes authoritative for actual funds."
      },
      {
        "id": "requirements-7",
        "kind": "improvement",
        "text": "Add cursor pagination or reporting read models after measuring a need."
      },
      {
        "id": "requirements-8",
        "kind": "improvement",
        "text": "Define service objectives and exercise dependency failure/recovery procedures."
      },
      {
        "id": "requirements-9",
        "kind": "test",
        "text": "Old and new verification keys work during rotation overlap; retired/compromised keys stop working according to policy."
      },
      {
        "id": "requirements-10",
        "kind": "test",
        "text": "Refresh-token reuse triggers the defined session response, if applicable."
      },
      {
        "id": "requirements-11",
        "kind": "test",
        "text": "Outbox delivery survives crash/restart and duplicates are handled safely."
      },
      {
        "id": "requirements-12",
        "kind": "test",
        "text": "Jobs enforce ownership, cancellation, limits, expiration, and recovery behavior."
      },
      {
        "id": "requirements-13",
        "kind": "test",
        "text": "Ledger reconciliation detects inconsistent records and reversal rules preserve history."
      },
      {
        "id": "requirements-14",
        "kind": "test",
        "text": "Failure exercises verify documented recovery objectives."
      }
    ],
    "acceptance": ""
  }
];
