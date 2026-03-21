import { Link } from "react-router";

import classes from "./HomeButton.module.css";

export default function HomeButton() {
  return (
    <Link to="/" className={classes.homeButton}>
      Home
    </Link>
  );
}
