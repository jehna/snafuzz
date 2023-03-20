import type { fetch as fetchTypeInterface, RequestInit } from "undici";

type Fetch = typeof fetchTypeInterface;
const origFetch: Fetch = (globalThis as any).fetch;

export const fetch: Fetch = (url, options = {}) => {
  return origFetch(url, options);
};

const HEADERS_LIST =
  "SecLists/Miscellaneous/web/http-request-headers/http-request-headers-fields-large.txt";
