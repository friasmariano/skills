import type { FeaturedCardId } from '@/lib/features/featured/store/featured-slice';

export const featuredSections: { id: FeaturedCardId; title: string; category: string; description: string; symbol: string; icon: string }[] = [
  { id: 'interview', title: 'Beyond Cracking the Coding Interview', category: 'Problem solving', description: 'Explore the thinking behind the solution, from first principles to confident implementation.', symbol: '{ }', icon: 'bi-braces' },
  { id: 'frontend', title: 'Front End Challenges', category: 'Build & explore', description: 'Turn interface ideas into thoughtful, responsive experiences, one challenge at a time.', symbol: '</>', icon: 'bi-code-slash' },
  { id: 'react', title: 'React Playground', category: 'Experimentation', description: 'A space to explore components, interactions, and new ways to build with React.', symbol: '⌘', icon: 'bi-bezier2' },
  { id: 'typescript', title: 'Typescript Adventures', category: 'Type it better', description: 'Discover expressive types and practical patterns for more reliable code.', symbol: 'TS', icon: 'bi-filetype-tsx' },
];
