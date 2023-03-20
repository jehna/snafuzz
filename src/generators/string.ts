import { registerProperty } from "./internal/state/properties";
import { string as _string } from "./internal/string";

export const string = () => registerProperty(_string);
