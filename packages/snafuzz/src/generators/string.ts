import { registerProperty } from "./internal/state/properties";
import { string as _string } from "./internal/string";
import { html as _html } from "./internal/html";

export const string = () => registerProperty(_string);

export const html = () => registerProperty(_html);
