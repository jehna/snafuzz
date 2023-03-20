import { fetch } from "./generators/fetch";
import { string } from "./generators/string";
import { urlparams } from "./generators/url";
import { tag } from "./tag";
import { expect, test } from "./test";

test("substring part of concat (should fail unless REALLY lucky)", async () => {
  const a = string();
  const b = string();
  const c = string();
  expect((a + b + c).indexOf(b) > 0);
});

test("this should always succeed", async () => {
  expect(true);
});

test("should find a SQL injection", async () => {
  const params = urlparams({ q: string() });
  const result = await fetch(tag("http://localhost:3000/?" + params));
  expect(result.ok);
});
