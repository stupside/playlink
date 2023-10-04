import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import useLinkRedirection, { LinkType } from "~/hooks/useLink";
import usePlayLinks from "~/hooks/usePlayLinks";

const Links = ({ session }: { session: number }) => {

    const { getUrl } = useLinkRedirection();

    const [links, setLinks] = useState<Array<{ url: string, type: LinkType }>>([]);

    const link = usePlayLinks({
        session
    });

    useEffect(() => {

        if (link) {

            setLinks((old) => [...old, link]);
        }

    }, [link, setLinks]);

    return <ul>
        {links.map((link, index) => {

            const url = getUrl({
                session,
                url: link.url,
                type: link.type
            });

            return url && <li key={index}>
                <MyLink type={link.type} url={link.url} />
            </li>;
        })}
    </ul>
};

const MyLink = ({ url, type }: { url: string, type: LinkType }) => {
    return <Link to={url}>
        {type} {url}
    </Link>;
};

export default Links;