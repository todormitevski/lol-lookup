import { Link, useNavigate } from "react-router";
import classes from "./Home.module.css";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const navigate = useNavigate();

  function handleSubmit() {
    const terms = searchTerm?.split(/\s+/g);
    navigate(`/summoner/${terms![0]}/${terms![1]}/${terms![2]}`);
  }

  return (
    <main className={classes.placeholderStyles}>
      <Link to="/">
        <h1>
          <span style={{ color: "#C79B3B" }}>LOL</span>LOOKUP
        </h1>
      </Link>
      <input
        type="text"
        placeholder="Hide on bush#KR1"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSubmit}>GO</button>
    </main>
  );
}
