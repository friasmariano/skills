
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    hasButtons?: boolean;
    size?: ModalSize;
    hasCancelButton?: boolean;

    onSave?: () => void;
    savingDisabled?: boolean;
    isSaving?: boolean;
    savingButtonText?: string;
    saveButtonSubmittingText?: string;
}