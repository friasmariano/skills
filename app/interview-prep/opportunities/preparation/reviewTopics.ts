export type ReviewEntry = { name: string; detail: string; code: string; cost: string };
export type ReviewTopic = { id: string; title: string; intro: string; entries: ReviewEntry[]; practice: string; sources: string[][] };

export const reviewTopics: ReviewTopic[] = [
  {
    "id": "ssr",
    "title": "Next.js SSR contribution",
    "intro": "Explain what server rendering contributes, choose request-time rendering intentionally, and keep interactive boundaries small. Examples target this project’s Next.js 16 App Router unless labeled otherwise. URL variables and load/save helpers in snippets are illustrative.",
    "entries": [
      {
        "name": "What SSR contributes",
        "detail": "SSR produces HTML on the server for the initial request, making content available before client JavaScript runs and helping discoverability. It adds server work and can increase time to first byte. Server Components keep their own code out of the browser bundle; Client Components still hydrate for interaction. A Server Component can be prerendered or rendered per request: “server” alone does not mean request-time SSR.",
        "code": "// app/products/page.tsx — Server Component by default\n// The URL is illustrative; validate API data at runtime.\ntype Product = { id: string; name: string };\nexport default async function ProductsPage() {\n  const response = await fetch(\"https://api.example.com/products\", {\n    cache: \"no-store\",\n  });\n  if (!response.ok) throw new Error(\"Could not load products\");\n  const products: Product[] = await response.json();\n  return <ul>{products.map(product => (\n    <li key={product.id}>{product.name}</li>\n  ))}</ul>;\n}",
        "cost": ""
      },
      {
        "name": "fetch(url, options)",
        "detail": "Await server data directly in an async Server Component. Explicit no-store requests fresh data; force-cache opts into reusable data. With the traditional caching model, next.revalidate sets a revalidation interval. Do not combine no-store with a positive revalidate value. Caching defaults and behavior depend on Next.js version and Cache Components configuration; this project uses Next.js 16 without Cache Components enabled.",
        "code": "// Fresh data: useful for frequently changing content.\nconst fresh = await fetch(url, { cache: \"no-store\" });\n// Reusable public data, with periodic revalidation.\nconst cached = await fetch(url, { next: { revalidate: 60 } });\n// Check status; fetch does not reject just because HTTP returned 404.\nif (!fresh.ok) throw new Error(`HTTP ${fresh.status}`);",
        "cost": ""
      },
      {
        "name": "cookies(), headers(), connection()",
        "detail": "cookies and headers are asynchronous request APIs. Use request data for personalization and enforce authorization on the server. connection waits for an incoming request and excludes the following work from prerendering when request-time rendering is needed without another request API. Never share a user-specific response through a public cache.",
        "code": "import { cookies, headers } from \"next/headers\";\nimport { connection } from \"next/server\";\n\nexport default async function RequestPage() {\n  await connection();\n  const cookieStore = await cookies();\n  const requestHeaders = await headers();\n  const locale = cookieStore.get(\"locale\")?.value ?? \"en\";\n  const agent = requestHeaders.get(\"user-agent\") ?? \"unknown\";\n  return <p>{locale}: {agent}</p>;\n}",
        "cost": ""
      },
      {
        "name": "Promise.all() and Suspense",
        "detail": "Start independent requests together to avoid waterfalls. Promise.all rejects if any input rejects. Suspense streams a fallback while an async child finishes; loading.tsx supplies a route loading boundary. Keep request-dependent work behind a Suspense boundary when using Cache Components. Streaming improves perceived progress but does not make the database query itself faster.",
        "code": "import { Suspense } from \"react\";\n\nasync function Summary() {\n  const [profile, projects] = await Promise.all([\n    loadProfile(), loadProjects(), // illustrative server loaders\n  ]);\n  return <p>{profile.name}: {projects.length} projects</p>;\n}\nexport default function Page() {\n  return <Suspense fallback={<p>Loading summary…</p>}>\n    <Summary />\n  </Suspense>;\n}",
        "cost": ""
      },
      {
        "name": "Client boundary and hydration",
        "detail": "Use a small Client Component for state, effects, and event handlers. Its initial markup can still be rendered on the server. Keep the server render and first browser render consistent: access localStorage in an effect, rather than during rendering. Pass only the data the client needs; secrets must stay on the server. use server marks server functions, not ordinary Server Components.",
        "code": "\"use client\";\nimport { useEffect, useState } from \"react\";\n\nexport default function Preference() {\n  const [theme, setTheme] = useState(\"light\");\n  useEffect(() => {\n    setTheme(localStorage.getItem(\"theme\") ?? \"light\");\n  }, []);\n  return <button onClick={() => setTheme(\"dark\")}>{theme}</button>;\n}",
        "cost": ""
      },
      {
        "name": "getServerSideProps(context) — Pages Router",
        "detail": "Runs per request in pages/, returning serializable props, a redirect, or notFound. It is not supported in app/. Use the inferred props type to connect the server loader to the page. Anything returned in props can reach the browser, including data fetched with a private credential.",
        "code": "// pages/profile.tsx — Pages Router only\nimport type { GetServerSideProps, InferGetServerSidePropsType } from \"next\";\n\nexport const getServerSideProps = (async (context) => {\n  const language = context.req.headers[\"accept-language\"] ?? \"en\";\n  return { props: { language } };\n}) satisfies GetServerSideProps<{ language: string }>;\n\nexport default function Profile(\n  props: InferGetServerSidePropsType<typeof getServerSideProps>\n) {\n  return <p>{props.language}</p>;\n}",
        "cost": ""
      }
    ],
    "practice": "Explain SSR versus static rendering and Server Components. Design a personalized dashboard with two independent data sources, a streamed loading state, and an interactive filter. Describe what you would measure: time to first byte, visible content, and client JavaScript size.",
    "sources": [
      [
        "Server and Client Components",
        "https://nextjs.org/docs/app/getting-started/server-and-client-components"
      ],
      [
        "fetch reference",
        "https://nextjs.org/docs/app/api-reference/functions/fetch"
      ],
      [
        "Request-time rendering",
        "https://nextjs.org/docs/app/api-reference/functions/connection"
      ],
      [
        "Pages Router SSR",
        "https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props"
      ]
    ]
  },
  {
    "id": "arrays",
    "title": "TypeScript array manipulation",
    "intro": "TypeScript adds static types to JavaScript array methods. Review return values, mutation, empty inputs, and reference sharing. Complexity assumes ordinary dense arrays and constant-time callbacks; the language specification does not guarantee engine performance.",
    "entries": [
      {
        "name": "Types, indexing, and readonly",
        "detail": "T[] and Array<T> describe the same array shape. readonly T[] prevents mutation through that reference but is shallow and does not freeze runtime data. Indexing can return undefined at runtime; noUncheckedIndexedAccess makes that possibility visible in the type. New arrays and copies still share nested objects.",
        "code": "type User = { id: number; name: string };\nconst users: User[] = [{ id: 1, name: \"Ana\" }];\nconst view: readonly User[] = users;\nconst first = users[0];\nif (first !== undefined) console.log(first.name);\n// view.push(...) is a type error, but nested objects remain mutable.",
        "cost": ""
      },
      {
        "name": "map(callback)",
        "detail": "Returns a new array with one result per present element. Use it to transform values, not just for side effects. The callback receives value, index, and the source array. It does not mutate the array by itself; your callback can still mutate referenced objects.",
        "code": "const lengths: number[] = [\"Ana\", \"Luis\"].map(name => name.length);\n// [3, 4]",
        "cost": "O(n) time; O(n) result space"
      },
      {
        "name": "filter(predicate)",
        "detail": "Returns a new array containing matches, preserving order. A type predicate can narrow unions. Filtering produces a shallow copy, so matched objects keep their identity.",
        "code": "const values: (number | null)[] = [1, null, 3];\nconst numbers = values.filter((x): x is number => x !== null);\n// number[]: [1, 3]",
        "cost": "O(n) time; up to O(n) result space"
      },
      {
        "name": "reduce(callback, initialValue)",
        "detail": "Folds the array into one result. Always supply an initial value when an empty array is possible; without one, reducing an empty array throws. Use an explicit generic for an accumulator whose type differs from the elements.",
        "code": "const total = [2, 3, 4].reduce((sum, x) => sum + x, 0); // 9\nconst byLength = [\"a\", \"cat\"].reduce<Record<string, number>>(\n  (result, word) => { result[word] = word.length; return result; },\n  {},\n);",
        "cost": "O(n) with constant-time callback; space depends on accumulator"
      },
      {
        "name": "find() and findIndex()",
        "detail": "Both stop at the first match. find returns the element or undefined; findIndex returns the index or -1. Never use a truthiness check for the index, because zero is valid and -1 is truthy.",
        "code": "const values = [10, 20, 30];\nconst found = values.find(x => x > 15); // number | undefined: 20\nconst index = values.findIndex(x => x > 15); // 1\nif (index !== -1) console.log(values[index]);",
        "cost": "O(n) worst case; O(1) auxiliary space"
      },
      {
        "name": "some() and every()",
        "detail": "some asks whether any element matches; every asks whether all elements match. Both short-circuit. On an empty array, some returns false and every returns true.",
        "code": "[1, 2, 3].some(x => x % 2 === 0); // true\n[1, 2, 3].every(x => x > 0); // true\n[].every(() => false); // true",
        "cost": "O(n) worst case; O(1) auxiliary space"
      },
      {
        "name": "includes() and indexOf()",
        "detail": "includes returns a boolean and can find NaN. indexOf returns the first matching index or -1 and cannot find NaN. Both compare objects by reference rather than by their properties. Use find for a property-based match.",
        "code": "[1, 2].includes(2); // true\n[1, 2].indexOf(9); // -1\n[NaN].includes(NaN); // true\n[NaN].indexOf(NaN); // -1",
        "cost": "O(n) worst case"
      },
      {
        "name": "slice(start, end)",
        "detail": "Copies a range without changing the original. Start is inclusive; end is exclusive. Negative indices count from the end. slice() makes a shallow copy of the whole array.",
        "code": "const values = [10, 20, 30, 40];\nvalues.slice(1, 3); // [20, 30]\nvalues.slice(-2); // [30, 40]\n// values is unchanged",
        "cost": "O(k) time and result space for k copied elements"
      },
      {
        "name": "splice(start, deleteCount, ...items)",
        "detail": "Mutates the array to remove, insert, or replace elements; returns an array of removed elements. A deleteCount of zero inserts without removing. Front and middle operations require moving later elements.",
        "code": "const values = [1, 2, 3];\nconst removed = values.splice(1, 1, 9, 8);\n// removed: [2]; values: [1, 9, 8, 3]",
        "cost": "O(n + m) worst case for n existing and m inserted elements"
      },
      {
        "name": "toSpliced(), with()",
        "detail": "These modern copy methods preserve the original. toSpliced returns the modified copy, rather than the removed elements. with replaces one index, allows negative indices, and throws RangeError for an invalid index. Check runtime support; TypeScript library types do not add polyfills.",
        "code": "const values = [1, 2, 3];\nvalues.toSpliced(1, 1, 9); // [1, 9, 3]\nvalues.with(-1, 8); // [1, 2, 8]\n// values remains [1, 2, 3]",
        "cost": "O(n + m) for toSpliced; O(n) for with"
      },
      {
        "name": "push() and pop()",
        "detail": "Both mutate the end. push returns the new length, not the array. pop returns the removed value or undefined if empty. End insertion is typically amortized constant time in common engines, but ECMAScript does not mandate these bounds.",
        "code": "const values: number[] = [];\nconst length = values.push(5, 6); // 2\nconst last = values.pop(); // number | undefined: 6",
        "cost": "Typically amortized O(1) per end insertion; typically O(1) removal"
      },
      {
        "name": "unshift() and shift()",
        "detail": "Both mutate the beginning. unshift returns the new length; shift returns the removed value or undefined. Repeated front operations are expensive for ordinary dense arrays; consider a queue with a head index.",
        "code": "const values = [2, 3];\nvalues.unshift(0, 1); // returns 4; values: [0, 1, 2, 3]\nvalues.shift(); // returns 0; values: [1, 2, 3]",
        "cost": "Typically O(n) due to shifting elements"
      },
      {
        "name": "sort() and toSorted()",
        "detail": "sort mutates and returns the same array; toSorted returns a sorted shallow copy. Default ordering is string-based, so supply a numeric comparator. A comparator returns negative, zero, or positive for before, equal, or after. Sorting complexity depends on the engine.",
        "code": "const values = [10, 2, 1];\nconst sorted = values.toSorted((a, b) => a - b); // [1, 2, 10]\nvalues.sort((a, b) => b - a); // values: [10, 2, 1]\n// Strings: names.toSorted((a, b) => a.localeCompare(b))",
        "cost": "Often O(n log n); implementation-dependent"
      },
      {
        "name": "reverse() and toReversed()",
        "detail": "reverse mutates and returns the same array. toReversed returns a reversed shallow copy. Copying the array does not clone its object elements.",
        "code": "const values = [1, 2, 3];\nvalues.toReversed(); // [3, 2, 1], original unchanged\nvalues.reverse(); // original now [3, 2, 1]",
        "cost": "O(n); copied result uses O(n) space"
      },
      {
        "name": "flat(depth) and flatMap(callback)",
        "detail": "flat flattens nested arrays to the requested depth, defaulting to one. flatMap transforms and then flattens one level; return [] to drop an item, or several elements to expand it. Both return new arrays.",
        "code": "[[1], [2, [3]]].flat(2); // [1, 2, 3]\n[1, 2, 3].flatMap(x => x % 2 === 0 ? [] : [x, x * 10]);\n// [1, 10, 3, 30]",
        "cost": "Time and result space scale with visited and produced elements"
      },
      {
        "name": "forEach() and for…of",
        "detail": "forEach returns undefined and cannot be stopped with break. It does not await async callbacks. Use for…of with await for sequential work, or Promise.all(array.map(...)) for concurrent work; consider a concurrency limit for large batches.",
        "code": "async function process(ids: number[]) {\n  for (const id of ids) await save(id); // illustrative async save\n  await Promise.all(ids.map(id => save(id))); // concurrent alternative\n}\n[1, 2].forEach(x => console.log(x)); // returns undefined",
        "cost": "O(n) iterations; asynchronous cost depends on work"
      },
      {
        "name": "at(index), concat(), join()",
        "detail": "at supports negative indexing and returns undefined outside the range. concat returns a shallow combined array. join converts elements to strings with a separator; it is not structured serialization.",
        "code": "[10, 20].at(-1); // 20\n[1, 2].concat([3]); // [1, 2, 3]\n[\"a\", \"b\"].join(\" / \"); // \"a / b\"",
        "cost": "at typically O(1); concat O(result length); join scales with output"
      },
      {
        "name": "Array.from(), fill(), copyWithin()",
        "detail": "Array.from builds an array from an iterable or array-like input and accepts a mapping callback. fill mutates a range using the same supplied value in every slot; avoid sharing one object unintentionally. copyWithin mutates by copying a range inside the same array without changing its length.",
        "code": "const independent = Array.from({ length: 3 }, () => ({ count: 0 }));\nconst shared = Array(3).fill({ count: 0 }); // same object in all slots\nconst values = [1, 2, 3, 4];\nvalues.fill(9, 1, 3); // [1, 9, 9, 4]\nvalues.copyWithin(0, 2); // [9, 4, 9, 4]",
        "cost": "O(k) for k initialized or copied positions"
      },
      {
        "name": "Immutable updates in React",
        "detail": "Return a new array when changing state. Clone the changed object as well; spreading only the array does not copy its elements. Use stable IDs as React keys when items can be inserted, sorted, or removed.",
        "code": "type Item = { id: number; done: boolean };\nfunction markDone(items: readonly Item[], id: number): Item[] {\n  return items.map(item => item.id === id ? { ...item, done: true } : item);\n}\n// setItems(previous => markDone(previous, selectedId));",
        "cost": "O(n) time and result space"
      }
    ],
    "practice": "Given typed orders, filter paid orders, compute a total, sort a copy by price, and update one order without mutating the input. Explain why async forEach and a missing findIndex check can produce bugs.",
    "sources": [
      [
        "Array method reference",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
      ],
      [
        "TypeScript array and readonly types",
        "https://www.typescriptlang.org/docs/handbook/2/objects.html"
      ]
    ]
  },
  {
    "id": "maps",
    "title": "TypeScript Map manipulation",
    "intro": "Use Map<K, V> for keyed collections. Distinguish key presence from a missing value, understand insertion order, and choose deliberate conversions at JSON and React state boundaries.",
    "entries": [
      {
        "name": "new Map<K, V>() and key identity",
        "detail": "Map stores typed key/value pairs and preserves insertion order. Keys can be strings, numbers, or objects. Object keys compare by identity; NaN keys match NaN, and +0 and -0 are the same key. Repeated keys overwrite values without adding another entry. Map is a collection; array.map is a transformation method.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3], [\"Luis\", 5]]);\nconst key = { id: 1 };\nconst objects = new Map<object, string>([[key, \"found\"]]);\nobjects.get(key); // \"found\"\nobjects.get({ id: 1 }); // undefined: a different object",
        "cost": "Construction scales with input entries; lookup must be sublinear on average by specification"
      },
      {
        "name": "set(key, value)",
        "detail": "Adds or updates an entry, mutates the Map, and returns the Map itself for chaining. Updating an existing key does not move its insertion position; deleting and reinserting it does.",
        "code": "const scores = new Map<string, number>();\nscores.set(\"Ana\", 3).set(\"Luis\", 5);\nscores.set(\"Ana\", 8); // size still 2; Ana still first",
        "cost": "Typically O(1) average in hash-based implementations; not mandated O(1)"
      },
      {
        "name": "get(key) and has(key)",
        "detail": "get returns V | undefined. has checks key presence, distinguishing an absent key from a key storing undefined. Nullish coalescing supplies a fallback while preserving zero. TypeScript does not generally narrow a later get call just because has was true.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 0]]);\nconst score = scores.get(\"Ana\") ?? 10; // 0\nconst value = scores.get(\"Luis\");\nif (value !== undefined) console.log(value.toFixed(1));\nconst optional = new Map<string, number | undefined>([[\"Ana\", undefined]]);\noptional.has(\"Ana\"); // true; optional.get(\"Ana\") is undefined",
        "cost": "Typically O(1) average; engine-dependent"
      },
      {
        "name": "delete(key), clear(), size",
        "detail": "delete mutates and returns true if an entry existed, otherwise false. clear removes all entries and returns undefined. size is a property containing the entry count, not a method.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3]]);\nscores.size; // 1\nscores.delete(\"Ana\"); // true\nscores.delete(\"Ana\"); // false\nscores.clear(); // undefined; size is 0",
        "cost": "delete typically O(1) average; clear implementation-dependent"
      },
      {
        "name": "keys(), values(), entries(), for…of",
        "detail": "The methods return iterators in insertion order, not arrays. entries yields [key, value] pairs and is also the default Map iterator. Convert to arrays for array methods. Avoid changing the collection while traversing it unless you deliberately want live iterator behavior.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3], [\"Luis\", 5]]);\nconst names = [...scores.keys()]; // string[]\nconst total = [...scores.values()].reduce((sum, x) => sum + x, 0);\nfor (const [name, score] of scores) console.log(name, score);",
        "cost": "O(n) full traversal; materialized arrays use O(n) space"
      },
      {
        "name": "forEach(callback)",
        "detail": "Invokes callback(value, key, map), which differs from array callbacks. Returns undefined. Cannot break and does not await async callbacks; use for…of for control flow and sequential async processing.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3]]);\nscores.forEach((score, name, map) => {\n  console.log(name, score, map.size);\n});",
        "cost": "O(n) traversal"
      },
      {
        "name": "Transform, filter, and merge",
        "detail": "Map has no Array-style map or filter methods. Convert entries to an array, transform them, and build a new Map. A merge using spread keeps the later value for duplicate keys. Tuple annotations prevent transformed entries from being inferred as loose arrays.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3], [\"Luis\", 5]]);\nconst doubled = new Map([...scores].map(\n  ([key, value]): [string, number] => [key, value * 2],\n));\nconst high = new Map([...scores].filter(([, value]) => value >= 5));\nconst merged = new Map([...scores, ...new Map([[\"Ana\", 9]])]);",
        "cost": "O(n) traversal plus construction; O(n) result space in common implementations"
      },
      {
        "name": "Frequency counting and grouping",
        "detail": "Use get plus a default to accumulate counts in one pass. Group into arrays by key when several records belong to a category. The groups below own their arrays, so pushing is safe inside this local builder.",
        "code": "const counts = new Map<string, number>();\nfor (const word of [\"a\", \"b\", \"a\"]) {\n  counts.set(word, (counts.get(word) ?? 0) + 1);\n}\n// a → 2, b → 1\nconst groups = new Map<number, string[]>();\nfor (const word of [\"a\", \"to\", \"be\"]) {\n  const bucket = groups.get(word.length) ?? [];\n  bucket.push(word);\n  groups.set(word.length, bucket);\n}",
        "cost": "Typically O(n) average time; O(n) space for grouped values"
      },
      {
        "name": "Map vs Record and JSON conversion",
        "detail": "Record<K, V> is a TypeScript object type, not a runtime collection. Use Map for arbitrary keys and frequent collection operations; use a string-keyed object for ordinary JSON data. JSON.stringify(new Map(...)) yields {} by default. Entry arrays preserve primitive key types; object keys lose identity after JSON round-tripping. Object.fromEntries converts keys to object property keys and can cause collisions.",
        "code": "const scores = new Map<string, number>([[\"Ana\", 3]]);\nconst json = JSON.stringify([...scores]); // [[\"Ana\",3]]\n// Validate parsed input before constructing a Map.\nconst object = Object.fromEntries(scores); // { Ana: 3 }\nconst map = new Map(Object.entries({ Ana: 3 }));\ntype Scores = Record<string, number>;",
        "cost": "O(n) conversion plus serialization cost"
      },
      {
        "name": "ReadonlyMap and React state",
        "detail": "ReadonlyMap<K, V> prevents set/delete/clear through that type but remains shallow. For React state, copy the Map before modifying it so React sees a new reference. Clone modified object values too. Repeatedly copying a large Map costs linear time.",
        "code": "function updateScore(\n  previous: ReadonlyMap<string, number>, name: string, score: number,\n): Map<string, number> {\n  const next = new Map(previous);\n  next.set(name, score);\n  return next;\n}\n// setScores(previous => updateScore(previous, \"Ana\", 9));",
        "cost": "O(n) to copy; values still share references"
      }
    ],
    "practice": "Count repeated words, group users by team, and merge two score maps with the second taking precedence. Explain object-key identity, get versus has, and how to serialize a Map safely.",
    "sources": [
      [
        "Map method reference",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
      ],
      [
        "TypeScript utility types",
        "https://www.typescriptlang.org/docs/handbook/utility-types.html"
      ]
    ]
  }
];
