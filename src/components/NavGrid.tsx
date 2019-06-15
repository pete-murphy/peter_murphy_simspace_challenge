import React, { MouseEventHandler } from "react";
import {
  FetchedBreeds,
  Query,
  Breed,
  ErrorMsg,
  SelectedBreed
} from "./../state";
import { Either } from "fp-ts/lib/Either";
import { toRegExp } from "../lib";
import "./NavGrid.scss";

type HandleBreedSelect = (breed: Breed) => MouseEventHandler;

export interface NavGridProps {
  breeds: FetchedBreeds;
  query: Query;
  handleSelect: HandleBreedSelect;
  selectedBreed: SelectedBreed;
}

const onLoading = <h2 className="loading">Loading...</h2>;

const onSome = (
  query: Query,
  handleSelect: HandleBreedSelect,
  selectedBreed: SelectedBreed
) => (s: Either<ErrorMsg, Array<Breed>>) =>
  s.fold(
    msg => <h3 className="error">{msg}</h3>,
    (breeds, filteredBreeds = breeds.filter(b => toRegExp(query).test(b))) =>
      filteredBreeds.length ? (
        <ul>
          {filteredBreeds.slice(0, 12).map((breed: Breed) => {
            const selected = breed === selectedBreed.getOrElse("");
            return (
              <li key={breed}>
                <button
                  type="button"
                  onClick={handleSelect(breed)}
                  aria-pressed={selected}
                  className={selected ? "active" : ""}
                  id={breed}
                >
                  {breed}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="no-match">No breed matches found.</h2>
      )
  );

export default function NavGrid({
  breeds,
  query,
  handleSelect,
  selectedBreed
}: NavGridProps) {
  return (
    <nav className="nav-container">
      {breeds.fold(onLoading, onSome(query, handleSelect, selectedBreed))}
    </nav>
  );
}
