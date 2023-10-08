import { useSse } from "~/hooks/sse/useSse";

const SseStatus = () => {

    const { connected } = useSse();

    return <div className="flex m-2">
        {connected === undefined
            ? <Online />
            : connected
                ? <Online />
                : <Offline />
        }
    </div>
};

const Online = () => <span className="w-3 h-3 bg-green-600 rounded-full"></span>;
const Offline = () => <span className="w-3 h-3 bg-red-600 rounded-full"></span>

export default SseStatus;