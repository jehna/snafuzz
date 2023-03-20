import { map } from "./generator";
import { integer } from "./integer";

export const boolean = () =>
  map(
    integer(0, 1),
    (v) => v === 1,
    (v) => (v ? 1 : 0)
  );
