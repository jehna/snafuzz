import { Generator } from "./generator";

export const integer = (min: number, max: number) =>
  Generator(
    (rnd) => Math.floor(rnd() * (max - min + 1)) + min,
    function* (value) {
      while (value != min) {
        value = min + Math.floor((value - min) / 2);
        yield value;
      }
    }
  );
