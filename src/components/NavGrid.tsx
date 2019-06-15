import React, { ChangeEventHandler } from "react";
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

type HandleBreedSelect = (breed: Breed) => ChangeEventHandler;

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
    msg => <h2>{msg}</h2>,
    (breeds, seenBreeds = breeds.filter(b => toRegExp(query).test(b))) => (
      <ul>
        {seenBreeds.slice(0, 12).map((breed: Breed) => (
          <li key={breed}>
            <input
              type="radio"
              onChange={handleSelect(breed)}
              checked={breed === selectedBreed.getOrElse("")}
              id={breed}
            />
            <label htmlFor={breed}>{breed}</label>
          </li>
        ))}
      </ul>
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
