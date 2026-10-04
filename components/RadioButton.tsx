
'use client'

import RadioButtonProps from "@/types/RadioButtonProps";
import { useAppSelector } from "@/lib/hooks";

export default function RadioButton({ checked }: RadioButtonProps) {

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '19px', height: '19px',
                          border: isDark ? `1px solid rgba(255, 255, 255, ${checked ? '0.7': '0.1'})` : `1px solid rgba(2, 22, 39, ${checked ? '0.7': '0.1'})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: '50%'}}>
                <div style={{ width: '12px', height: '12px',
                            backgroundColor: 'rgb(248, 105, 38)',
                            background: isDark ? 'linear-gradient(to bottom, hsl(19, 97%, 80%) 0%, rgb(248, 105, 38) 50%, hsl(19, 100%, 45%) 100%)'
                                                : 'linear-gradient(to bottom, hsl(19, 97%, 72%) 0%, hsl(19, 94%, 45%) 50%, hsl(19, 100%, 40%) 100%)',
                            borderRadius: '50%',
                            opacity: checked ? 1 : 0 }}>
                </div>
            </div>
        </div>
    )
}