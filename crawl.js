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
  elements.forEach((element) => arrUrl.push(element.href));
  return arrUrl;
}
module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
