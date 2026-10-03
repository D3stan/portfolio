import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to Gradient Plaza (light)' : 'Switch to broadcast void (dark)';

  return (
    <button
      onClick={toggleTheme}
      className="btn95 !p-1.5"
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
