import SseLink from "./SseLink";
import SseLinks from "./SseLinks";
import SseProvider from "./SseProvider";
import SseStatus from "./SseStatus";

export default Object.assign(SseProvider, {
    Status: SseStatus,
    Links: Object.assign(SseLinks, {
        Link: SseLink
    }),
});