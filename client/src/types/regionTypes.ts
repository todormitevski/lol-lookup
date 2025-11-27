export type Region =
  | "eun1"
  | "euw1"
  | "tr1"
  | "ru"
  | "na1"
  | "br1"
  | "la1"
  | "la2"
  | "kr"
  | "jp1"
  | "me1"
  | "sg2"
  | "tw2"
  | "vn2"
  | "oc1";

export type RegionDropdownOption = {
  value: Region;
  label: string;
};

export const REGION_DROPDOWN_OPTIONS: RegionDropdownOption[] = [
  { value: "eun1", label: "EUN" },
  { value: "euw1", label: "EUW" },
  { value: "tr1", label: "TR" },
  { value: "ru", label: "RU" },
  { value: "na1", label: "NA" },
  { value: "br1", label: "BR" },
  { value: "la1", label: "LAN" },
  { value: "la2", label: "LAS" },
  { value: "kr", label: "KR" },
  { value: "jp1", label: "JP" },
  { value: "me1", label: "ME" },
  { value: "sg2", label: "SG" },
  { value: "tw2", label: "TW" },
  { value: "vn2", label: "VN" },
  { value: "oc1", label: "OCE" },
];
