const { normalizeUrl, getURLsFromHTML } = require("./crawl");

console.log(normalizeUrl("https://blog.boot.dev/path/"));
console.log(
  getURLsFromHTML(
    `
    <a href="https://boot.dev" id='xx'>Learn Backend Development</a>
    <a href="https://boot.dev" id='xx'>Learn Backend Development</a>
    <a href="https://boot.dev" id='xx'>Learn Backend Development</a>
    <a href="https://boot.dev" id='xx'>Learn Backend Development</a>
    <a href="https://boot.dev" id='xx'>Learn Backend Development</a>
    `
  )
);
