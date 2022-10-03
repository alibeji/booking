import { useRecoilValue } from "recoil";
import jwt_decode from "jwt-decode";
import { userToken } from "../../stores/token";

export const useUserInfo = () => {
  const token = useRecoilValue(userToken);
  if (token) return jwt_decode(token);

  return undefined;
};
