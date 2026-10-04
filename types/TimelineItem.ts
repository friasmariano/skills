export interface TimelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  date?: string;
  content?: React.ReactNode;
}