import styles from "@/css/Bctci.module.css";
import extraStyles from "../implementing/page.module.css";
import JavaSolutionModal from "../implementing/JavaSolutionModal";
import { highlightedExtraSolution } from "./javaSolution";

const operations = [
  ["append(x)", "O(1) (amortized)"],
  ["get(i)", "O(1)"],
  ["set(i, x)", "O(1)"],
  ["size()", "O(1)"],
  ["popBack()", "O(1) (amortized)"],
  ["pop(i)", "O(n)"],
  ["contains(x)", "O(n)"],
  ["insert(i, x)", "O(n)"],
  ["remove(x)", "O(n)"],
];

export default function Extra() {
  return (
    <article className={`${styles.readme} ${extraStyles.content}`} aria-labelledby="extra-title">
      <h2 id="extra-title">Extra Dynamic Array Operations</h2>
      <p>
        The analysis of <code>popBack()</code> is similar to append: O(n) in
        the worst case, but O(1) amortized time per operation over the course
        of a program.
      </p>

      <h2>Space Complexity</h2>
      <p>
        Dynamic arrays use the most space per element when their backing
        fixed-size array is nearly empty. With an implementation that shrinks
        below 25% capacity, the array can hold roughly four times the space
        actually needed. An array with n elements therefore uses O(4n) = O(n) space.
      </p>

      <h2>Problem 25.2: Extra Dynamic Array Operations</h2>
      <p>
        Add the following methods to the dynamic array implemented in Problem
        1. For each method, provide the time analysis.
      </p>
      <ol>
        <li><strong>Pop:</strong> Add <code>pop(i)</code> to remove the element
          at a specific index. Shift every subsequent element one index left
          so there are no gaps, and return the removed element.</li>
        <li><strong>Contains:</strong> Implement <code>contains(x)</code> to
          return whether an element appears in the array.</li>
        <li><strong>Insert:</strong> Implement <code>insert(i, x)</code> to add
          an element at index i, shifting existing elements at index i or
          greater to the right.</li>
        <li><strong>Remove:</strong> Implement <code>remove(x)</code> to remove
          the first occurrence of an element. Return its original index, or
          -1 if the element was not found.</li>
      </ol>

      <h2>Solution 25.2: Extra Dynamic Array Operations</h2>
      <div className={extraStyles.solutionButtons}>
        <JavaSolutionModal highlightedCode={highlightedExtraSolution} buttonLabel="View example solution" title="DynamicArrayExtras · Java" />
      </div>
      <h3>1. Pop</h3>
      <p>
        If i is <code>size - 1</code>, removing the last element is the same
        as <code>popBack()</code>. Otherwise, shift all elements after i one
        slot left to keep them contiguous. Then call <code>popBack()</code>
        to reduce the size and handle resizing if necessary.
      </p>
      <figure className={extraStyles.figure}>
        <div className={extraStyles.diagram}>
          {[
            { label: "Before pop(2)", values: [3, 1, 4, 1, 5, 9, 2], size: 7 },
            { label: "After pop(2)", values: [3, 1, 1, 5, 9, 2], size: 6 },
          ].map(({ label, values, size }) => (
            <div key={label} className={extraStyles.arrayContainer}>
              <strong>{label}</strong>
              <div className={extraStyles.array}>
                {Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className={`${extraStyles.slot} ${index < values.length ? extraStyles.used : extraStyles.empty}`}>
                    <span className={extraStyles.cell} aria-label={`Index ${index}: ${values[index] ?? "unused"}`}>
                      {values[index] ?? "\u00a0"}
                    </span>
                  </div>
                ))}
              </div>
              <span>Size: {size} · Capacity: 10</span>
            </div>
          ))}
        </div>
        <figcaption>
          Removing 4 at index 2 returns 4 and shifts 1, 5, 9, and 2 one slot
          left. The capacity stays at 10.
        </figcaption>
      </figure>
      <p>
        The worst case is removing the first element, which shifts n - 1
        elements and takes O(n) time. Unlike <code>popBack()</code>,
        <code> pop(i)</code> also takes O(n) amortized time: repeatedly popping
        from the front n times takes O(n²) total time.
      </p>
      <aside className={extraStyles.note}>
        If you frequently need to pop from both ends, consider a double-ended
        queue (deque), which supports these operations in constant time.
      </aside>

      <h3>2. Contains</h3>
      <p>
        In an unordered array, checking for an element requires scanning
        until a match is found or every index has been examined. The worst
        case takes O(n) time. If fast membership checks are essential,
        consider a data structure designed for faster lookup.
      </p>

      <h3>3. Insert</h3>
      <p>
        Insertion is the opposite of popping: shift elements past the
        insertion point to the right. Inserting at the beginning shifts all
        n elements, taking O(n) time. Resizing may also require copying the
        backing array. A deque may be a better choice for frequent insertions
        at both ends.
      </p>

      <h3>4. Remove</h3>
      <p>
        While <code>pop(i)</code> removes by index, <code>remove(x)</code>
        removes by value. Scan for the first matching value, then call
        <code> pop(i)</code> at its index. Return that index, or -1 if there
        is no match. Searching and shifting together take O(n) time in the
        worst case. The search must retain the index; the boolean returned
        by <code>contains(x)</code> alone is not enough.
      </p>

      <h2>Key Takeaways</h2>
      <div className={extraStyles.tableWrapper}>
        <table>
          <caption>Time complexity of dynamic array operations</caption>
          <thead><tr><th scope="col">Operation</th><th scope="col">Time</th></tr></thead>
          <tbody>
            {operations.map(([operation, time]) => (
              <tr key={operation}><th scope="row"><code>{operation}</code></th><td>{time}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Dynamic arrays are building blocks for stacks, heaps, hash sets, and
        maps. The central techniques are <strong>dynamic resizing</strong>
        and <strong>amortized analysis</strong>. Their applications extend
        well beyond a single chapter.
      </p>

      <h2>Online Resources</h2>
      <p>The chapter’s online materials include:</p>
      <ul>
        <li>A chance to try each problem with an AI Interviewer.</li>
        <li>Full code solutions in multiple programming languages.</li>
      </ul>
      <p>
        Visit <a href="https://bctci.co/dynamic-arrays">bctci.co/dynamic-arrays</a>
        {" "}for chapter resources and{" "}
        <a href="https://bctci.co/set-and-map-implementations">set and map implementations</a>
        {" "}for related material.
      </p>
    </article>
  );
}
