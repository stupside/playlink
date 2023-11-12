import { Session } from "@remix-run/node";

import storage from "./PlaylinkStorage";

import PlaylinkStorageData from "./PlaylinkStorageData";
import PlaylinkStorageFlashData from "./PlaylinkStorageFlashData";

type PlaylinkSession = Session<PlaylinkStorageData, PlaylinkStorageFlashData>;

const fromCookies = async <TResult>(
  request: Request,
  callback: (session: PlaylinkSession) => Promise<TResult>
): Promise<TResult> => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  return callback(session);
};

const requireValue = <TKey extends keyof PlaylinkStorageData>(
  session: PlaylinkSession,
  key: TKey
) => {
  const value = session.get(key);

  if (value === undefined) {
    session.flash("error", `Could not resolve ${key} value from session.`);

    throw new Error(`Could not resolve ${key}`);
  }

  return value;
};

const hasValue = <TKey extends keyof PlaylinkStorageData>(
  session: PlaylinkSession,
  key: TKey
): boolean => {
  return session.has(key);
};

export default Object.assign(storage, {
  hasValue,
  fromCookies,
  requireValue,
});
