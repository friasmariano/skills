'use client'

import Image from "next/image";
import ProjectProps from "@/types/ProjectProps";
import styles from '@/css/Projects.module.css'
import { useState, useRef, useEffect } from "react";

export default function ProjectCardNew({ href, imageSrc, imageWidth, imageAlt, separator, featured, projectTitle, hoverable } : ProjectProps) {
    const containerRef = useRef<HTMLDivElement | null> (null);
    const [imageSize, setImageSize] = useState(500);
    const [textScale, setTextScale] = useState(1.5);

    useEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;

        const observer = new ResizeObserver (entries => {
            const entry = entries[0];

            if (!entry) return;

            const width = entry.contentRect.width;

            const img = Math.min(Math.max(width * 0.25, 380), 1000);

            const scale = Math.min(Math.max(width / 900, 0.85), 1.25);

            setImageSize(Math.round(img));
            setTextScale(scale);
        })

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return(
        <div ref={containerRef}
             style={{ cursor: hoverable ? 'pointer': 'default', }}
             className={`transition-all duration-200 ease-out ${hoverable ? 'hover:scale-[1.02]' : ''} `}>
                <div className={`${styles.card}`}>
                    <div className={`${styles.image}`}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={imageSize}
                            height={imageSize}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    <div className={`${styles.demo}`}>
                        <a className={`${styles.demoButton}`}
                            href={href}
                            target="_blank">
                            <i className="bi bi-play-circle text-2xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}></i>
                            <span style={{ padding: '0px 0px 30px 7px',
                                           transform: `scale(${textScale})`,
                                           textShadow: '0 2px 12px rgba(0,0,0,0.8)', }}>
                                Live Demo
                            </span>
                        </a>
                    </div>
                </div>
            </div>
    )
}