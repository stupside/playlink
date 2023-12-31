import type { PlasmoCSConfig } from "plasmo";

import { type FC, useState, useCallback, useEffect } from "react";

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
    handler: string;
  };
};

const Notification: FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    const onMessage = (message: Message) => {
      setMessages((old) => [...old, message]);
    };

    chrome.runtime.onMessage.addListener(onMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onMessage);
    };
  }, []);

  const cast = useCallback(
    async (index: number) => {
      const host = process.env.PLASMO_PUBLIC_PLAYLINK_FRONTEND;

      const params = new URLSearchParams(messages[index].content);

      const url = `${host}/app/caster/cast?${params.toString()}`;

      window.open(url, "_blank");

      setMessages((old) => {
        const messages = [...old];

        delete messages[index];

        return messages;
      });
    },
    [messages],
  );

  if (messages.length === 0) return null;

  return (
    <section className="fixed top-0 font-sans">
      <ul className="flex flex-col m-5 gap-y-3 text-zinc-200">
        {messages.map((message, index) => {
          return (
            <li
              key={index}
              className="flex gap-x-5 bg-zinc-800 rounded px-5 py-5"
            >
              <article>
                <h1 className="text-zinc-500">{message.initiator}</h1>
                <h2 className="text-zinc-400">
                  {message.content.type}/{message.content.handler}
                </h2>
              </article>
              <button
                title="cast"
                className="text-zinc-500 hover:text-zinc-200"
                onClick={async () => {
                  await cast(index);
                }}
              >
                Cast
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Notification;
