import { useRouter } from "next/router";
import { UseMutateFunction, useMutation } from "react-query";
import { membershipWithdrawal } from "../../apis/member";
import { removeCookie } from "../../utils/cookieUtils";

export const useMembershipWithdrawal = (): UseMutateFunction<
  void,
  unknown,
  void,
  unknown
> => {
  const router = useRouter();
  const { mutate } = useMutation(membershipWithdrawal, {
    onSuccess: () => {
      router.push("/");
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
