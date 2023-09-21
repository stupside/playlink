export { }

const pattern = /^(www:|http:|https:)\/\/(.*\.m3u8)/gm;

chrome.webRequest.onBeforeSendHeaders.addListener(details => {

    if (pattern.test(details.url)) {
        
        console.log({
            m3u8: details.url
        });
    }

    return {
        cancel: false
    };

}, { urls: ["<all_urls>"] }, ["requestHeaders"]);