const ACCOUNT_V1_CLUSTER_VALUES = {
  eun: "europe",
  euw: "europe",
  tr: "europe",
  ru: "europe",
  na: "americas",
  br: "americas",
  lan: "americas",
  las: "americas",
  kr: "asia",
  jp: "asia",
  me: "asia",
  sg: "asia",
  tw: "asia",
  vn: "asia",
  oce: "asia",
};

const MATCH_V5_CLUSTER_VALUES = {
  eun: "europe",
  euw: "europe",
  me: "europe",
  tr: "europe",
  ru: "europe",
  na: "americas",
  br: "americas",
  lan: "americas",
  las: "americas",
  kr: "asia",
  jp: "asia",
  sg: "sea",
  tw: "sea",
  vn: "sea",
  oce: "sea",
};

const REGION_VALUES = {
  eun: "eun1",
  euw: "euw1",
  tr: "tr1",
  ru: "ru",
  na: "na1",
  br: "br1",
  lan: "la1",
  las: "la2",
  kr: "kr",
  jp: "jp1",
  me: "me1",
  sg: "sg2",
  tw: "tw2",
  vn: "vn2",
  oce: "oc1",
};

function getAccountV1ClusterValue(region) {
  return ACCOUNT_V1_CLUSTER_VALUES[region] || "europe";
}

function getMatchV5ClusterValue(region) {
  return MATCH_V5_CLUSTER_VALUES[region] || "europe";
}

function getRegionValue(region) {
  return REGION_VALUES[region] || "eun1";
}

module.exports = {
  getAccountV1ClusterValue,
  getMatchV5ClusterValue,
  getRegionValue,
};
