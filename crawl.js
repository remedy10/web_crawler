const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }
  const normalizedUrl = normalizeURL(currentUrl);
  if (pages[normalizedUrl] > 0) {
    pages[normalizedUrl]++;
    return pages;
  }
  pages[normalizedUrl] = 1;
  try {
    console.log(`crawling  ${currentUrl}`);
    const resp = await fetch(currentUrl);
    if (resp.status >= 400) {
      console.log(`failed (${resp.status})`);
      return pages;
    }
    const content_type = resp.headers.get("content-type");
    if (!content_type.includes("text/html")) {
      console.log(
        `response content-type must be html but we have  ${content_type}`
      );
      return pages;
    }
    let respHTML = await resp.text();
    const nextURLs = getURLsFromHTML(respHTML, baseUrl);
    for (let nextURL of nextURLs) {
      pages = await crawlPage(baseUrl, nextURL, pages);
    }
  } catch (error) {
    console.log(`${error.message} on fetch ${currentUrl}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
