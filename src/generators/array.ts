import { numberBetween } from "./number";

export const arrayOf = <T>(generator: () => T) => {
  const length = numberBetween(0, Math.pow(2, 10));
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result.push(generator());
  }
  return result;
};
