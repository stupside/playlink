import { FC, PropsWithChildren } from "react";

const ClientOnly: FC<PropsWithChildren> = ({ children }) => {

    if (typeof window == "undefined") return null;

    return <>
        {children}
    </>;
};

export default ClientOnly;