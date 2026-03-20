import classes from "./LoadingSpinner.module.css";

type Props = {
  variant?: "page" | "centered" | "inline" | "small";
};

export default function LoadingSpinner({ variant = "page" }: Props) {
  const isSmallLoader = variant === "small";
  const containerVariant = !isSmallLoader ? variant : "inline";

  return (
    <div className={`${classes.loadingContainer} ${classes[containerVariant]}`}>
      <div
        className={`${classes.loader} ${isSmallLoader ? classes.loaderSmall : ""}`}
      ></div>
    </div>
  );
}
