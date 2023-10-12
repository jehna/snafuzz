import { string } from "../snafuzz/src/generators/string";
import { expect, test } from "../snafuzz/src/test";

test("substring part of concat (should fail unless REALLY lucky)", async () => {
  const a = string();
  const b = string();
  const c = string();
  expect((a + b + c).indexOf(b) > 0);
});

test("this should always succeed", async () => {
  expect(true);
});
