import { string, urlparams } from "./generators";
import { tag } from "./tag";
import { expect, test } from "./test";

test("should find a SQL injection", async () => {
  const params = urlparams({ q: string() });
  const result = await fetch(tag("http://localhost:3000/?" + params));
  expect(result.ok);
});
