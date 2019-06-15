import escapeRegExp from "lodash/escapeRegExp";

export const toRegExp = (str: string): RegExp =>
  new RegExp(escapeRegExp(str), "gi");
