import { Generator } from "./generator";

export const tuple = <T extends Generator<any>[]>(...itemGenerators: T) =>
  Generator(
    (rnd) => itemGenerators.map((generator) => generator.generate(rnd)),
    function* (value) {
      for (let i = 0; i < value.length; i++) {
        const generator = itemGenerators[i];
        const item = value[i];
        for (const shrunkItem of generator.shrink(item)) {
          yield [...value.slice(0, i), shrunkItem, ...value.slice(i + 1)];
        }
      }
    }
  );
