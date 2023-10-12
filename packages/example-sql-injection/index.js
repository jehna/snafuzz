import { fetch } from "./fetch";
import { string } from "./generators/string";
import { tag } from "./generators/internal/state/tag";
import { expect, test } from "./test";

test("should find a SQL injection", async () => {
  const params = new URLSearchParams({ q: string() });
  const result = await fetch(tag("http://localhost:3000/?" + params));
  expect(result.ok);
});
