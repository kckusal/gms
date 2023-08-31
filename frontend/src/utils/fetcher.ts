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
      return Promise.reject(new Error("Auth token is not configured!"));
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
      if (res.status === 401) {
        window.location.href = "/auth/signout";
      }

      const responseJson = await res.json();
      if (responseJson?.success === false && responseJson?.error?.message) {
        let details = [];

        if (responseJson?.error?.details) {
          let parsedDetails;
          try {
            parsedDetails = JSON.parse(responseJson.error.details);
          } catch (e) {
            parsedDetails = responseJson.error.details;
          }

          if (parsedDetails?.name === "ZodError") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            details =
              parsedDetails?.issues
                ?.map(
                  (item: { path: string[]; message: string }) =>
                    `[${item.path.join(".")}]: ${item?.message}`,
                )
                .filter(Boolean) || [];
          }
        }

        const messageParts = [responseJson.error.message];

        if (details.length > 0) {
          messageParts.push(` » ${details.join(" » ")}`);
        }

        throw Error(messageParts.join(""));
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
