
export interface ToastData {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    duration: number;
    isClosable: boolean;
}