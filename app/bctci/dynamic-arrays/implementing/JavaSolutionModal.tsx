"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import styles from "./page.module.css";

export default function JavaSolutionModal({ highlightedCode, buttonLabel = "View Java implementation", title = "DynamicArray · Java" }: {
  highlightedCode: string;
  buttonLabel?: string;
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  function close() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;
    codeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const dialog = codeRef.current?.closest('[role="dialog"]');
        const controls = dialog?.querySelectorAll<HTMLElement>('button, [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button ref={buttonRef} type="button" className={styles.solutionButton}
        aria-haspopup="dialog" onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </button>
      <Modal isOpen={isOpen} onClose={close} title={title} size="full">
        <div className={styles.codePanel}>
          <pre ref={codeRef} tabIndex={0} className={styles.highlightedCode} aria-label="Java source code">
            <code className="language-java" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      </Modal>
    </>
  );
}
