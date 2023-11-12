export {};

const pattern = /^(www:|http:|https:)\/\/(.*\.m3u8)/gm;

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (pattern.test(details.url)) {
      const message = {
        initiator: details.initiator,
        url: details.url,
        timestamp: details.timeStamp,
      };

      if (details.tabId >= 0) {
        chrome.tabs.sendMessage(details.tabId, message);
      } else {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, message);
            }
          });
        });
      }
    }

    return {
      cancel: false,
    };
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"],
);
