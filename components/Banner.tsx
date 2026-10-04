'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import styles from "@/css/Banner.module.css"
import { useAppSelector } from '@/lib/hooks';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function Banner() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDark = useAppSelector((state) => state.theme.data.isDark);
  const [imageSize, setImageSize] = useState(400);
  const [titleScale, setTitleScale] = useState(1);

  const [imageDim, setImageDim] = useState(460);
  const [titleDim, setTitleDim] = useState(450);

  const breakPoint = useBreakpoint();

  useEffect(() => {
        if (!containerRef.current) return;

        const el = containerRef.current;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];

            if (!entry) return;

            const width = entry.contentRect.width;

            // Image Size
            const img = Math.min(Math.max(width * 0.25, 200), 600);

            // Text Scale
            const scale = Math.min(Math.max(width / 900, 0.85), 1.25);

            setImageSize(Math.round(img));
            setTitleScale(scale);
        });

        observer.observe(el);

        return () => observer.disconnect();

    }, []);

    return(
      <div ref={containerRef} className={`${styles.container}`}>

        <div style={{ padding: '80px 20px 90px 100px' }}>
          <h1 style={{ fontSize: '4.5rem'}}>
            Skills
          </h1>
          <h2 style={{ fontSize: '1.4rem', marginTop: '0px'}}>
            Your Developer Gym
          </h2>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex',
                      width: '100%',
                      height: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '0px 0 20px 20px',}}>

        </div>
      </div>
    )
}