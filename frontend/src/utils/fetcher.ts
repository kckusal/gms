if (!import.meta.env.VITE_API_URL) {
  throw new Error("Env variable VITE_API_URL is missing!");
}

const apiFetcher = () => {
  let jwtToken = "";

  const fetchWrapper = (
    apiRoute: string,
    init: RequestInit = {},
    options: { skipToken: boolean } = { skipToken: false },
  ) => {
    const { headers = {}, ...restInit } = init;

    if (!options.skipToken && !jwtToken) {
      throw new Error("Auth token is not configured!");
    }

    return fetch(new URL(apiRoute, import.meta.env.VITE_API_URL), {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        ...headers,
      },
      ...restInit,
    });
  };

  return {
    fetch: fetchWrapper,
    setAuthToken: (jwt: string) => {
      jwtToken = jwt;
    },
  };
};

export default apiFetcher();
