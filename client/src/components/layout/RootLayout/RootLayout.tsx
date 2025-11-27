import { Outlet } from "react-router";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

import classes from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={classes.rootWrapper}>
      <NavBar />
      <main className={classes.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
