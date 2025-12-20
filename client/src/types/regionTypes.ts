export type Region =
  | "eun"
  | "euw"
  | "tr"
  | "ru"
  | "na"
  | "br"
  | "lan"
  | "las"
  | "kr"
  | "jp"
  | "me"
  | "sg"
  | "tw"
  | "vn"
  | "oce";

export type RegionDropdownOption = {
  value: Region;
  label: string;
};

export const REGION_DROPDOWN_OPTIONS: RegionDropdownOption[] = [
  { value: "eun", label: "EUN" },
  { value: "euw", label: "EUW" },
  { value: "tr", label: "TR" },
  { value: "ru", label: "RU" },
  { value: "na", label: "NA" },
  { value: "br", label: "BR" },
  { value: "lan", label: "LAN" },
  { value: "las", label: "LAS" },
  { value: "kr", label: "KR" },
  { value: "jp", label: "JP" },
  { value: "me", label: "ME" },
  { value: "sg", label: "SG" },
  { value: "tw", label: "TW" },
  { value: "vn", label: "VN" },
  { value: "oce", label: "OCE" },
];

export const REGION_DEFAULT_TAGLINE_VALUES: Record<Region, string> = {
  eun: "EUNE",
  euw: "EUW",
  tr: "TR1",
  ru: "RU1",
  na: "NA1",
  br: "BR1",
  lan: "LAN",
  las: "LAS",
  kr: "KR1",
  jp: "JP1",
  me: "ME1",
  sg: "SG2",
  tw: "TW2",
  vn: "VN2",
  oce: "OC",
};

export function getRegionDefaultTagLineValue(regionValue: Region): string {
  return REGION_DEFAULT_TAGLINE_VALUES[regionValue] || "EUNE";
}
