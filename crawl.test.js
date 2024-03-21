const { test, expect } = require("@jest/globals");
const { normalizeUrl } = require("./crawl.js");

test("normalize url", () => {
  expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path/"
  );
});
