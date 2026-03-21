type ChampionEntry = {
  key: string;
  id: string;
  name: string;
};

type ChampionData = {
  [key: string]: ChampionEntry;
};

const PATCH_VER = import.meta.env.VITE_PATCH_VER;

let championCache: ChampionData | null = null;
let fetchPromise: Promise<ChampionData> | null = null;

async function fetchChampionData(): Promise<ChampionData> {
  if (championCache) {
    return championCache;
  }

  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = fetchDataDragonChampionData();

  return fetchPromise;
}

async function fetchDataDragonChampionData() {
  const dataDragonChampionRes = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${PATCH_VER}/data/en_US/champion.json`,
  );

  if (!dataDragonChampionRes.ok) {
    fetchPromise = null;
    throw new Error(
      `Failed to fetch champion data from DataDragon: ${dataDragonChampionRes.status}`,
    );
  }

  const dataDragonChampionData = await dataDragonChampionRes.json();
  championCache = dataDragonChampionData.data;

  return championCache!;
}

export async function getChampionNameById(championId: number): Promise<string> {
  try {
    const championData = await fetchChampionData();
    const championEntry = Object.values(championData).find(
      (entry) => entry.key === String(championId),
    );

    return championEntry?.id ?? "Aatrox";
  } catch (error) {
    console.error("Error in DataDragon service: ", error);
    return "Aatrox";
  }
}
