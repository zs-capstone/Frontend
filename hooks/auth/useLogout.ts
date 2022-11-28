import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { logout } from "../../apis/auth";
import { removeCookie } from "../../utils/cookieUtils";

export const useLogout = (): UseMutateFunction<
  void,
  unknown,
  void,
  unknown
> => {
  const router = useRouter();

  const { mutate } = useMutation(logout, {
    onMutate: () => {
      router.push("/");
    },
    onSuccess: () => {
      localStorage.removeItem("autoLogin");
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("grantType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("authority");
    },
  });
  return mutate;
};
