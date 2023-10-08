import { FC } from "react";
import SseLink from "./SseLink";
import { useSse } from "~/hooks/sse/useSse";

const SseLinks: FC<{ session: number }> = ({ session }) => {

    const { messages } = useSse();

    return <ul>

        {messages.map(message => {

            return <li key={message.id}>
                <SseLink session={session} url={message.url} link={message.id} />
            </li>;
        })}
    </ul>;
};

export default SseLinks;