import { array } from "./array";
import { Generator, map } from "./generator";
import { string } from "./string";
import { tuple } from "./tuple";

export const dict = <T>(
  valueGenerator: Generator<T>,
  keyGenerator = string()
): Generator<Record<string, T>> =>
  map(
    array(tuple(keyGenerator, valueGenerator)),
    Object.fromEntries,
    Object.entries
  );
