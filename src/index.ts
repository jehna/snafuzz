import { string } from "./generators/string";
import { setSeed } from "./ineternal-state";
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
