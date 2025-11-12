import { Route, Routes } from "react-router";
import RootLayout from "../components/layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Summoner from "../pages/Summoner/Summoner";

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
