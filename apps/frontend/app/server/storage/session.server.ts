import { createCookieSessionStorage, type Session } from "@remix-run/node";

import { type PlaylinkSessionData } from "./types/PlaylinkSessionData";
import { type PlaylinkSessionFlashData } from "./types/PlaylinkSessionFlashData";

const storage = createCookieSessionStorage<
  PlaylinkSessionData,
  PlaylinkSessionFlashData
>({
  cookie: {
    name: "__playlink",
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secrets: [process.env.PLAYLINK_STORAGE_SECRET!],
  },
});

type PlaylinkSession = Session<PlaylinkSessionData, PlaylinkSessionFlashData>;

const fromCookies = async <TResult>(
  request: Request,
  callback: (session: PlaylinkSession) => Promise<TResult>,
): Promise<TResult> => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  return callback(session);
};

const requireValue = <TKey extends keyof PlaylinkSessionData>(
  session: PlaylinkSession,
  key: TKey,
) => {
  const value = session.get(key);

  if (value === undefined) {
    session.flash("error", `Could not resolve ${key} value from session.`);

    throw new Error(`Could not resolve ${key}`);
  }

  return value;
};

const hasValue = <TKey extends keyof PlaylinkSessionData>(
  session: PlaylinkSession,
  key: TKey,
): boolean => {
  return session.has(key);
};

export default Object.assign(storage, {
  hasValue,
  fromCookies,
  requireValue,
});
