export const getContent = async (content: string, token: string) => {
  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/contents/${content}`,
    {
      method: "GET",
      headers: {
        [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
      },
    }
  );

  const json = (await response.json()) as {
    value: string;
    type: string;
  };

  return json;
};

export const createContent = async (
  value: string,
  type: string,
  token: string
) => {
  const response = await fetch(`${process.env.PLAYLINK_BACKEND_URL}/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
    },
    body: JSON.stringify({ value, type }),
  });

  const json = await response.json();

  return json;
};
