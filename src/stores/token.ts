import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userToken = atom<string>({
  key: "userToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
