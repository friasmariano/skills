import IconProps from "./IconProps";

export type Selectable = {
    id: number;
    hasIcon: boolean;
    iconData: IconProps;
    status: boolean;
} & (
    {
        name: string;
        displayName?: never;
        description?: never;
    }
    |
    {
        displayName: string;
        name?: never;
        description?: never;
    }
    | {
        description: string;
        name?: never;
        displayName?: never;
    }
)