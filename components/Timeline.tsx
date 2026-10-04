
import { TimelineProps } from "@/types/TimelineProps";
import React from "react";

export default function Timeline({ items, align = "left" }: TimelineProps) {
  return (
    <ul className="relative border-l border-white/20 pl-6" style={{ padding: '60px 0px 0px 0px' }}>
      {items.map((item, idx) => (
        <li key={item.id} className="relative mb-10 last:mb-0">
          {/* Dot */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white ring-4 ring-white/20" />

          <div
            className={
              align === "left"
                ? "text-left"
                : "text-right"
            }
            style={{ margin: '0px 0px 0px 69px' }}
          >
            {item.date && (
              <time className="block text-sm text-white/60 mb-1">
                {item.date}
              </time>
            )}
            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-white/70 mb-2">
                {item.subtitle}
              </p>
            )}
            {item.content && (
              <div className="text-white/80 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/*
USAGE:

<Timeline
  items={[
    {
      id: 1,
      date: "2023",
      title: "Started Project",
      subtitle: "Planning & research",
      content: "Defined scope, tech stack, and milestones."
    },
    {
      id: 2,
      date: "2024",
      title: "Development",
      content: "Built core features and UI components."
    }
  ]}
/>
*/
