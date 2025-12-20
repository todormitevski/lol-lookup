import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "@/components/ui/icons";

type Theme = "dark" | "light";

import classes from "./ThemeToggleButton.module.css";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <button className={classes.themeButton} onClick={handleToggleTheme}>
      {theme === "dark" ? (
        <DarkModeIcon size={18} />
      ) : (
        <LightModeIcon size={18} />
      )}
    </button>
  );
}
