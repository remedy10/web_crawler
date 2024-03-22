const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");

test("normalize url", () => {
  const input = "https://blog.boot.dev/path/";
  const expected = "blog.boot.dev/path";
  const actual = normalizeUrl(input);
  expect(actual).toBe(expected);
});
test("getURLsFromHTML", () => {
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
