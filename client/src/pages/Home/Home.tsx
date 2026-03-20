import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";

import classes from "./Home.module.css";

export default function Home() {
  return (
    <section className={classes.home}>
      <Logo size="default" />
      <SearchBar size="default" />
    </section>
  );
}
