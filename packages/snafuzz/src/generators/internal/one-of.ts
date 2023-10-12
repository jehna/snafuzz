import { Generator } from "./generator";

export const oneOf = <T>(arr: T[]): Generator<T> =>
  Generator((rnd) => {
    return arr[Math.floor(rnd() * arr.length)];
  });
