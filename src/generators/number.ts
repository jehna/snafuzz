import { rnd } from "../ineternal-state";
import { weighted } from "./probabilities";

export const numberBetween = (min: number, max: number) => {
  return weighted(
    [1, () => min],
    [1, () => max - 1],
    [1000, () => min + (max - min) * rnd()]
  );
};

export const intBetween = (min: number, max: number) =>
  Math.floor(numberBetween(min, max));
