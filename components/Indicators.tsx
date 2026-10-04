'use client'

import { useAppSelector } from "@/lib/hooks"

export default function Indicators() {
    const isDark = useAppSelector((state) => state.theme.data.isDark);

    return(
        <div style={{ display: 'flex', alignItems: 'center',
                      margin: '60px 0px 20px 0px', gap: '8px' }}>

            {/* 1 */}
            <div style={{ height: '0.5rem', width: '0.5rem',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(4, 36, 63, 0.5)',
                            borderRadius: '50%',
                            cursor: 'not-allowed'}}>
            </div>

            {/* Highlighted */}
            <div style={{ height: '0.6rem', width: '3.2rem', backgroundColor: isDark ? 'whitesmoke' : 'rgba(4, 36, 63, 0.8)',
                            borderRadius: '20px',
                            cursor: 'pointer'}}>
            </div>

            {/* 3 */}
            <div style={{ height: '0.5rem', width: '0.5rem',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(4, 36, 63, 0.5)',
                            borderRadius: '50%',
                            cursor: 'not-allowed'}}>
            </div>
        </div>
    )
}