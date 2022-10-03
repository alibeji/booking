export type Restaurant = {
  _id: string;
  name: string;
  menu: string[];
  address: {
    city: string;
    street: string;
  };
  slots: number;
  closedDays?: number[];
  times: {
    open: string;
    closed: string;
  };
  userId: string;
  cod?: number;
};
