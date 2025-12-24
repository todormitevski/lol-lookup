import {
  getRegionDefaultTagLineValue,
  REGION_DROPDOWN_OPTIONS,
  type Region,
} from "@/types";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

import classes from "./SearchBar.module.css";

type Props = {
  size?: "default" | "small";
};

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

    const [gameName, tagLine] = searchInput
      .trim()
      .split("#")
      .map((s) => s.trim());
    navigate(`/summoner/${regionValue}/${gameName}/${tagLine}`);
  }

  return (
    <form
      className={`${classes.searchBar} ${classes[size]}`}
      onSubmit={handleSubmit}
    >
      <select value={regionValue} onChange={handleRegionChange}>
        {REGION_DROPDOWN_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder={`Summoner game name + #${getRegionDefaultTagLineValue(
          regionValue
        )}`}
        spellCheck={false}
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button type="submit">GO</button>
    </form>
  );
}
