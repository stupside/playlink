export const hostSession = async () => {
  const response = await fetch(`${process.env.PLAYLINK_BACKEND_URL}/sessions`, {
    method: "POST",
  });

  const json = (await response.json()) as {
    token: string;
    device: number;
    session: number;
  };

  return json;
};

export const getCode = async (token: string, expiry?: number) => {
  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/devices/code?expiry=${
      expiry ?? process.env.PLAYLINK_SESSION_CODE_EXPIRY
    }`,
    {
      method: "GET",
      headers: {
        [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
      },
    }
  );

  const json = (await response.json()) as {
    qr: string;
    key: string;
    code: string;
    expiry: number;
  };

  return json;
};

export const getToken = async (key: string, code: string, name: string) => {
  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/devices/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, code, name }),
    }
  );

  const json = (await response.json()) as {
    value: string;
    device: number;
    session: number;
  };

  return json;
};
