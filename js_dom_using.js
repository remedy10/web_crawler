const { JSDOM } = require("jsdom");
const dom = new JSDOM(
  `<!DOCTYPE html>
    <body>
      <p id="main">
        My First JSDOM!
      </p>
      <a href="https://boot.dev">
        Learn Backend Development
      </a>
    </body>
  </html>`
);
// This prints "My First JSDOM!"
const el = dom.window.document.querySelectorAll("a");
for (const ee of el) {
  console.log(ee.href);
}
