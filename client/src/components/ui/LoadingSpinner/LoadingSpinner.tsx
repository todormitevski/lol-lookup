import classes from "./LoadingSpinner.module.css";

type Props = {
  variant?: "page" | "centered" | "small";
};

export default function LoadingSpinner({ variant = "page" }: Props) {
  return (
    <div className={`${classes.loadingContainer} ${classes[variant]}`}>
      <div
        className={`${classes.loader} ${variant === "small" ? classes.loaderSmall : ""}`}
      ></div>
    </div>
  );
}
