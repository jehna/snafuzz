import { integer as _integer } from "./internal/integer";
import { registerProperty } from "./internal/state/properties";

export const integer = (min: number, max: number) =>
  registerProperty(() => _integer(min, max));
