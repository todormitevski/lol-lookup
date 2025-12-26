import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { MatchIds } from "@/types";

type Props = {
  data: MatchIds | null;
};

export default function MatchList({ data }: Props) {
  if (!data) {
    return <LoadingSpinner variant="centered" />;
  }

  return (
    <div>
      <h2>Match List</h2>
      <p>Number of games fetched: {data.count}</p>
    </div>
  );
}
