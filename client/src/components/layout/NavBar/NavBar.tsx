import { useLocation } from "react-router";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

import classes from "./NavBar.module.css";

export default function NavBar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={classes.header}>
      <nav>
        <Logo size="small" />
        <div className={classes.rightNav}>
          {!isHome && (
            <div className={classes.desktopSearchBar}>
              <SearchBar size="small" />
            </div>
          )}
          <ThemeToggleButton />
        </div>
      </nav>

      {!isHome && (
        <div className={classes.mobileSearchBar}>
          <SearchBar size="small" />
        </div>
      )}
    </header>
  );
}
