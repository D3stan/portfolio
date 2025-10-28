import { useState, useEffect } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'brutalist-dark', name: 'Dark', icon: Moon },
    { id: 'noir', name: 'Noir', icon: Moon },
    { id: 'ghibli', name: 'Ghibli', icon: Palette },
  ];

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setShowThemeMenu(false);
  };

  const currentThemeData = themes.find(t => t.id === theme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className="border-2 border-black bg-white p-2 shadow-[3px_3px_0_#000] hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Toggle theme menu"
        aria-expanded={showThemeMenu}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {/* Theme dropdown menu */}
      {showThemeMenu && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setShowThemeMenu(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,0.18)] z-50">
            <div className="p-2">
              <p className="text-xs font-bold uppercase px-2 py-1 text-muted">
                Select Theme
              </p>
              <div className="space-y-1">
                {themes.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-semibold border-2 transition-colors ${
                        theme === t.id
                          ? 'bg-accent border-black'
                          : 'bg-white border-transparent hover:border-black'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{t.name}</span>
                      {theme === t.id && <span className="ml-auto">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
