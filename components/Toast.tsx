'use client'

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { ToastProps } from "@/types/ToastProps";
import { useAppSelector } from "@/lib/hooks";

export default function Toast({show, onClose, message = 'Message', duration = 3000, type = 'info', isClosable = false }: ToastProps) {
    const [progress, setProgress] = useState(0);
    const [animateOut, setAnimateOut] = useState(false);

    const isDark = useAppSelector((state) => state.theme.data.isDark);

    const progressBarGradients: Record<string, { dark: string; light: string }> = {
        success: {
            dark: 'linear-gradient(90deg, #116135ff 0%, hsl(147, 77%, 55%) 100%)',
            light: 'linear-gradient(90deg, hsl(147, 100%, 19%) 0%, hsl(147, 94%, 42%) 100%)'
        },
        error: {
            dark: 'linear-gradient(90deg, #611111ff 0%, #ca1a1aff 100%)',
            light: 'linear-gradient(90deg, #fb0000ff 0%, #fca4a4ff 100%)'
        },
        info: {
            dark: 'linear-gradient(90deg, #115661ff 0%, #2cbdd4ff 100%)',
            light: 'linear-gradient(90deg, #00d9fbff 0%, #b1f5ffff 100%)'
        }
    }

    const progressBarBackground =
        progressBarGradients[type]?.[!isDark ? 'dark' : 'light'] ||
        progressBarGradients.info[!isDark ? 'dark' : 'light'];


    useEffect(() => {
        if (show) {
            setProgress(0);
            setAnimateOut(false);

            let startTime: number | null = null;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;

                const elapsed = timestamp - startTime;
                const progressPercent = Math.min((elapsed / duration) * 100, 100);
                setProgress(progressPercent);

                if (elapsed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    setProgress(100);
                    setAnimateOut(true);
                    setTimeout(() => onClose(), 300);
                }
            };

            const animationId = requestAnimationFrame(animate);
            return () => {
                cancelAnimationFrame(animationId);
            };
        }

    }, [show, duration, onClose]);

    if (!show) return null;

    return createPortal(
        <div style={{
                width: '300px',
                minHeight: '77px',
                position: 'fixed',
                top: '15vh',
                right: '0.5rem',
                zIndex: 1500000,
                background: !isDark ? 'linear-gradient(0deg, hsla(0, 0%, 10%, 1.00) 0%, hsla(0, 0%, 25%, 1.00) 50%, hsla(0, 0%, 32%, 1.00) 100%)'
                                   : 'linear-gradient(0deg, #ffffffff 0%, #dbdbdbff 30%, #e3e3e3ff 55%, #f3f3f3ff 95%, #ffffffff 100%)',
                boxShadow: '0 2px 40px rgba(0, 0, 0, 1)',
                // padding: '0px 10px 0px 0px',
                borderRadius: '20px',
                overflow: 'hidden',
                color: 'grey',
                display: 'flex',
                flexDirection: 'column'}}
                className={animateOut ? 'fade-out' : 'slideDown'}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div></div>
                {isClosable ? (
                    <button style={{ width: '35px',
                                     height: '25px',
                                     borderRadius: '5px 3px 5px 5px',
                                     color: 'white',
                                     cursor: 'pointer',
                                     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                     background: 'linear-gradient(to bottom, rgba(236, 36, 36, 1) 0%, rgba(172, 12, 12, 1) 50%, rgba(171, 11, 11, 1) 100%)' }}
                    onClick={onClose}>x</button>
                )
                :
                (
                    <div style={{ width: '35px', height: '25px' }}>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex',
                          padding: '0px 10px 0px 20px',
                          color: !isDark ? 'rgba(255, 255, 255, 0.9)'
                                        : 'hsl(195, 93%, 15%)',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          textShadow: '0px 5px 15px rgba(0, 0, 0, 0.6)'}}>
                <p>{message}</p>
            </div>
            <div style={{ display: 'flex',
                          height: '4px',
                          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)'
                                                  : 'rgba(0, 0, 0, 0.1)',
                          borderRadius: '20px',
                          margin: '21.5px 0px 0px 0px', }}>
                <div style={{ display: 'flex',
                              width: `${progress}%`,
                              height: '4px',
                              alignItems: 'center',
                              borderRadius: '5px',
                              justifyContent: 'center',
                              background: progressBarBackground
                            }}>
                </div>
            </div>
        </div>,
        document.body
    )
}