import { Route, Routes } from "react-router";
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Summoner from "@/pages/Summoner";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/summoner/:region/:gameName/:tagLine"
          element={<Summoner />}
        />
      </Route>
    </Routes>
  );
}
