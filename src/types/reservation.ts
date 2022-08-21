export type Reservation = {
  restaurant: string;
  duration: "long" | "short";
  time: string;
  year: number;
  month: number;
  day: number;
  email: string;
  phone?: string;
  menu: string;
  name: string;
  guests: number;
};
