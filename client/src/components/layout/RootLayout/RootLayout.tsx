import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function RootLayout() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}
