import { FC } from "react";
import SseLink from "./SseLink";
import { useSse } from "~/hooks/sse/useSse";
import norigin from "@noriginmedia/norigin-spatial-navigation";

const SseLinks: FC<{ session: number }> = ({ session }) => {

    const { messages } = useSse();

    const { ref, focusKey } = norigin.useFocusable({
        trackChildren: true
    });


    return <norigin.FocusContext.Provider value={focusKey}>
        <ul ref={ref}>
            {messages.map(message => {
                return <li key={message.id}>
                    <SseLink session={session} url={message.url} link={message.id} />
                </li>;
            })}

        </ul>
    </norigin.FocusContext.Provider>;
};

export default SseLinks;