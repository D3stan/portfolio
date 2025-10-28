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
      className="border-2 border-border bg-card p-2 shadow-[3px_3px_0_var(--shadow-strong)] hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
