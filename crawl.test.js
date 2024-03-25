const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("normalize url", () => {
  const input = "https://blog.boot.dev/path/";
  const expected = "blog.boot.dev/path";
  const actual = normalizeURL(input);
  expect(actual).toBe(expected);
});
test("getURLsFromHTML absolute url", () => {
  const htmlBody = `
  <!DOCTYPE html>
  <body>
    <p id="main">
      My First JSDOM!
    </p>
    <a href="https://boot.dev/">
      Learn Backend Development
    </a>
  </body>
</html>`;
  const baseUrl = "https://boot.dev";
  const expected = ["https://boot.dev/"];
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  expect(actual).toStrictEqual(expected);
});
test("getURLsFromHTML relative url", () => {
  const htmlBody = `
  <!DOCTYPE html>
  <body>
    <p id="main">
      My First JSDOM!
    </p>
    <a href="/tracks/backend">
      Tracks Backend
    </a>
  </body>
</html>`;
  const baseUrl = "https://boot.dev";
  const expected = ["https://boot.dev/tracks/backend"];
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  expect(actual).toStrictEqual(expected);
});
test("getURLsFromHTML broken url", () => {
  const htmlBody = `
  <!DOCTYPE html>
  <body>
    <p id="main">
      My First JSDOM!
    </p>
    <a href="empty">
      empty link
    </a>
  </body>
</html>`;
  const baseUrl = "https://boot.dev";
  const expected = [];
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  expect(actual).toStrictEqual(expected);
});
test("getURLsFromHTML mixed url", () => {
  const htmlBody = `
  <!DOCTYPE html>
  <body>
    <p id="main">
      My First JSDOM!
    </p>
    <a href="/tracks/backend">
      Tracks Backend
    </a>
    <a href="https://boot.dev/">
      Learn Backend Development
    </a>
    <a href="/tracks/fronted">
      Learn Backend Development
    </a>
    <a href="empty">
      empty link
    </a>
  </body>
</html>`;
  const baseUrl = "https://boot.dev";
  const expected = [
    "https://boot.dev/tracks/backend",
    "https://boot.dev/",
    "https://boot.dev/tracks/fronted",
  ];
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  expect(actual).toStrictEqual(expected);
});
