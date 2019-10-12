import escapeRegExp from "lodash/escapeRegExp";
import * as S from "fp-ts/lib/Set";
import { eqString, strictEqual } from "fp-ts/lib/Eq";
import { ordNumber, Ord, max } from "fp-ts/lib/Ord";
import { Breed } from "src/state";

export const toRegExp = (str: string): RegExp =>
  new RegExp(escapeRegExp(str), "gi");

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/, "");

const jaccard = (str0: string) => (str1: string): number => {
  const [a, b] = [str0, str1].map(str =>
    S.fromArray(eqString)(Array.from(normalize(str)))
  );
  return (
    Math.abs(S.intersection(eqString)(a, b).size) /
    Math.abs(S.union(eqString)(a, b).size)
  );
};

export const getOrdBreedFromQuery = (query: string): Ord<Breed> => {
  const j = jaccard(query);
  return {
    equals: strictEqual,
    compare: (x, y) => ordNumber.compare(j(x), j(y))
  };
};

export const closestMatchBreed = (query: string) => (
  breeds: Array<Breed>
): Breed => breeds.reduce(max(getOrdBreedFromQuery(query)), "");
