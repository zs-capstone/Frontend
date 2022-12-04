import axios, { AxiosRequestConfig } from "axios";
import mem from "mem";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtils";

import { baseUrl } from "./constants";

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken = getCookie("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const getRefreshToken = mem(
  async (): Promise<string | void> => {
    try {
      const refreshToken = getCookie("refreshToken");
      const {
        data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      } = await axiosInstance.get("/auth/reissue", {
        headers: {
          RefreshToken: refreshToken,
        },
      });

      if (localStorage.getItem("autoLogin")) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        setCookie("accessToken", newAccessToken, { expires });
        setCookie("refreshToken", newRefreshToken, { expires });
      } else {
        setCookie("accessToken", newAccessToken);
        setCookie("refreshToken", newRefreshToken);
      }

      return newAccessToken;
    } catch (e) {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("email");
      removeCookie("nickname");
    }
  },
  { maxAge: 1000 }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    if (status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true;
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(config);
    }

    return Promise.reject(err);
  }
);
