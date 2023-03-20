import { Generator } from "./generator";
import { integer } from "./integer";
import { intBetween } from "../number";

// Legacy
export const arrayOf = <T>(generator: () => T) => {
  const length = intBetween(0, Math.pow(2, 10));
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result.push(generator());
  }
  return result;
};

export const array = <T>(generator: Generator<T>) =>
  Generator(
    (rnd) => {
      const length = integer(0, 50).generate(rnd);
      const result: T[] = [];
      for (let i = 0; i < length; i++) {
        result.push(generator.generate(rnd));
      }
      return result;
    },
    function* shrink(value): IterableIterator<T[]> {
      // No shrink on empty arrays
      if (value.length === 0) {
        return;
      }
      // Step 1. Shrink on size first by keeping last items
      let removedSize = Math.floor(value.length / 2);
      while (removedSize > 0) {
        yield value.slice(removedSize);
        removedSize = Math.floor(removedSize / 2);
      }
      // Step 2. Shrink the first item alone
      for (const shrunkItemValue of generator.shrink(value[0])) {
        yield [shrunkItemValue, ...value.slice(1)];
      }
      // Step 3. Keep first item untouched
      for (const shrunkValue of shrink(value.slice(1))) {
        yield [value[0], ...shrunkValue];
      }
    }
  );
