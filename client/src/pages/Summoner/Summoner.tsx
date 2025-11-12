import { useParams } from "react-router";

export default function Summoner() {
  const { region, gameName, tagLine } = useParams();
  console.log(region, gameName, tagLine);

  return (
    <section>
      <h1>
        {region} {gameName} {tagLine}
      </h1>
    </section>
  );
}
