import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Problem Solving | Skills',
  description: 'A deliberate practice loop and eight algorithm patterns, with exercises mapped to the BCTCI technical topic catalog.',
};

const steps = [
  { title: 'Notice', text: 'Read for structure before reaching for code. Clarify the output, input size, ordering, duplicates, and allowed changes. Work through a small example and describe a simple baseline.', question: 'What does the input guarantee, and what work does the baseline repeat?' },
  { title: 'Patterns', text: 'Use the clues to propose an approach. Sorted data, contiguous ranges, connectivity, and repeated states suggest different tools. State the invariant that makes your choice correct.', question: 'Why does this pattern fit, and what would make it fail?' },
  { title: '30 min', text: 'Give one problem a focused attempt. Spend 5 minutes understanding it, 5 planning, 15 implementing, and 5 testing. This is a practice budget; adjust it while learning a new topic.', question: 'Can I produce a correct, tested solution within my practice budget?' },
  { title: 'Say it', text: 'Explain the plan before coding and narrate meaningful decisions. Trace an example, justify the time and space costs, and identify a tradeoff. After reviewing a hint, close it and explain the idea again.', question: 'Can another person follow my reasoning without reading my code?' },
];

const patterns = [
  {
    id: 'two-pointers', title: 'Two pointers / binary search', chapter: 'Ch. 27 · Two Pointers, p. 294 / Ch. 29 · Binary Search, p. 326',
    cue: 'Sorted input lets you rule out candidates. Two pointers can narrow a pair; binary search can locate a value or a monotonic boundary.',
    name: 'Two Sum II — Input Array Is Sorted', slug: 'two-sum-ii-input-array-is-sorted',
    prompt: 'In a sorted integer array with exactly one valid pair, return the two 1-based indices whose values sum to the target. Use different elements and constant extra space.',
    example: '[1, 3, 5, 8], target = 11 → [2, 4]',
    hint: 'Start at both ends. If the sum is too small, advance the left pointer; if too large, retreat the right. Explain why the sorted order lets you discard every pair involving that endpoint.',
    cost: 'O(n) time, O(1) extra space. Searching for each complement with binary search is an O(n log n) alternative.',
    tests: 'Two elements; duplicate values at different indices; negative values; a pair at the ends.',
    explain: 'What changes if the input is unsorted? Why would sorting require tracking the original indices?',
  },
  {
    id: 'sliding-window', title: 'Sliding window', chapter: 'Ch. 38 · Sliding Windows, p. 509',
    cue: 'You need a contiguous substring or subarray, and its validity can be maintained as the boundaries move.',
    name: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters',
    prompt: 'Return the length of the longest contiguous part of a string that contains no repeated character.',
    example: '"abcaef" → 5 ("bcaef")',
    hint: 'Keep a set of characters in the current window. Before adding a duplicate, remove characters from the left until the window is valid. Each endpoint moves forward at most n times.',
    cost: 'O(n) expected time, O(min(n, alphabet size)) space with a hash set.',
    tests: 'Empty string; all identical characters; all unique characters; a duplicate far behind the right boundary.',
    explain: 'Why is this a substring rather than a subsequence? Why does a shrinking sum window need extra care when numbers can be negative?',
  },
  {
    id: 'hash-map', title: 'Hash map counting', chapter: 'Ch. 30 · Sets & Maps, p. 345 / Ch. 26 · String Manipulation, p. 288',
    cue: 'The answer depends on frequencies or grouping by a key. Counting can remove repeated scans or a sorting step.',
    name: 'Valid Anagram', slug: 'valid-anagram',
    prompt: 'Determine whether two lowercase English strings contain exactly the same letters with the same multiplicities.',
    example: '"aabbc", "bacab" → true; "aabbc", "bacac" → false',
    hint: 'Reject unequal lengths. Increment a count for each letter in the first string and decrement for the second. All final counts must be zero; a set alone loses multiplicity.',
    cost: 'O(n + m) time. A 26-entry frequency array uses O(1) space; a general character map uses O(u) space for u distinct characters.',
    tests: 'Different lengths; repeated letters; identical strings; same unique letters with different frequencies.',
    explain: 'How would Unicode change the character model? Decide whether you mean code points or user-perceived characters.',
  },
  {
    id: 'bfs', title: 'Breadth-first search', chapter: 'Ch. 36 · Graphs, p. 456 / Ch. 28 · Grids & Matrices, p. 312 / Ch. 32 · Stacks & Queues, p. 379',
    cue: 'Think in levels when every edge has equal cost, or when several sources spread simultaneously. BFS finds shortest paths in unweighted graphs.',
    name: 'Rotting Oranges', slug: 'rotting-oranges',
    prompt: 'A grid uses 0 for empty, 1 for fresh, and 2 for rotten. Each minute, rot spreads to fresh orthogonal neighbors. Return the time until no fresh orange remains, or -1 if some are unreachable.',
    example: '[[2, 1, 1]] → 2; [[2, 0, 1]] → -1',
    hint: 'Seed a queue with every rotten cell. Process one queue layer per minute and mark fresh neighbors when enqueuing them. Count remaining fresh cells to detect unreachable ones.',
    cost: 'O(rows × columns) time and space. In JavaScript, use a queue head index instead of repeatedly shifting an array.',
    tests: 'No fresh oranges; no rotten source; multiple sources; isolated fresh cells; a single row.',
    explain: 'Why must all sources start together? Why is ordinary BFS insufficient when edge costs differ?',
  },
  {
    id: 'dfs', title: 'Depth-first search', chapter: 'Ch. 36 · Graphs, p. 456 / Ch. 28 · Grids & Matrices, p. 312 / Ch. 33 · Recursion, p. 392',
    cue: 'Explore an entire connected component, follow dependencies, or traverse a tree branch before returning.',
    name: 'Number of Islands', slug: 'number-of-islands',
    prompt: 'Count connected land components in a grid of "1" and "0" cells. Land connects horizontally and vertically; diagonal contact does not join islands.',
    example: '[["1", "0"], ["0", "1"]] → 2',
    hint: 'When you encounter unvisited land, count a new island and traverse all its reachable land cells. Mark cells before exploring neighbors. Use an explicit stack if recursion could exceed the runtime stack limit.',
    cost: 'O(rows × columns) time; O(rows × columns) worst-case auxiliary space for the traversal stack and, if needed, a visited set.',
    tests: 'All water; all land; diagonal-only contact; one long winding island; disconnected components.',
    explain: 'Can the grid be mutated to mark visits? How would an explicit stack preserve the same traversal goal?',
  },
  {
    id: 'heap', title: 'Top K with a heap', chapter: 'Ch. 37 · Heaps, p. 489',
    cue: 'Keep a bounded collection of the best candidates while processing a larger input. You need efficient access to the weakest retained candidate.',
    name: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array',
    prompt: 'Find the kth value in descending sorted order without sorting the entire input. Repeated values each occupy a position.',
    example: '[7, 2, 7, 4, 9], k = 3 → 7',
    hint: 'Maintain a min-heap of at most k values. Push each value and remove the minimum whenever the heap exceeds k. The final root is the kth largest value.',
    cost: 'O(n log(k + 1)) time and O(k) space. The +1 keeps the expression valid when k = 1.',
    tests: 'k = 1; k = n; duplicate maxima; negative values; already sorted input.',
    explain: 'Why use a min-heap for the largest values? How does the heap invariant ensure a discarded value is unnecessary?',
  },
  {
    id: 'backtracking', title: 'Backtracking', chapter: 'Ch. 39 · Backtracking, p. 537 / Ch. 33 · Recursion, p. 392',
    cue: 'You must enumerate choices or arrangements. Build a partial answer, explore a choice, then restore the state.',
    name: 'Subsets', slug: 'subsets',
    prompt: 'Generate every subset of an array of distinct integers, including the empty subset. Return each subset once; output order does not matter.',
    example: '[2, 4] → [[], [2], [4], [2, 4]]',
    hint: 'At each index, branch on including or excluding that value. Copy the partial subset when saving an answer; after exploring an inclusion, undo it before the next branch.',
    cost: 'O(n × 2^n) time including output copies, O(n) auxiliary stack/path space, and O(n × 2^n) output space.',
    tests: 'A single element; the empty-subset result; distinct negative values; saved arrays that accidentally share references.',
    explain: 'Why is exponential output unavoidable? What duplicate-handling rule would be needed if the input values could repeat?',
  },
  {
    id: 'dynamic-programming', title: 'Dynamic programming', chapter: 'Ch. 40 · Dynamic Programming, p. 564',
    cue: 'Different choices lead to the same smaller state. Define that state, its recurrence, and base cases before choosing memoization or a table.',
    name: 'Coin Change', slug: 'coin-change',
    prompt: 'Given positive coin denominations with unlimited supply, return the fewest coins needed to make an amount. Return -1 if the amount cannot be formed.',
    example: 'coins = [1, 3, 4], amount = 6 → 2 (3 + 3)',
    hint: 'Let dp[a] be the minimum number of coins for amount a. Set dp[0] = 0. For each valid coin c, consider dp[a - c] + 1; leave unreachable states at infinity. Positive coins ensure dependencies lead to smaller amounts.',
    cost: 'O(amount × number of denominations) time and O(amount) space. This depends on the numeric amount, not only the input length.',
    tests: 'Amount zero; unreachable amount; one denomination; a case where repeatedly choosing the largest coin fails.',
    explain: 'Why does greedy fail for [1, 3, 4] and amount 6? Which repeated state does memoization eliminate?',
  },
];

