import Link from "next/link";
import JavaSolutionModal from "./JavaSolutionModal";
import LessonNarration from "./LessonNarration";
import { highlightedJavaSolution, highlightedMySolution } from "./javaSolution";
import styles from "@/css/Bctci.module.css";
import contentStyles from "./page.module.css";

function ArrayDiagram({ label, values, capacity }: {
  label: string;
  values: number[];
  capacity: number;
}) {
  return (
    <div className={contentStyles.arrayContainer}>
      <strong>{label}</strong>
      <div className={contentStyles.array}>
        {Array.from({ length: capacity }, (_, index) => (
          <div key={index} className={`${contentStyles.slot} ${index < values.length ? contentStyles.used : contentStyles.empty}`}>
            <span className={contentStyles.cell} aria-label={`Index ${index}: ${values[index] ?? "unused"}`}>
              {values[index] ?? "\u00a0"}
            </span>
          </div>
        ))}
      </div>
      <span>Size: {values.length} · Capacity: {capacity}</span>
    </div>
  );
}

export default function Implementing() {
  return (
    <article className={`${styles.readme} ${contentStyles.content}`} aria-labelledby="implementing-title">
      <h2 id="implementing-title">Problem 25.1: Implement Dynamic Array</h2>
      <LessonNarration />
      <p>
        Assume your language only provides fixed-size arrays. Build a dynamic
        array that supports the following API, without using built-in append
        methods or other operations that grow an array automatically. In a
        strongly typed language, assume the elements are integers.
      </p>
      <ul>
        <li><code>append(x)</code>: add x to the end.</li>
        <li><code>get(i)</code>: return the element at index i.</li>
        <li><code>set(i, x)</code>: replace the existing element at index i with x.</li>
        <li><code>size()</code>: return the number of stored elements.</li>
        <li><code>popBack()</code>: remove the last element.</li>
      </ul>

      <h2>Solution: Fixed-Size Storage, Dynamic Capacity</h2>
      <p>
        Store the elements in a backing fixed-size array. When that array fills
        up, allocate a larger one and copy the elements into it. This is resizing.
        Growing by just one slot would require copying all existing elements on
        every append, making a sequence of appends expensive. Instead, double
        the capacity when the array is full. After growing, half the slots are
        available for future appends.
      </p>

      <div className={contentStyles.solutionButtons}>
        <JavaSolutionModal highlightedCode={highlightedJavaSolution} />
        <JavaSolutionModal highlightedCode={highlightedMySolution} buttonLabel="View my solution" title="My solution · Java" />
      </div>

      <h3>Size, Capacity, and Index Bounds</h3>
      <p>
        Start with a capacity of 10. <strong>Size</strong> counts the elements
        actually stored; <strong>capacity</strong> counts all available slots.
        Maintain size as a counter so that <code>size()</code> takes constant
        time without scanning the array.
      </p>
      <p>
        Validate indices against size, rather than capacity. If the array has
        three elements and ten slots, index 7 is still out of bounds. Both
        negative indices and indices at or beyond size raise an error.
      </p>

      <h3>Append and Resize</h3>
      <p>
        If there is room, write the new element into the slot at index size and
        increment size. If size equals capacity, first double the capacity and
        copy only the live elements into the new backing array.
      </p>
      <figure className={contentStyles.figure}>
        <div className={contentStyles.diagram}>
          <ArrayDiagram label="Before append(9)" values={[3, 1, 4, 1, 5]} capacity={10} />
          <ArrayDiagram label="After append(9)" values={[3, 1, 4, 1, 5, 9]} capacity={10} />
        </div>
        <figcaption>With a free slot, appending changes size from 5 to 6 while capacity stays at 10.</figcaption>
      </figure>
      <figure className={contentStyles.figure}>
        <div className={contentStyles.diagram}>
          <ArrayDiagram label="Before append(5): storage is full" values={[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]} capacity={10} />
          <ArrayDiagram label="After copying and appending" values={[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]} capacity={20} />
        </div>
        <figcaption>Copy the ten existing elements into twenty slots, then write 5 at index 10.</figcaption>
      </figure>

      <h3>Pop Back and Shrinking</h3>
      <p>
        Removing the last element reduces size. Shrinking storage needs a
        separate threshold from growing it, so that alternating appends and
        removals do not repeatedly trigger expensive copies.
      </p>
      <ul>
        <li><strong>Never shrink:</strong> a formerly large array can retain a lot of unused storage.</li>
        <li><strong>Shrink below half full:</strong> one removal after a growing append can immediately trigger a shrink, causing repeated resizing.</li>
        <li><strong>Shrink below a quarter full:</strong> halve capacity, leaving the array approximately half full and room before either resize threshold is reached.</li>
      </ul>
      <p>
        An empty array raises an error. Capacity never drops below the initial
        ten slots. This implementation uses a strict threshold: it shrinks when
        size is less than 25% of capacity, rather than exactly 25%.
      </p>
      <aside className={contentStyles.note}>
        Bounds checks make the removed slot inaccessible, so clearing it is
        unnecessary for the integer model used here. If storing references to
        objects, clear the vacated slot to avoid retaining an unused object.
      </aside>

      <h2>Dynamic Array Analysis</h2>
      <div className={contentStyles.tableWrapper}>
        <table>
          <caption>Time complexity for n stored elements</caption>
          <thead><tr><th scope="col">Operation</th><th scope="col">Worst case</th><th scope="col">Amortized</th></tr></thead>
          <tbody>
            {[
              ["get(i)", "O(1)", "O(1)"],
              ["set(i, x)", "O(1)", "O(1)"],
              ["size()", "O(1)", "O(1)"],
              ["append(x)", "O(n)", "O(1)"],
              ["popBack()", "O(n)", "O(1)"],
            ].map(([operation, worst, amortized]) => (
              <tr key={operation}><th scope="row"><code>{operation}</code></th><td>{worst}</td><td>{amortized}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Reading, updating, and checking size perform a constant amount of work.
        An append or removal that resizes storage takes O(n) time to copy
        elements; an operation without resizing takes O(1). These bounds assume
        each element can be copied or accessed in constant time.
      </p>

      <h3>What Is Amortized Time?</h3>
      <p>
        Amortized analysis bounds the total cost of a sequence of operations,
        spreading occasional expensive work across that sequence. It does not
        require random inputs or guarantee that every individual operation is fast.
        Starting empty, consider n consecutive appends. Because capacity doubles,
        the elements copied across all resizes form a geometric series.
      </p>
      <pre aria-label="Bound on total resize copies"><code>{"n + n/2 + n/4 + … < 2n = O(n)"}</code></pre>
      <p>
        The n writes plus all resize copies take O(n) total time, giving O(1)
        amortized time per append. Pop back also has O(1) amortized cost: the
        gap between the full and quarter-full thresholds ensures many inexpensive
        operations occur between resizes, even when appends and removals are mixed.
      </p>

      <h3>Space Complexity</h3>
      <p>
        Above the minimum capacity, storage is kept roughly between one-quarter
        full and full. Capacity is at most about four times the number of live
        elements, so persistent storage takes O(n) space, with a constant minimum
        of ten slots for small or empty arrays. During resizing, both the old and
        new arrays temporarily coexist; the extra copying space is also O(n).
      </p>
      <p>
        Continue with <Link href="/bctci/dynamic-arrays/extra">extra dynamic array operations</Link>
        {" "}to remove by index, search for values, insert elements, and remove the
        first matching value.
      </p>
    </article>
  );
}
