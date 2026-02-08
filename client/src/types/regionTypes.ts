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

export const REGION_DISPLAY_VALUES: Record<string, string> = {
  eun1: "EUNE",
  euw1: "EUW",
  tr1: "TR",
  ru: "RU",
  na1: "NA",
  br1: "BR",
  la1: "LAN",
  la2: "LAS",
  kr: "KR",
  jp1: "JP",
  me1: "ME",
  sg2: "SG",
  tw2: "TW",
  vn2: "VN",
  oc1: "OCE",
};

export const REGION_API_VALUES: Record<string, Region> = {
  eun1: "eun",
  euw1: "euw",
  tr1: "tr",
  ru: "ru",
  na1: "na",
  br1: "br",
  la1: "lan",
  la2: "las",
  kr: "kr",
  jp1: "jp",
  me1: "me",
  sg2: "sg",
  tw2: "tw",
  vn2: "vn",
  oc1: "oce",
};

export function getRegionDefaultTagLineValue(regionValue: Region): string {
  return REGION_DEFAULT_TAGLINE_VALUES[regionValue] || "EUNE";
}

export function getRegionDisplayValue(regionValue: string): string {
  return REGION_DISPLAY_VALUES[regionValue] || "EUNE";
}

export function getRegionApiValue(regionValue: string): Region {
  return REGION_API_VALUES[regionValue] || "eun";
}
