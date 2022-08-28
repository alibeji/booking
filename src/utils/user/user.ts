import { useRecoilValue } from "recoil";
import jwt_decode from "jwt-decode";
import { RecoilState } from "recoil";

export const useUserInfo = (atomToken: RecoilState<string>) => {
  const token = useRecoilValue(atomToken);
  const decoded = jwt_decode(token);

  return decoded;
};
