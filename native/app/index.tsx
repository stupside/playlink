import { FC } from "react";
import { WebView } from "react-native-webview";

const Page: FC = () => {
    return <WebView source={{ uri: "https://google.com" }} incognito={true} webviewDebuggingEnabled={true} className="flex-1" />;
};

export default Page;