import { Http2ServerRequest } from "http2";

export { }

const pattern = /^(www:|http:|https:)\/\/(.*\.m3u8)/gm;

chrome.webRequest.onBeforeSendHeaders.addListener(details => {

    if (pattern.test(details.url)) {

        console.debug({
            m3u8: details.url
        });

        fetch("/device/feed", {
            method: "POST",
            body: JSON.stringify({
                jwt: "",
                m3u8: details.url
            })
        }).then(console.log).catch(console.log);
    }

    return {
        cancel: false
    };

}, { urls: ["<all_urls>"] }, ["requestHeaders"]);