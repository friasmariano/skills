export type AppPage = {
  href: string;
  title: string;
  navigationTitle?: string;
  subtitle: string;
  children?: AppPage[];
};

export const appPages: AppPage[] = [
  { href: '/', title: 'Skills', navigationTitle: 'Home', subtitle: 'Your Developer Gym' },
  {
    href: '/interview-prep',
    title: 'Interview Prep',
    subtitle: 'Build confidence for technical interviews with focused practice and preparation.',
    children: [
      {
        href: '/interview-prep/opportunities',
        title: 'Opportunities',
        subtitle: 'Track your current opportunities and focus on your next interview.',
        children: [
          {
            href: '/interview-prep/opportunities/preparation',
            title: 'Preparation Path',
            subtitle: 'Prepare for the opportunity currently in focus.',
          },
        ],
      },
    ],
  },
  {
    href: '/problem-solving',
    title: 'Problem Solving',
    subtitle: 'Notice the clues, recognize patterns, practice deliberately, and explain your reasoning.',
  },
  {
    href: '/bctci',
    title: 'BCTCI',
    subtitle: 'Prepare for coding interviews, one concept at a time.',
    children: [
      {
        href: '/bctci/dynamic-arrays',
        title: 'Dynamic Arrays',
        subtitle: 'Explore how arrays grow and work under the hood.',
        children: [
          {
            href: '/bctci/dynamic-arrays/implementing',
            title: 'Implementing Dynamic Arrays',
            navigationTitle: 'Implementing',
            subtitle: 'Build a dynamic array with fixed-size storage and amortized constant-time updates.',
          },
          {
            href: '/bctci/dynamic-arrays/extra',
            title: 'Extra Dynamic Arrays',
            navigationTitle: 'Extra',
            subtitle: 'Go further with dynamic array practice and exploration.',
          },
        ],
      },
    ],
  },
  {
    href: '/typescript-adventures',
    title: 'TypeScript Adventures',
    subtitle: 'Build confidence with types through hands-on exploration.',
  },
  {
    href: '/react-playground',
    title: 'React Playground',
    subtitle: 'Experiment with components, state, and interactive interfaces.',
  },
  {
    href: '/front-end-challenges',
    title: 'Front End Challenges',
    subtitle: 'Sharpen your interface-building skills with practical challenges.',
  },
];

export function findAppPage(pathname: string): AppPage | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  function find(pages: AppPage[]): AppPage | undefined {
    for (const page of pages) {
      if (page.href === path) return page;
      const child = page.children && find(page.children);
      if (child) return child;
    }
  }
  return find(appPages);
}
