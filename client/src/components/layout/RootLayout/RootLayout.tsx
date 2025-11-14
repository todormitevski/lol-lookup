import { Outlet } from "react-router";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
