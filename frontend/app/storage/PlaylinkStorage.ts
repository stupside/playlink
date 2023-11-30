import { createCookieSessionStorage } from "@remix-run/node";

import PlaylinkStorageData from "./PlaylinkStorageData";
import PlaylinkStorageFlashData from "./PlaylinkStorageFlashData";

const storage = createCookieSessionStorage<
  PlaylinkStorageData,
  PlaylinkStorageFlashData
>({
  cookie: {
    name: "__playlink",
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secrets: [process.env.PLAYLINK_STORAGE_SECRET!],
  },
});

export default storage;
