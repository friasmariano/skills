"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import AssessmentIntroduction from "./AssessmentIntroduction";
import PreparationVideo from "./PreparationVideo";
import type { PreparationStep } from "@/config/preparationPaths";
import styles from "@/css/Opportunities.module.css";
import pathStyles from "@/css/PreparationPath.module.css";

type Props = {
  step: PreparationStep | null;
  onClose: () => void;
};

export default function PreparationStepModal({ step, onClose }: Props) {
  const [showIntroduction, setShowIntroduction] = useState(false);
  function close() {
    setShowIntroduction(false);
    onClose();
  }

  return (
      <Modal isOpen={step !== null} onClose={close} title={showIntroduction ? "Two things before you begin" : step?.title ?? "Preparation step"} size={showIntroduction ? "large" : "medium"}>
        {showIntroduction ? <AssessmentIntroduction onBack={() => setShowIntroduction(false)} /> : step && (
        <div className={pathStyles.modalContent}>
            <p className={styles.stepDescription}>{step.description}</p>
            <ul className={styles.tasks}>{step.tasks.map(task => <li key={task}>{task}</li>)}</ul>
            <p className={styles.stepDescription}><strong>Recall:</strong> {step.recall}</p>
            {step.sources && <p className={styles.stepDescription}>Official source: {step.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} (opens in a new tab) ↗</a>)}</p>}
            <PreparationVideo video={step.video} showPlayer />
            {step.id === "format" && (
              <button type="button" className={pathStyles.assessmentToggle} onClick={() => setShowIntroduction(true)} aria-haspopup="dialog">
                <i className="bi bi-chevron-right" aria-hidden="true" />
                Two things before you begin
              </button>
            )}
        </div>
        )}
      </Modal>
  );
}
