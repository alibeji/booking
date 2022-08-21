import { Info, Steps } from "./../types/steps";
import { atom } from "recoil";

export const step = atom<Steps>({
  key: "step",
  default: "guests", // default value (aka initial value)
});

export const info = atom<Partial<Info>>({
  key: "info",
  default: {},
});
