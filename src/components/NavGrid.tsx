import React, { MouseEventHandler } from "react";
import { FetchedBreeds, Query, Breed, ErrorMsg } from "./../state";
import { Either } from "fp-ts/lib/Either";
import { toRegExp } from "../lib";

export interface NavGridProps {
  breeds: FetchedBreeds;
  query: Query;
  handleClick: (breed: Breed) => MouseEventHandler;
}

const onLoading = <h2>Loading...</h2>;

const onSome = (
  query: Query,
  handleClick: (breed: Breed) => MouseEventHandler
) => (s: Either<ErrorMsg, Array<Breed>>) =>
  s.fold(
    msg => <h2>{msg}</h2>,
    (breeds, visBreeds = breeds.filter(b => toRegExp(query).test(b))) => (
      <ul>
        {visBreeds.slice(0, 12).map((breed: Breed) => (
          <li key={breed}>
            <button onClick={handleClick(breed)}>{breed}</button>
          </li>
        ))}
      </ul>
    )
  );

export default function NavGrid({ breeds, query, handleClick }: NavGridProps) {
  return <nav>{breeds.fold(onLoading, onSome(query, handleClick))}</nav>;
}
