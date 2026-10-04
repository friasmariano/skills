
export interface ToastProps {
    show: boolean;
    onClose: () => void;
    message: string;
    duration?: number;
    type?: 'success' | 'error' | 'info';
    isClosable?:  boolean;
}