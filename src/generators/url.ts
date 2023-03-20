import { registerProperty } from "./internal/state/properties";
import { urlparams as _urlparams } from "./internal/url";

export const urlparams = () => registerProperty(_urlparams);
