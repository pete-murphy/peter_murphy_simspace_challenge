import React, { ChangeEventHandler } from "react";
import { Query } from "../state";
import "./Search.scss";

export interface SearchProps {
  query: Query;
  onQueryChange: ChangeEventHandler;
}

export default function Search({ query, onQueryChange }: SearchProps) {
  return (
    <span className="search-container">
      <input
        value={query}
        onChange={onQueryChange}
        className="search-input"
        type="text"
      />
      {query.length === 0 && (
        <span className="search-placeholder">🕵️‍♀️ Search</span>
      )}
    </span>
  );
}
