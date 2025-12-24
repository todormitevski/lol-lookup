import HomeButton from "@/components/ui/HomeButton";
import Footer from "@/components/layout/Footer";

import classes from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={classes.notFoundLayout}>
      <div className={classes.notFound}>
        <div className={classes.content}>
          <h1>404</h1>
          <h2>Not Found</h2>
          <p>
            The page you are looking for either doesn't exist or has been moved.
          </p>
          <HomeButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
