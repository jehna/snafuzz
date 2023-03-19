import type { fetch as fetchTypeInterface, RequestInit } from "undici";
import { oneFrom } from "../local";
import { tag } from "../tag";
import { arrayOf } from "./array";
import { weighted } from "./probabilities";
import { alphanumeric, string } from "./string";

type Fetch = typeof fetchTypeInterface;
const origFetch: Fetch = (globalThis as any).fetch;

const defaultFetchOptions = (): RequestInit => ({
  //headers: headers(), // Needs a http-level implementation
});

export const fetch: Fetch = (url, options = {}) => {
  const def = defaultFetchOptions();
  tag(def.headers);
  return origFetch(url, { ...def, ...options });
};

const headerString = () => string({ generator: alphanumeric, minLength: 1 });
const HEADERS_LIST =
  "SecLists/Miscellaneous/web/http-request-headers/http-request-headers-fields-large.txt";
const headerName = () =>
  weighted([100, () => oneFrom(HEADERS_LIST)], [1, headerString]);
const header = (): [string, string] => [headerName(), headerString()];
export const headers = () =>
  weighted([10, () => []], [1, () => arrayOf(header)]);
