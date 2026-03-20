import type { Region } from "@/types";
import { getRegionDefaultTagLineValue, REGION_DROPDOWN_OPTIONS } from "@/utils";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

import classes from "./SearchBar.module.css";

type Props = {
  size?: "default" | "small";
};

const PLACEHOLDER_GAME_NAME = (
  import.meta.env.VITE_PLACEHOLDER_GAME_NAME ?? ""
).trim();
const PLACEHOLDER_TAG_LINE = (
  import.meta.env.VITE_PLACEHOLDER_TAG_LINE ?? ""
).trim();

export default function SearchBar({ size = "default" }: Props) {
  const [regionValue, setRegionValue] = useState<Region>("eun");
  const [searchInput, setSearchInput] = useState<string>("");

  const navigate = useNavigate();

  function handleRegionChange(e: ChangeEvent<HTMLSelectElement>) {
    setRegionValue(e.target.value as Region);
  }

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedSearchInput = searchInput.trim();

    if (!trimmedSearchInput) {
      if (isPlaceholderSummonerPresent) {
        const encodedGameName = encodeURIComponent(PLACEHOLDER_GAME_NAME);
        const encodedTagLine = encodeURIComponent(PLACEHOLDER_TAG_LINE);

        navigate(
          `/summoner/${regionValue}/${encodedGameName}/${encodedTagLine}`,
        );
      }

      return;
    }

    const [gameName, tagLine] = trimmedSearchInput
      .split("#")
      .map((s) => s.trim());

    const encodedGameName = encodeURIComponent(gameName);
    const encodedTagLine = encodeURIComponent(tagLine);

    navigate(`/summoner/${regionValue}/${encodedGameName}/${encodedTagLine}`);
  }

  const isPlaceholderSummonerPresent = Boolean(
    PLACEHOLDER_GAME_NAME && PLACEHOLDER_TAG_LINE,
  );
  const placeholderText = isPlaceholderSummonerPresent
    ? `${PLACEHOLDER_GAME_NAME}#${PLACEHOLDER_TAG_LINE}`
    : `Summoner game name + #${getRegionDefaultTagLineValue(regionValue)}`;

  return (
    <form
      className={`${classes.searchBar} ${classes[size]}`}
      onSubmit={handleSubmit}
    >
      <select
        id="region-select"
        value={regionValue}
        onChange={handleRegionChange}
      >
        {REGION_DROPDOWN_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input
        id="summoner-input"
        type="text"
        placeholder={placeholderText}
        spellCheck={false}
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button type="submit">GO</button>
    </form>
  );
}
