const { crawlPage } = require("./crawl");
const { printReport } = require("./report");
async function main() {
  console.log(process.argv.length);
  if (process.argv.length === 3) {
    const baseUrl = process.argv[2];
    const result = await crawlPage(baseUrl, baseUrl, {});
    printReport(result);
  } else {
    throw new Error("You must pass a one argument");
  }
}
main();
