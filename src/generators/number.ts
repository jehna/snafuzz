import { rnd } from "../ineternal-state";
import { weighted } from "./probabilities";

export const numberBetween = (min: number, max: number) => {
  return weighted(
    [1, () => min],
    [1, () => max],
    [1000, () => min + (max - min) * rnd()]
  );
};
