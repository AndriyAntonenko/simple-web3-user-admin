export const whitelist = async (address: string) => {
  if (!process.env.REACT_APP_API_URL)
    throw new Error("REACT_APP_API_URL is not provided");

  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({ address }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.info(response);
  if (response.status >= 400) {
    const json = await response.text();
    throw new Error(`Api error: ${json}`);
  }
};
