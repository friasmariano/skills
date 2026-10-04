'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { toggle } from '../lib/features/theme/store/theme-slice';

export default function ThemeProvider() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.data.isDark);

  useEffect(() => {
    const themeClass = isDark ? 'dark' : 'light';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeClass);
  }, [isDark]);

  return (
    <></>
  );
}
