import { Generator } from "./generator";
import { integer } from "./integer";

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

      // First shrink all away
      yield [];

      //  Shrink on size first by keeping n last/first items
      let removedSize = Math.floor(value.length / 2);
      while (removedSize > 0) {
        yield value.slice(removedSize);
        yield value.slice(0, removedSize);
        removedSize = Math.floor(removedSize / 2);
      }

      //  Shrink the first item alone
      for (const shrunkItemValue of generator.shrink(value[0])) {
        yield [shrunkItemValue, ...value.slice(1)];
      }
      //  Keep first item untouched
      for (const shrunkValue of shrink(value.slice(1))) {
        yield [value[0], ...shrunkValue];
      }
    }
  );
