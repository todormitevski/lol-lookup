import HomeButton from "@/components/ui/HomeButton";

import classes from "./SummonerError.module.css";

type Props = {
  title: string;
  message: string;
};

export default function SummonerError({ title, message }: Props) {
  return (
    <div className={classes.error}>
      <div className={classes.content}>
        <h2>{title}</h2>
        <p>{message}</p>
        <HomeButton />
      </div>
    </div>
  );
}
