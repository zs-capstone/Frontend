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
        setCookie("email", userResponse.email, { expires });
        setCookie("nickname", userResponse.nickname, { expires });
      } else {
        setCookie("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        setCookie("email", userResponse.email);
        setCookie("nickname", userResponse.nickname);
      }
      router.push("/");
    },
  });
  return mutate;
};
