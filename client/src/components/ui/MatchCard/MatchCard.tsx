import type { MatchDto } from "@/types";

type Props = {
  match: MatchDto;
};

export default function MatchCard({ match }: Props) {
  return (
    <div>
      Match Card | matchId: {match.matchId} | Game Mode: {match.gameMode}
    </div>
  );
}
