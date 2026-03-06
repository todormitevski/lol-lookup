import { ChevronDownIcon } from "@/components/ui/icons";

import classes from "./ExpandCardButton.module.css";

type Props = {
  onClick: () => void;
  isExpanded: boolean;
  variant?: "default" | "small";
};

export default function ExpandCardButton({
  onClick,
  isExpanded,
  variant = "default",
}: Props) {
  return (
    <button className={`${classes.expandBtn} ${classes[variant]}`} onClick={onClick}>
      <span
        className={`${classes.expandIcon} ${isExpanded ? classes.expandIconFlipped : ""}`}
      >
        <ChevronDownIcon />
      </span>
    </button>
  );
}
