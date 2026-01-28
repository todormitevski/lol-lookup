import LoadingSpinner from "@/components/ui/LoadingSpinner";
import RankedQueueCard from "@/components/ui/RankedQueueCard";
import { type RankDto } from "@/types";

import classes from "./RankStats.module.css";

type Props = {
  loading: boolean;
  data: RankDto | null;
};

export default function RankStats({ loading, data }: Props) {
  if (loading || !data) {
    return <LoadingSpinner variant="centered" />;
  }

  const soloDuoData = data.soloDuo;
  const flexData = data.flex;

  return (
    <div className={classes.container}>
      <RankedQueueCard queueType="Solo" data={soloDuoData} />
      <RankedQueueCard queueType="Flex" data={flexData} />
    </div>
  );
}
