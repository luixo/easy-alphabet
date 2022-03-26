export type AlphabetGroup = {
  from: string[];
  to: string[];
  transformPredicators?: ((
    el: string,
    index: number,
    text: string
  ) => boolean)[];
};
export type Alphabet = AlphabetGroup[];
