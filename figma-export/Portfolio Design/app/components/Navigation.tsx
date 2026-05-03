import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#1e1e2e]/90 backdrop-blur-sm shadow-sm dark:shadow-[#000000]/20"
          : "bg-white dark:bg-[#1e1e2e]"
      }`}
    >
      <div className="max-w-[760px] mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono font-bold text-gray-900 dark:text-[#cdd6f4] hover:text-blue-600 dark:hover:text-[#89b4fa] transition-colors"
        >
          ~/yiming
        </a>

        <nav className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-6 text-sm font-mono text-gray-600 dark:text-[#a6adc8]">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-[#89b4fa] transition-colors">
              about
            </a>
            <span className="opacity-50">·</span>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-[#89b4fa] transition-colors">
              projects
            </a>
            <span className="opacity-50">·</span>
            <a href="#experience" className="hover:text-blue-600 dark:hover:text-[#89b4fa] transition-colors">
              experience
            </a>
            <span className="opacity-50">·</span>
            <a href="#writing" className="hover:text-blue-600 dark:hover:text-[#89b4fa] transition-colors">
              writing
            </a>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-[#a6adc8] dark:hover:text-[#89b4fa] transition-colors rounded-md"
              aria-label="Toggle dark mode"
            >
              {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
