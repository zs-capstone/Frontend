import { UseMutateAsyncFunction, useMutation } from "react-query";
import { reissueToken } from "../../apis/auth";
import { IReissueTokenType, IUserType } from "../../types/member";
import { removeCookie, setCookie } from "../../utils/cookieUtils";

export const useReissueToken = (): UseMutateAsyncFunction<
  IUserType,
  unknown,
  IReissueTokenType,
  unknown
> => {
  const { mutateAsync } = useMutation(reissueToken, {
    onSuccess: (data) => {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        grantType: newGrantType,
        email,
        nickname,
        authority,
      } = data;

      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("grantType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("authority");

      if (localStorage.getItem("autoLogin")) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        setCookie("accessToken", newAccessToken, { expires });
        setCookie("refreshToken", newRefreshToken, { expires });
        setCookie("grantType", newGrantType, { expires });
        setCookie("email", email, { expires });
        setCookie("nickname", nickname, { expires });
        setCookie("authority", authority, { expires });
      } else {
        setCookie("accessToken", newAccessToken);
        setCookie("refreshToken", newRefreshToken);
        setCookie("grantType", newGrantType);
        setCookie("email", email);
        setCookie("nickname", nickname);
        setCookie("authority", authority);
      }
    },
  });
  return mutateAsync;
};
