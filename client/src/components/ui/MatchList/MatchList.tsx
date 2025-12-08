import type { MatchIds } from "@/types";

type Props = {
  data: MatchIds;
};

export default function MatchList({ data }: Props) {
  return (
    <div>
      <h2>Match List</h2>
      {data && <p>Number of games fetched: {data.count}</p>}
    </div>
  );
}
