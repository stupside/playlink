export {};

const FILTERS: chrome.webRequest.RequestFilter = { urls: ["<all_urls>"] };

const EXTENSION = "m3u8";

const REGEX = (ext: string) =>
  new RegExp(`(www:|http:|https:)\/\/(.*\.${ext})`);

chrome.webRequest.onBeforeSendHeaders.addListener(
  ({ url, initiator, ...p }) => {
    if (REGEX(EXTENSION).test(url) === false) return {};

    const query: chrome.tabs.QueryInfo = {
      active: true,
      lastFocusedWindow: true,
    };

    chrome.tabs.query(query).then(([{ id }]) => {
      chrome.tabs.sendMessage(id, {
        initiator,
        content: {
          value: url,
          type: "video",
          subtype: EXTENSION,
        },
      });
    });

    return {};
  },
  FILTERS,
  ["requestHeaders"],
);
