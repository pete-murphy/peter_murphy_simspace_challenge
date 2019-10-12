import React, { MouseEvent, MouseEventHandler, useContext } from "react";
import { fold as foldEither } from "fp-ts/lib/Either";
import { some, fold as foldOption, getOrElse, Option } from "fp-ts/lib/Option";

import {
  Breed,
  FetchedBreeds,
  PendingImages,
  fetchImages,
  Query,
  SelectedBreed,
  setImages,
  setSelectedBreed,
  setQuery,
  PendingBreeds,
  AppDispatch
} from "src/state";
import { toRegExp, closestMatchBreed } from "src/lib";
import { AppContext } from "src/App";

import "./NavGrid.scss";
import { isEmpty } from "fp-ts/lib/Array";

type HandleBreedSelect = (breed: Breed) => MouseEventHandler;

export interface NavGridProps {
  breeds: PendingBreeds;
  query: Query;
  handleSelect: HandleBreedSelect;
  selectedBreed: SelectedBreed;
}

const onLoading = () => <h2 className="loading">Loading...</h2>;

type onSomeProps = {
  dispatch: AppDispatch["dispatch"];
  query: string;
  selectedBreed: Option<string>;
};

const onSome = ({
  dispatch,
  query,
  selectedBreed
}: onSomeProps): ((e: FetchedBreeds) => JSX.Element) =>
  foldEither(
    msg => <h3 className="error">{msg}</h3>,
    breeds => {
      const filteredBreeds = breeds.filter((b: Breed) =>
        toRegExp(query).test(b)
      );
      const handleSelect = (breed: Breed): MouseEventHandler => _e => {
        dispatch(setSelectedBreed(some(breed)));
        fetchImages(breed).then((images: PendingImages) => {
          dispatch(setImages(images));
        });
      };

      const suggestion = closestMatchBreed(query)(breeds);

      const handleSuggestionClick: MouseEventHandler = (_e: MouseEvent) => {
        dispatch(setQuery(""));
        dispatch(setSelectedBreed(some(suggestion)));
        fetchImages(suggestion).then((images: PendingImages) => {
          dispatch(setImages(images));
        });
      };

      const onEmpty = () => (
        <section className="no-match">
          <h2>No matching breeds.</h2>
          <p>
            No matches for <mark>{query}</mark>.
          </p>
          <p>
            Did you mean{" "}
            <button className="suggestion" onClick={handleSuggestionClick}>
              {suggestion}
            </button>
            ?
          </p>
        </section>
      );

      const onNonEmpty = (filteredBreeds: Array<Breed>) => (
        <ul>
          {filteredBreeds.slice(0, 12).map((breed: Breed) => {
            const selected = breed === getOrElse(() => "")(selectedBreed);
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
      );

      return isEmpty(filteredBreeds) ? onEmpty() : onNonEmpty(filteredBreeds);
    }
  );

export default function NavGrid(): JSX.Element {
  const { breeds, dispatch, query, selectedBreed } = useContext(AppContext);
  return (
    <nav className="nav-container">
      {foldOption(onLoading, onSome({ dispatch, query, selectedBreed }))(
        breeds
      )}
    </nav>
  );
}
