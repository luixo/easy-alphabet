import type { ParseKeys } from "i18next";

export type AlphabetGroup = {
  from: string[];
  to: string[];
};

export type AlphabetTransform = "ru-ka" | "ka-ru";

export type AlphabetDescription = {
  transform: AlphabetTransform;
  groups: AlphabetGroup[];
  nameKey: ParseKeys;
  isCustom: boolean;
};

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export type AssertTrue<A extends true, X> = A extends true ? X : never;

export type AllEqual<T extends unknown[]> = T extends [
  infer A,
  infer B,
  ...infer Rest,
]
  ? Equals<A, B> extends true
    ? AllEqual<[B, ...Rest]>
    : false
  : true;

export type AssertAllEqual<T extends unknown[]> = AssertTrue<
  AllEqual<T>,
  T extends (infer U)[] ? U : never
>;
