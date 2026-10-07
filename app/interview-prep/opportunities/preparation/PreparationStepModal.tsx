"use client";

import Modal from "@/components/Modal";
import type { PreparationStep } from "@/config/preparationPaths";
import styles from "@/css/Opportunities.module.css";
import pathStyles from "@/css/PreparationPath.module.css";

type Props = {
  step: PreparationStep | null;
  onClose: () => void;
};

export default function PreparationStepModal({ step, onClose }: Props) {
  return (
      <Modal isOpen={step !== null} onClose={onClose} title={step?.title ?? "Preparation step"}>
        {step && (
        <div className={pathStyles.modalContent}>
            <p className={styles.stepDescription}>{step.description}</p>
            <ul className={styles.tasks}>{step.tasks.map(task => <li key={task}>{task}</li>)}</ul>
        </div>
        )}
      </Modal>
  );
}
