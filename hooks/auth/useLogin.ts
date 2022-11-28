import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { login } from "../../apis/auth";
import { verifyEmailState } from "../../stores/Auth";
import { ILoginType, IUserType } from "../../types/member";
import { removeCookie, setCookie } from "../../utils/cookieUtils";

export const useLogin = (
  isAutoLogin: boolean
): UseMutateFunction<IUserType, unknown, ILoginType, unknown> => {
  const router = useRouter();
  const setVerifyEmailState = useSetRecoilState<string>(verifyEmailState);

  const { mutate } = useMutation(login, {
    onSuccess: ({
      accessToken,
      refreshToken,
      grantType,
      email,
      nickname,
      authority,
    }) => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("grantType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("authority");

      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);

      if (authority === "ROLE_NOT_PERMITTED") {
        setVerifyEmailState(email);
        router.push("/auth/verify-email");
      } else {
        if (isAutoLogin) {
          localStorage.setItem("autoLogin", "autoLogin");
          setCookie("accessToken", accessToken, { expires });
          setCookie("refreshToken", refreshToken, { expires });
          setCookie("grantType", grantType, { expires });
          setCookie("email", email, { expires });
          setCookie("nickname", nickname, { expires });
          setCookie("authority", authority, { expires });
        } else {
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
          setCookie("grantType", grantType, { expires });
          setCookie("email", email);
          setCookie("nickname", nickname);
          setCookie("authority", authority);
        }
        if (authority === "ROLE_SURVEY") {
          router.push("/travel/survey");
        } else {
          router.push("/");
        }
      }
    },
  });
  return mutate;
};
