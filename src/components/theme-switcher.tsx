"use client";

import { useTheme } from '@/lib/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSwitcher() {
  const { theme, setTheme, isAutoTheme, toggleAutoTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {isAutoTheme ? (
            <Clock className="h-5 w-5" />
          ) : theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={!isAutoTheme && theme === 'light' ? 'bg-accent' : ''}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={!isAutoTheme && theme === 'dark' ? 'bg-accent' : ''}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={toggleAutoTheme}
          className={isAutoTheme ? 'bg-accent' : ''}
        >
          <Clock className="mr-2 h-4 w-4" />
          Auto (Time-based)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
