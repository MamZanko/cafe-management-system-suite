"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAutoTheme: boolean;
  toggleAutoTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isAutoTheme, setIsAutoTheme] = useState(true);

  // Function to determine theme based on time (6am-6pm light, 6pm-6am dark)
  const getThemeByTime = (): Theme => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'light' : 'dark';
  };

  useEffect(() => {
    // Load preferences from localStorage
    const savedAutoTheme = localStorage.getItem('autoTheme');
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedAutoTheme === 'false') {
      setIsAutoTheme(false);
      if (savedTheme) {
        setThemeState(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
    } else {
      setIsAutoTheme(true);
      const timeBasedTheme = getThemeByTime();
      setThemeState(timeBasedTheme);
      document.documentElement.classList.toggle('dark', timeBasedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isAutoTheme) {
      // Update theme based on time every minute
      const interval = setInterval(() => {
        const newTheme = getThemeByTime();
        if (newTheme !== theme) {
          setThemeState(newTheme);
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAutoTheme, theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setIsAutoTheme(false);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('autoTheme', 'false');
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleAutoTheme = () => {
    const newAutoTheme = !isAutoTheme;
    setIsAutoTheme(newAutoTheme);
    localStorage.setItem('autoTheme', String(newAutoTheme));

    if (newAutoTheme) {
      // Switch to time-based theme immediately
      const timeBasedTheme = getThemeByTime();
      setThemeState(timeBasedTheme);
      document.documentElement.classList.toggle('dark', timeBasedTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isAutoTheme, toggleAutoTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
