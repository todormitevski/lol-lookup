import RankedQueueCard from "@/components/ui/RankedQueueCard";
import { type RankDto } from "@/types";

import classes from "./RankStats.module.css";

type Props = {
  data: RankDto;
};

export default function RankStats({ data }: Props) {
  const soloDuoData = data.soloDuo;
  const flexData = data.flex;

  return (
    <div className={classes.container}>
      <RankedQueueCard queueType="Solo" data={soloDuoData} />
      <RankedQueueCard queueType="Flex" data={flexData} />
    </div>
  );
}
