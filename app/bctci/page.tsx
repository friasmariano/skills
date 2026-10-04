import styles from "@/css/Bctci.module.css";

export default function BCTCI() {
  return (
    <article className={styles.readme} aria-labelledby="readme-title">
      {/* <h1 id="readme-title">README</h1> */}

      <p>
        This is a big book, and yes, it needs an instruction manual. We ask
        (beg?) you to read this. We’ll keep it short and to the point. We also
        know lots of books have online materials, and they’re often junk. We
        promise this isn’t the case with ours.
      </p>

      <p>
        Before we do that, we’d like to address the relationship between this
        book and interviewing.io. You’ll see a lot of references to it. This
        book is not from interviewing.io, but we do partner with them for
        access to lots of data, interview replays, and an AI Interviewer.
        Because of this relationship, we know that sometimes mentioning
        interviewing.io might sound promotional. We’ve tried to avoid that
        as much as we could. We hope—trust—that you’ll forgive this in exchange
        for access to lots of data, resources, and tools (and the discount code).
      </p>

      <p>
        The book is roughly split into two segments: the first segment
        (Parts I–V) is the soft squishy stuff (backed up by a lot of qualitative
        and quantitative data). The second segment (Parts VI and onwards) is
        the technical content, which has its own README (pg 168). Please read
        it before diving into those parts.
      </p>
    </article>
  );
}
