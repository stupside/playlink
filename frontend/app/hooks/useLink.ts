export type LinkVideoType = "mp4" | "m3u8";

export type LinkType = LinkVideoType

const useLinkRedirection = () => {

    const getUrl = ({ session, type, url }: { session: number, type: LinkType, url: string }) => {

        const base = `/session/${session}`;

        switch (type) {
            case "m3u8": return (`${base}/video/${type}/${url}`);
            case "mp4": return (`${base}/video/${type}/${url}`);
            default:
                break;
        };
    };

    return {
        getUrl
    };
};

export default useLinkRedirection;