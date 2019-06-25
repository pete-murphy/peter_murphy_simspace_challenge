import React, { ChangeEventHandler, useContext } from "react";
import { setQuery } from "../state";
import "./Search.scss";
import { AppContext } from "../App";


export default function Search(): JSX.Element {
  const { dispatch, query } = useContext(AppContext)
  const onQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <span className="search-container">
      <input
        aria-label="search"
        value={query}
        onChange={onQueryChange}
        className="search-input"
        type="text"
      />
      {query.length === 0 && (
        <span className="search-placeholder">
          <span role="img" aria-label="detective">
            🕵️‍♀️
          </span>{" "}
          Search
        </span>
      )}
    </span>
  );
}
