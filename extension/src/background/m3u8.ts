import { Storage } from "@plasmohq/storage"
 
const storage = new Storage();

const pattern = /^(www:|http:|https:)\/\/(.*\.m3u8)/gm;

chrome.webRequest.onBeforeSendHeaders.addListener(details => {

    if (pattern.test(details.url)) {

        storage.setItem("m3u8", details.url);
    }

    return {
        cancel: false
    };

}, { urls: ["<all_urls>"] }, ["requestHeaders"]);