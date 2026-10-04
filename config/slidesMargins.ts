
import { Breakpoint } from "@/types/Breakpoint";

export const SLIDES_MARGINS: Record<Breakpoint, Partial<Record<number,string>>> = {
    mobile: {
        0: 'mt-60',
        1: 'mt-60',
        2: 'mt-0',
        3: 'mt-75'
    },
    tablet: {
        0: 'mt-60',
        1: 'mt-60',
        2: 'mt-0',
        3: 'mt-65'
    },
    'desktop-sm': {
        0: 'mt-75',
        1: 'mt-75',
        2: 'mt-0',
        3: 'mt-80'
    },
    'desktop-md': {
        0: 'mt-60',
        1: 'mt-75',
        2: 'mt-0',
        3: 'mt-80'
    },
    desktop: {
        0: 'mt-85',
        1: 'mt-85',
        2: 'mt-0',
        3: 'mt-85'
    },
    large: {
        0: 'mt-75',
        1: 'mt-75',
        2: 'mt-0',
        3: 'mt-70'
    }
}