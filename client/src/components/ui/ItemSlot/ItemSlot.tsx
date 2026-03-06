import { createItemIconUrl } from "@/utils";

import classes from "./ItemSlot.module.css";

type Props = {
  itemId: number;
  isCircular?: boolean;
};

export default function ItemSlot({ itemId, isCircular = false }: Props) {
  const shapeClass = isCircular ? classes.itemCircular : "";

  return (
    <span className={`${classes.itemSlot} ${shapeClass}`}>
      {itemId !== undefined && itemId !== 0 && (
        <img
          className={classes.itemIcon}
          src={createItemIconUrl(itemId)}
          alt={`Item ${itemId}`}
        />
      )}
    </span>
  );
}