export default function ProblemSolvingPage() {
  return (
    <article className={styles.page} aria-label="Problem-solving practice guide">
      <header className={styles.intro}>
        <span className={styles.eyebrow}>A repeatable practice routine</span>
        <h1>Build the habit of solving.</h1>
        <p>Notice the clues. Recognize a pattern. Give it a focused attempt. Say why it works.
          Use this loop to turn each coding exercise into a technique you can apply to an unfamiliar problem.</p>
        <nav className={styles.jumpLinks} aria-label="On this page">
          <a href="#practice-loop">The practice loop</a>
          <a href="#patterns">Eight patterns</a>
          <a href="#review">Review your attempt</a>
          <a href="#resources">Go deeper</a>
        </nav>
      </header>

      <section id="practice-loop" className={styles.section} aria-labelledby="loop-title">
        <h2 id="loop-title">Four steps, every session</h2>
        <p>The progression in the reference image becomes a practical routine: understanding, choosing, implementing, and communicating.</p>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className={styles.graphic} aria-hidden="true">
                <div className={styles.bar} style={{ height: `${72 + index * 38}px` }} />
              </div>
              <span className={styles.number}>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <p className={styles.question}>{step.question}</p>
            </li>
          ))}
        </ol>
        <aside className={styles.callout}>
          <strong>When you get stuck</strong>
          <p>Trace a smaller input, sketch the brute force approach, and locate its repeated work.
            Write down what you know before asking for one hint. Afterward, retry without the hint and record the missing insight.</p>
        </aside>
      </section>

      <section id="patterns" className={styles.section} aria-labelledby="patterns-title">
        <header className={styles.patternIntro}>
        <span className={styles.eyebrow}>The eight categories from the reference</span>
        <h2 id="patterns-title">One problem per pattern</h2>
        <p>These eight representative LeetCode exercises are mapped to the <em>Beyond Cracking the Coding Interview</em> technical-topic catalog in your screenshot.
          The chapter and page references are from that catalog; the exercises below are companion practice selections, with original examples and review notes.</p>
        <p>Category 01 combines two pointers and binary search, as in the image. Its selected problem emphasizes two pointers; compare a binary-search approach during review.</p>
        <nav className={styles.patternLinks} aria-label="Jump to a pattern">
          {patterns.map((pattern, index) => <a key={pattern.id} href={`#${pattern.id}`}>0{index + 1} · {pattern.title}</a>)}
        </nav>
        </header>
        <div className={styles.patterns}>
          {patterns.map((pattern, index) => (
            <section id={pattern.id} key={pattern.id} className={styles.pattern} aria-labelledby={`${pattern.id}-title`}>
              <div className={styles.patternHeading}>
                <span className={styles.badge}>0{index + 1}</span>
                <h3 id={`${pattern.id}-title`}>{pattern.title}</h3>
              </div>
              <p className={styles.chapter}>{pattern.chapter}</p>
              <p><strong>Notice:</strong> {pattern.cue}</p>
              <h4>{pattern.name}</h4>
              <p>{pattern.prompt}</p>
              <code className={styles.example}>{pattern.example}</code>
              <a className={styles.practiceLink} href={`https://leetcode.com/problems/${pattern.slug}/`} target="_blank" rel="noopener noreferrer">Practice on LeetCode <span className={styles.srOnly}>(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
              <details className={styles.hint}>
                <summary>After your attempt: hint &amp; review</summary>
                <div>
                  <p><strong>Approach:</strong> {pattern.hint}</p>
                  <p><strong>Complexity target:</strong> {pattern.cost}</p>
                  <p><strong>Test:</strong> {pattern.tests}</p>
                  <p><strong>Say it:</strong> {pattern.explain}</p>
                </div>
              </details>
            </section>
          ))}
        </div>
      </section>

      <section id="review" className={`${styles.section} ${styles.reviewJumbotron}`} aria-labelledby="review-title">
        <h2 id="review-title">Finish with a review, then revisit</h2>
        <p>A passing submission is one checkpoint. Finish by explaining your invariant and identifying a variation that would change the approach.</p>
        <ul className={styles.checklist}>
          <li><strong>Correctness:</strong> Trace an ordinary case and an edge case. Explain why every valid candidate is considered or safely ruled out.</li>
          <li><strong>Cost:</strong> Define n, account for data structure operations, and distinguish auxiliary space from returned output.</li>
          <li><strong>Communication:</strong> Give a two-minute explanation of the requirement, baseline, improvement, and tradeoff.</li>
          <li><strong>Transfer:</strong> Record the clue you missed and the reusable idea you learned. Retry tomorrow, then again next week; adjust the interval if it still feels unfamiliar.</li>
        </ul>
        <div className={`${styles.question} ${styles.practiceNote}`}>
          <p>Practice note</p>
          <ul>
            <li>I noticed ____.</li>
            <li>I chose ____ because ____.</li>
            <li>My invariant is ____.</li>
            <li>The tricky case was ____.</li>
            <li>Next time I will ____.</li>
          </ul>
        </div>
      </section>

      <section id="resources" className={`${styles.section} ${styles.resourcesPanel}`} aria-labelledby="resources-title">
        <h2 id="resources-title">Go deeper with reliable sources</h2>
        <p>Use the book for a structured foundation, the toolkit for selecting techniques, and the references below to check assumptions and fill gaps.</p>
        <ul className={styles.resources}>
          <li><a href="https://www.dsatoolkit.com/">DSA Toolkit — Nil Mamano</a><p>The BCTCI co-author’s collection connects reusable techniques with book problems. Use it to find the book’s own exercises for each mapped chapter.</p></li>
          <li><a href="https://beyondctci.dev/problems">BCTCI problem catalog</a><p>Use the companion catalog to practice the book’s problems and compare your reasoning with its solutions.</p></li>
          <li><a href="https://interviewing.io/blog/nine-free-chapters-of-beyond-cracking-the-coding-interview">BCTCI free chapter introduction</a><p>An author’s introduction to the free chapters, including binary search and sliding windows.</p></li>
          <li><a href="https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/">Tech Interview Handbook — algorithm cheatsheets</a><p>Review topic-specific techniques, operation costs, and corner cases before revisiting an exercise.</p></li>
          <li><a href="https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/">MIT OpenCourseWare — Introduction to Algorithms</a><p>Study the reasoning behind graph traversal, heaps, and dynamic programming through lectures and problem sets.</p></li>
        </ul>
        <Link className={styles.practiceLink} href="/bctci/dynamic-arrays">Review dynamic array foundations <span aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}
