type Random = () => number;

export type Generator<T> = {
  generate(mutableRandomGenerator: Random): T;
  shrink(value: T): IterableIterator<T>;
};
export const Generator = <T>(
  generate: (mutableRandomGenerator: Random) => T,
  shrink: (value: T) => IterableIterator<T> = () => [].values()
): Generator<T> => ({
  generate,
  shrink,
});

export const map = <T, U>(
  generator: Generator<T>,
  mapper: (value: T) => U,
  unmapper: (value: U) => T
) =>
  Generator(
    (rnd) => mapper(generator.generate(rnd)),
    function* (value) {
      for (const shrunkValue of generator.shrink(unmapper(value))) {
        yield mapper(shrunkValue);
      }
    }
  );
