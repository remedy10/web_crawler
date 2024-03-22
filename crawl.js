const { JSDOM } = require("jsdom");
function normalizeUrl(fullUrl) {
  const urlObj = new URL(fullUrl);
  if (urlObj.pathname.slice(-1) === "/") {
    return `${urlObj.host}${urlObj.pathname.slice(0, -1)}`;
  }
  return `${urlObj.host}${urlObj.pathname}`;
}
function getURLsFromHTML(htmlBody, baseUrl) {
  arrUrl = [];
  const dom = new JSDOM(htmlBody);
  const elements = dom.window.document.querySelectorAll("a");
  for (const element of elements) {
    if (element.href.includes("https") || element.href.includes("http")) {
      //absolute
      arrUrl.push(element.href);
    } else {
      //relative
      if (element.href.slice(0, 1) !== "/") {
        continue;
      }
      arrUrl.push(`${baseUrl}${element.href}`);
    }
  }
  return arrUrl;
}
module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
