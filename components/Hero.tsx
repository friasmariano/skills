'use client'

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeroData from "@/types/HeroData";
import styles from '@/css/Hero.module.css'

export default function Hero() {
    const breakpoint = useBreakpoint();
    const [imageWidth, setImageWidth] = useState(200);
    const [imageHeight, setImageHeight] = useState(200);
    const [upperMargin, setUpperMargin] = useState('-3vh');

    const pathname = usePathname();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [imageSize, setImageSize] = useState(200);
    const [titleScale, setTitleScale] = useState(1);

    const paths = useMemo<Record<string, HeroData>> (() => ({
        '/': {
            title: 'Mariano Frias',
            subtitle: 'Front-End Engineer · Systems thinker · Design-driven',
            imageSrc: '/hero/home.webp',
            imageAlt: 'Home Hero'
        },
        '/projects': {
            title: 'Projects',
            subtitle: 'Thoughtful digital products, built with care',
            imageSrc: '/projects/Rocket.webp',
            imageAlt: 'Projects hero',
            },
        '/about': {
            title: 'About',
            subtitle: 'I don’t just code — I craft experiences',
            imageSrc: '/about/Hero-Image-About2.webp',
            imageAlt: 'About hero',
        },
        '/contact': {
            title: 'Contact',
            subtitle: 'Let’s build something solid together',
            imageSrc: '/Contact2.webp',
            imageAlt: 'Contact hero',
        },
        '/experience': {
            title: 'Experience',
            subtitle: 'Shaped by real challenges',
            imageSrc: '/experience/Briefcase3.webp',
            imageAlt: 'Experience hero',
        },
    }), []);

    const data = paths[pathname];

    if (!data) return null;

    useEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];

            if (!entry) return;

            const width = entry.contentRect.width;

            // Image Size
            const img = Math.min(Math.max(width * 0.25, 180), 420);

            // Text Scale
            const scale = Math.min(Math.max(width / 900, 0.85), 1.25);

            setImageSize(Math.round(img));
            setTitleScale(scale);
        });

        observer.observe(el);

        return () => observer.disconnect();

    }, []);

    return(
        <div className={`${styles.container} panel-background`} ref={containerRef}>
            <div className={`${styles.head}`}>
                <h1 className={`${styles.h1}`}
                    style={{ transform: `scale(${titleScale})` }}>
                    {data.title}
                </h1>
                <h2 className={`${styles.h2}`}
                    style={{ transform: `scale(${titleScale})`}}>
                    {data.subtitle}
                </h2>
            </div>

            <Image
                src={data.imageSrc}
                alt={data.imageAlt}
                width={imageSize}
                height={imageSize}
                className={`${styles.image}`}
            />
        </div>
    )
}