import { Reservation } from "./reservation";

export type Steps =
  | "guests"
  | "menu"
  | "date"
  | "conditions"
  | "confirm"
  | "final";

export type Info = Omit<Reservation, "email" | "name" | "phone" | "restaurant">;
