const url = require("url");
function normalizeUrl(fullUrl) {
  let urlObj = new URL(fullUrl);
  return `${urlObj.host}${urlObj.pathname}`;
}
module.exports = {
  normalizeUrl,
};
