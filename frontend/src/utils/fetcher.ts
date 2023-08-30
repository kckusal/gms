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
      return Promise.reject("Auth token is not configured!");
    }

    const url = new URL(apiRoute, import.meta.env.VITE_API_URL);

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        ...headers,
      },
      ...restInit,
    }).then(async (res) => {
      const responseJson = await res.json();

      if (responseJson.status === 401) {
        window.location.href = "/auth/signout";
      } else if (
        responseJson?.success === false &&
        responseJson?.error?.message
      ) {
        throw Error(responseJson.error.message);
      } else if (responseJson.success === true) {
        return responseJson;
      } else throw responseJson;
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
