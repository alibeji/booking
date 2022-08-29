import { restaurantId } from "./../constants/restaurantId";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const id = atom<string>({
  key: "restaurantId",
  default: restaurantId,
  effects_UNSTABLE: [persistAtom],
});
