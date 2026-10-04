'use client'

import CarouselProps from "@/types/CarouselProps";
import { useRef, useState } from "react";

export default function Carousel({ imageSrcs }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const addSlideRef = (el: HTMLDivElement) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };

  const scrollToSlide = (index: number) => {
    setActiveIndex(index);

    slidesRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  return (
    <div style={{ maxWidth: '95vw' }}>
      {/* Carousel container */}
      <div
        ref={containerRef}
        className="flex gap-7 overflow-x-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide pl-[2vw] pt-2 pb-5 pr-[27.25vw]"
      >
        {imageSrcs.map((image, i) => (
          <div
            key={image.id}
            ref={addSlideRef}
            className="snap-center min-w-[45.5vw] h-[40vh] rounded-3xl flex items-center justify-center text-white text-2xl font-bold bg-cover bg-center relative overflow-hidden"
            style={{
              backgroundImage: `url(${image.src})`,

              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* gradient overlay */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.4) 100%)',
              }}
            />

            {/* content */}
            <div className={`${image.margin}`} style={{ textAlign: 'center' }}>
              {image.alt || `Slide ${i + 1}`}
            </div>
          </div>
        ))}

      </div>

      {/* Buttons */}
      <div className="absolute left-1/2 -translate-x-1/2"
           style={{ margin: '20px 0px 0px 0px', display: 'flex', gap: '3px', padding: '12px 0px 0px 0px' }}>
        {[...Array(4)].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`
              w-4 h-4 rounded-full transition cursor-pointer
              ${activeIndex === i
                ? "bg-white shadow-md"
                : "bg-zinc-600 hover:bg-zinc-400"}
            `}
          />

        ))}
      </div>
    </div>
  );
}
