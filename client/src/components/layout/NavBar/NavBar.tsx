import { Link } from "react-router";

export default function NavBar() {
  return (
    <header>
      <nav>
        <Link to="/">
          <h1>LolLookup</h1>
        </Link>
      </nav>
    </header>
  );
}
