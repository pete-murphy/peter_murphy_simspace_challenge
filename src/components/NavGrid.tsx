import React, { MouseEventHandler, useContext } from "react";
import {
  FetchedBreeds,
  Query,
  Breed,
  ErrorMsg,
  SelectedBreed,
  setSelectedBreed,
  fetchImages,
  FetchedImages,
  setImages
} from "./../state";
import { Either } from "fp-ts/lib/Either";
import { some } from "fp-ts/lib/Option";
import { toRegExp } from "../lib";
import "./NavGrid.scss";
import { AppContext } from "../App";

type HandleBreedSelect = (breed: Breed) => MouseEventHandler;

export interface NavGridProps {
  breeds: FetchedBreeds;
  query: Query;
  handleSelect: HandleBreedSelect;
  selectedBreed: SelectedBreed;
}

const onLoading = <h2 className="loading">Loading...</h2>;

const onSome = (s: Either<ErrorMsg, Array<Breed>>) =>
  s.fold(
    msg => <h3 className="error">{msg}</h3>,
    breeds => {
      const { dispatch, query, selectedBreed } = useContext(AppContext);
      const filteredBreeds = breeds.filter(b => toRegExp(query).test(b));
      const handleSelect = (breed: Breed): MouseEventHandler => _e => {
        dispatch(setSelectedBreed(some(breed)));
        fetchImages(breed).then((images: FetchedImages) =>
          dispatch(setImages(images))
        );
      };

      return filteredBreeds.length ? (
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
      );
    }
  );

export default function NavGrid(): JSX.Element {
  const { breeds } = useContext(AppContext);
  return <nav className="nav-container">{breeds.fold(onLoading, onSome)}</nav>;
}
