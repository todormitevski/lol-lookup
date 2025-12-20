import { Link } from "react-router";

import classes from "./Logo.module.css";

type Props = {
  size?: "small" | "default";
};

export default function Logo({ size = "default" }: Props) {
  return (
    <Link to="/" className={`${classes.logo} ${classes[size]}`}>
      <h1>
        <span className={classes.accent}>LOL</span>LOOKUP
      </h1>
    </Link>
  );
}
