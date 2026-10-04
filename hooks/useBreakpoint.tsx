
import { Breakpoint } from '@/types/Breakpoint'
import { useState, useEffect } from 'react'

export function useBreakpoint(): Breakpoint {
    const getBreakpoint = () => {
        if (typeof window === 'undefined' ) return 'desktop';

        const width = window.innerWidth;

        if (width < 640) return 'mobile';
        if (width < 992) return 'tablet';
        if (width < 1024) return 'desktop-sm';
        if (width < 1200) return 'desktop-md';
        if (width < 1440) return 'desktop';

        return 'large';
    };

    const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint());

    useEffect(() => {
        const handleResize = () => setBreakpoint(getBreakpoint());
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}