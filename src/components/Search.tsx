import React, { ChangeEventHandler } from "react";
import { Query } from "../state";

export interface SearchProps {
  query: Query;
  onQueryChange: ChangeEventHandler;
}

export default function Search({ query, onQueryChange }: SearchProps) {
  return <input type="text" value={query} onChange={onQueryChange} />;
}
