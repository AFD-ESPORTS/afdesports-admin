import axiosLib from "axios";

export const api = axiosLib.create({
  baseURL: "https://europe.api.riotgames.com/", //`${VITE_API_URL}:${VITE_API_PORT}`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Riot-Token": process.env.RIOT_API_KEY,
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (originalError) => {
    let error = originalError.response?.error_description;
    if (!error?.error_description) {
      error = {
        user_message: "An unknown error occurred",
        error: originalError,
      };
    }

    return originalError.response;
  }
);
