export {};

const FILTERS: chrome.webRequest.RequestFilter = { urls: ["<all_urls>"] };

const REGEX = (ext: string) =>
  new RegExp(`(www|http|https):\/\/(.*)\.(${ext})`);

chrome.webRequest.onBeforeSendHeaders.addListener(
  ({ url, initiator }) => {
    // get ext of url
    const matches = url.match(REGEX("(mp4|m3u8)"));

    if (!matches) return {};

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
          subtype: matches[3],
        },
      });
    });

    return {};
  },
  FILTERS,
  ["requestHeaders"],
);
