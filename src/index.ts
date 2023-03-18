import { string } from "./generators";
import { rnd } from "./ineternal-state";
import { expect, test } from "./test";

test("rnd should return value between 0 and 1", async () => {
  const value = rnd();
  expect(value > 0 && value < 1);
});

test("string should return a string with length", async () => {
  const value = string();
  expect(value.length > 0);
});
