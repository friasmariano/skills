import { TimelineItem } from "./TimelineItem";


export interface TimelineProps {
  items: TimelineItem[];
  align?: "left" | "right";
}