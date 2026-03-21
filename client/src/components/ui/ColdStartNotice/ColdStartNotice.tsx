import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import HomeButton from "@/components/ui/HomeButton";

import classes from "./ColdStartNotice.module.css";

type Props = {
  title: string;
  message: string;
  retryDelay?: number;
};

export default function ColdStartNotice({
  title,
  message,
  retryDelay = 30,
}: Props) {
  const [countdown, setCountdown] = useState(retryDelay);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classes.coldStartNotice}>
      <div className={classes.content}>
        <LoadingSpinner variant="inline" />

        <h2>{title}</h2>
        <p>{message}</p>

        <span className={classes.countdown}>
          Retrying in {countdown} seconds
        </span>
        <HomeButton />
      </div>
    </div>
  );
}
