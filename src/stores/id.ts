import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const id = atom<string>({
  key: "restaurantId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
