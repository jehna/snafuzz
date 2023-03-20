import type { fetch as fetchTypeInterface } from "undici";

type Fetch = typeof fetchTypeInterface;
const origFetch: Fetch = (globalThis as any).fetch;

export const fetch: Fetch = (url, options = {}) => {
  return origFetch(url, options);
};
