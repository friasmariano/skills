'use client'

import { useState, useId, useEffect } from 'react';
import { useAppSelector } from "@/lib/hooks";
import { SelectProps } from '@/types/SelectProps';
import { Selectable } from '@/types/Selectable';
import Icon from './Icon';
import styles from '@/css/Select.module.css'
import { useBreakpoint } from '@/hooks/useBreakpoint';
import RadioButton from './RadioButton';

export default function Select<T extends Selectable>({ options, placeholderText = "Select an option", onSelect, width = "280px", selectedIcon, iconNoPlaceholder, active, onActiveChange  }: SelectProps<T>) {
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState<T | null>(null);

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    const id = useId();
    const breakpoint = useBreakpoint();

    const handleSelect = (item: T) => {
        setSelected(item);
        onActiveChange(false);
        onSelect?.(item);
    }

    useEffect(() => {
        if (breakpoint === 'desktop-md' || breakpoint === 'desktop' || breakpoint === 'large') {
            setIsVisible(false);
        }
    }, [breakpoint]);

    const getLabel = (item?: T | null) => {
        if (!item) return placeholderText;
        return item.name || item.displayName || item.description || placeholderText;
    };

    useEffect(() => {
        if (active) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => { setIsVisible (false) }, 300);

            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <div className={styles.container}>
            <button className={`${styles.button}`}
                    onClick={() => { onActiveChange(!active) }}>

                {iconNoPlaceholder ?
                <>
                    {selectedIcon}
                </> :
                <>
                    <span>{selected?.name || selected?.displayName || placeholderText}</span>
                </>}

                <span></span>
                {active ?
                    <i className="bi bi-chevron-up ml-1"></i> :
                    <i className="bi bi-chevron-down ml-1"
                       style={{ marginTop: '2.47px' }}></i>}
            </button>

            {/* Options */}
            {isVisible && (
                <div className={`${styles.optionsPanel}
                                 ${isVisible ? styles.fadeIn : styles.fadeOut}`}
                     onMouseLeave={() => onActiveChange(false) }>

                     {options.map((opt, index) => (
                        <label key={`${index}-${id}`}
                               className={`cursor-pointer p-2
                                           ${opt.status ? 'opacity-100' : 'opacity-10'} hover:opacity-100 `}
                               style={{ display: 'flex',
                                        alignItems: 'center', gap: '7.5px',
                                         }}>

                            <input
                                className={styles.radioHidden}
                                type="radio"
                                name={`select-${id}`}
                                value={opt.id}
                                checked={opt.status}
                                aria-checked={opt.status}
                                onChange={() => handleSelect(opt)}
                            />

                            <RadioButton checked={opt.status} />

                            <span className={`ml-2 text-lg ${opt.status ? 'font-md' : 'font-normal'}`}>
                                {getLabel(opt)}
                            </span>

                            {opt.hasIcon && (
                                <div>
                                    <Icon
                                        type={opt.iconData.type}
                                        icon={opt.iconData.icon}
                                        className={opt.iconData.className}
                                        size={opt.iconData.size}
                                        translateY={opt.iconData.translateY}
                                    />
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
