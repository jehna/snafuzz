import fs from "fs";
import { Generator } from "./generator";

const cache: Record<string, string[]> = {};

const include = (path: string) => {
  if (cache[path]) {
    return cache[path];
  }

  const file = fs.readFileSync(path, "utf8").split("\n");
  cache[path] = file;
  return file;
};

export const oneFrom = (path: string) =>
  Generator((rnd) => {
    const file = include(path);
    return file[Math.floor(rnd() * file.length)];
  });
