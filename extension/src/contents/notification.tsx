import type { PlasmoCSConfig } from "plasmo";

import { useLayoutEffect, type FC, useState, useCallback } from "react";

import css from "data-text:~/style.css";

export const getStyle = () => {
  const style = document.createElement("style");

  style.textContent = css;

  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
};

type Message = {
  initiator: string;
  content: {
    value: string;
    type: string;
    subtype: string;
  };
};

const Notification: FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useLayoutEffect(() => {
    const onMessage = (message: Message) => {
      setMessages((old) => [...old, message]);
    };

    chrome.runtime.onMessage.addListener(onMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onMessage);
    };
  });

  const cast = useCallback(({ content }: Message) => {
    const host = process.env.PLASMO_PUBLIC_PLAYLINK_FRONTEND;

    const params = new URLSearchParams(content);

    const url = `${host}/app/client/cast?${params.toString()}`;

    window.open(url);
  }, []);

  if (messages.length === 0) return null;

  return (
    <ul className="flex flex-col m-5 gap-y-3 max-w-max">
      {messages.map((message, index) => {
        return (
          <li key={index} className="flex gap-x-5 bg-white rounded px-5 py-5">
            <span className="">{message.content.value}</span>
            <button
              title="cast"
              onClick={() => {
                cast(message);
              }}
            >
              Cast
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Notification;
