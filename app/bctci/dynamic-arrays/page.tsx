import styles from "@/css/Bctci.module.css";

export default function DynamicArrays() {
  return (
    <article className={styles.readme} aria-labelledby="dynamic-arrays-title">
      {/* <h1 id="dynamic-arrays-title">Dynamic Arrays</h1> */}

      <p>
        We probably do not need to explain to you what an array is, but just so
        we are on the same page: an array is an ordered list of elements stored
        sequentially in memory, without gaps. Arrays are convenient because you
        can easily access any element by index in O(1) time. Most of the time,
        interview problem inputs are given as arrays (or strings, which are
        essentially arrays of characters).
      </p>

      <p>
        Arrays come in two flavors: fixed-size arrays and dynamic arrays. With
        fixed-size arrays, we set the size upfront, and when they are full, they
        cannot accommodate more data. In contrast, dynamic arrays can expand or
        contract to accommodate a changing number of elements. High-level
        languages like Python and JavaScript typically come with dynamic arrays
        so that you do not need to worry about resizing.
      </p>

      <p>
        In this chapter, we will look at how dynamic arrays work under the hood.
        Understanding how the data structures you use daily work internally has
        multiple benefits:
      </p>

      <ul>
        <li>
          In some cases, it is directly relevant to passing the interview: you
          may get a data structure design question about providing or modifying
          the implementation of a well-known data structure.
        </li>
        <li>
          We are not just learning how to implement a particular data structure;
          we are learning reusable algorithmic techniques. The same ideas can
          be used for other problems.
        </li>
        <li>
          The big O analysis for the data structure operations becomes intuitive
          rather than something that’s tedious to memorize.
        </li>
      </ul>
    </article>
  );
}
