'use client'

import Image from "next/image";
import { useEffect, useRef } from 'react';

export default function Skills() {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (scroller.dataset.animated === 'true') return;

      scroller.dataset.animated = 'true';

      const scrollerInner = scroller.querySelector(
          '.scroller__inner'
      ) as HTMLElement | null;

      if (!scrollerInner) return;

      const originalItems = Array.from(scrollerInner.children) as HTMLElement[];

      originalItems.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          clone.setAttribute('aria-hidden', 'true');
          scrollerInner.appendChild(clone);
      });

      const scrollDistance = scrollerInner.scrollWidth / 2;
      scrollerInner.style.setProperty(
          '--scroll-distance',
          `${scrollDistance}px`
      );

      const updateActiveItem = () => {
          const items = Array.from(scrollerInner.children) as HTMLElement[];
          const scrollerRect = scroller.getBoundingClientRect();
          const centerX = scrollerRect.left + scrollerRect.width / 2;

          let closestItem: HTMLElement | null = null;
          let closestDistance = Infinity;

          items.forEach((item) => {
              const rect = item.getBoundingClientRect();
              const itemCenter = rect.left + rect.width / 2;
              const distance = Math.abs(itemCenter - centerX);

              if (distance < closestDistance) {
                  closestDistance = distance;
                  closestItem = item;
              }
          });

          items.forEach((item) =>
          item.classList.toggle('is-active', item === closestItem)
        );
      };

      let rafId: number;

      requestAnimationFrame(() => {
          requestAnimationFrame(() => {
          const loop = () => {
              updateActiveItem();
              rafId = requestAnimationFrame(loop);
          };
          loop();
          });
      });

      return () => cancelAnimationFrame(rafId);
    }, []);

    useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const scrollerInner = scroller.querySelector('.scroller__inner') as HTMLElement;
      if (!scrollerInner) return;

      const originalItems = Array.from(scrollerInner.children) as HTMLElement[];
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        scrollerInner.appendChild(clone);
      });

      const scrollDistance = scrollerInner.scrollWidth / 2;

      // Animate using Web Animations API
      scrollerInner.animate(
        [
          { transform: 'translateX(0px)' },
          { transform: `translateX(-${scrollDistance}px)` }
        ],
        {
          duration: 190000,
          iterations: Infinity,
          easing: 'linear'
        }
      );
    }, []);

    return(
      <div style={{ display: 'flex', flexDirection: 'column',
                    marginTop: '25px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '20px',
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)' }}>

        {/* Title */}
        <div style={{ display: 'flex',
                      padding: '50px 90px 0px 70px'}}>
          <h1 style={{ fontSize: '2rem' }}>Skills</h1>
        </div>

        {/* Content */}
        <div
          className="scroller"
          data-direction="left"
          ref={scrollerRef}
        >
          <ul className="tag-list scroller__inner">
            <li data-gradient="mediumBlue" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/React.svg"
                  alt="React logo"
                  width={55}
                  height={55}
              />
              <span style={{ fontSize: '1.1rem', marginTop: '20px' }}>React</span>
            </li>
            <li data-gradient="black" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/Next.svg"
                  alt="Next logo"
                  width={85}
                  height={85}
              />
            </li>
            <li data-gradient="blue" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/Typescript.svg"
                  alt="Typescript logo"
                  width={55}
                  height={55}
              />
              <span style={{ fontSize: '1.1rem', marginTop: '20px' }}>TypeScript</span>
            </li>
            <li data-gradient="orange" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/HTML5.svg"
                  alt="HTML5 logo"
                  width={105}
                  height={105}
              />
            </li>
            <li data-gradient="lightPurple" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span
                  style={{
                      fontSize: '2.8rem',
                      fontWeight: 700,
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                  }}>
                  CSS
              </span>
            </li>
            <li data-gradient="darkPurple" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/Redux.svg"
                  alt="Redux logo"
                  width={55}
                  height={55}
              />
              <span style={{ fontSize: '1.1rem', marginTop: '20px' }}>Redux</span>
            </li>
            <li data-gradient="wine" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/Jest.svg"
                  alt="Jest logo"
                  width={55}
                  height={55}
              />
              <span style={{ fontSize: '1.1rem', marginTop: '20px' }}>Jest</span>
            </li>
            <li data-gradient="green" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/SpringBoot.svg"
                  alt="SpringBoot logo"
                  width={55}
                  height={55}
              />
              <span style={{ fontSize: '1.1rem', marginTop: '20px' }}>Spring Boot</span>
            </li>
            <li data-gradient="lightRed" style={{ display: 'flex', flexDirection: 'column' }}>
              <i className="bi bi-arrow-left-right" style={{ fontSize: '3.2rem', color: 'white'}}></i>

              <span style={{ fontSize: '1.1rem', marginTop: '5px' }}>REST APIs</span>
            </li>
            <li data-gradient="bluePurple" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/GitHub.svg"
                  alt="SpringBoot logo"
                  width={55}
                  height={55}
              />
              <span style={{ marginTop: '25px' }}>GitHub</span>
            </li>
            <li data-gradient="dualBlue" style={{ display: 'flex', flexDirection: 'column' }}>
              <Image
                  src="/skills/Photoshop.svg"
                  alt="Photoshop logo"
                  width={55}
                  height={55}
              />
              <span style={{ marginTop: '25px' }}>Photoshop</span>
            </li>
            <li data-gradient="orangeBrown"style={{ display: 'flex', flexDirection: 'column' }}>
                <Image
                  src="/skills/Illustrator.svg"
                  alt="Illustrator logo"
                  width={55}
                  height={55}
              />
              <span style={{ marginTop: '25px' }}>Illustrator</span>
            </li>
          </ul>
        </div>
      </div>
    )
}