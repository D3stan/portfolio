import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'brutalist-dark' : 'light';
    changeTheme(newTheme);
  };

  const isDark = theme === 'brutalist-dark';

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center border-2 border-border bg-card p-2 min-h-[44px] min-w-[44px] shadow-[3px_3px_0_var(--shadow-strong)] active:translate-y-[2px] transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
    </button>
  );
}
