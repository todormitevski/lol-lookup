import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { RankDto } from "@/types";

type Props = {
  loading: boolean;
  data: RankDto | null;
};

export default function RankStats({ loading, data }: Props) {
  if (loading || !data) {
    return <LoadingSpinner variant="centered" />;
  }

  return (
    <div>
      <h2>Rank Stats</h2>
      <h4>SOLOQ</h4>
      <p>{data.soloDuo?.rank}</p>
      <p>{data.soloDuo?.division}</p>
      <p>{data.soloDuo?.wins}</p>
      <p>{data.soloDuo?.losses}</p>
      <p>{data.soloDuo?.lp}</p>
      <h4>FLEXQ</h4>
      <p>{data.flex?.rank}</p>
      <p>{data.flex?.division}</p>
      <p>{data.flex?.wins}</p>
      <p>{data.flex?.losses}</p>
      <p>{data.flex?.lp}</p>
    </div>
  );
}
