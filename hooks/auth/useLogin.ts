import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { login } from "../../apis/auth";
import { ILoginType, IUserType } from "../../types/member";
import { removeCookie, setCookie } from "../../utils/cookieUtils";

export const useLogin = (
  isAutoLogin: boolean
): UseMutateFunction<IUserType, unknown, ILoginType, unknown> => {
  const router = useRouter();

  const { mutate } = useMutation(login, {
    onSuccess: (res) => {
      const { data } = res;
      const { accessToken, refreshToken, userResponse } = data;
      const { email, nickname, isSurvey } = userResponse;

      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("email");
      removeCookie("nickname");

      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);

      if (isAutoLogin) {
        localStorage.setItem("autoLogin", "autoLogin");
        setCookie("accessToken", accessToken, { expires });
        setCookie("refreshToken", refreshToken, { expires });
        setCookie("email", email, { expires });
        setCookie("nickname", nickname, { expires });
      } else {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        setCookie("email", email);
        setCookie("nickname", nickname);
      }
      if (isSurvey) {
        router.push("/");
      } else {
        router.push("/travel/survey");
      }
    },
  });
  return mutate;
};
