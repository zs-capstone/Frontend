import axios, { AxiosRequestConfig } from "axios";
import mem from "mem";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtils";

import { baseUrl } from "./constants";

const config: AxiosRequestConfig = { baseURL: baseUrl, withCredentials: true };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken = getCookie("accessToken");
  const grantType = getCookie("grantType");

  if (accessToken && grantType) {
    config.headers.Authorization = `${grantType} ${accessToken}`;
  }

  return config;
});

const getRefreshToken = mem(
  async (): Promise<string | void> => {
    try {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      const grantType = getCookie("grantType");

      const {
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          grantType: newGrantType,
        },
      } = await axiosInstance.post("/auth/reissue", {
        accessToken,
        refreshToken,
        grantType,
      });

      if (localStorage.getItem("autoLogin")) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        setCookie("accessToken", newAccessToken, { expires });
        setCookie("refreshToken", newRefreshToken, { expires });
        setCookie("grantType", newGrantType, { expires });
      } else {
        setCookie("accessToken", newAccessToken);
        setCookie("refreshToken", newRefreshToken);
        setCookie("grantType", newGrantType);
      }

      return newAccessToken;
    } catch (e) {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("grantType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("authority");
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
