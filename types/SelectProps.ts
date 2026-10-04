import Icon from "@/components/Icon";
export interface SelectProps<T> {
    options: T[];
    onSelect?: (item: T) => void;
    placeholderText?: string;
    width?: string;
    selectedIcon?: React.ComponentProps<typeof Icon>;
    iconNoPlaceholder: boolean;
    onActiveChange: (v: boolean) => void;
    active: boolean;
}