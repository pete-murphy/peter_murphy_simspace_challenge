import escapeRegExp from "lodash/escapeRegExp";
import * as S from "fp-ts/lib/Set";
import { eqString, strictEqual } from "fp-ts/lib/Eq";
import { ordNumber, Ord, max } from "fp-ts/lib/Ord";
import { some, none, Option } from "fp-ts/lib/Option";
import { Breed } from "src/state";
import { levenshtein } from "src/output/Distance";

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
  const l = levenshtein(query);
  return {
    equals: strictEqual,
    compare: (x, y) => ordNumber.compare(l(y), l(x))
  };
};

export const closestMatchBreed = (query: string) => (
  breeds: Array<Breed>
): Option<Breed> => {
  const result = breeds.reduce(max(getOrdBreedFromQuery(query)), "");
  return result === "" ? none : some(result);
};
