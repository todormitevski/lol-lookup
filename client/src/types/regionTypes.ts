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
