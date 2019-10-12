import React, { ChangeEventHandler, useContext } from "react";
import { AppContext } from "src/App";
import { setQuery } from "src/state";
import "./Search.scss";

export default function Search(): JSX.Element {
  const { dispatch, query } = useContext(AppContext);
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
