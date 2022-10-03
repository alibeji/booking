import { userToken } from "../../stores/token";
import { useRecoilValue } from "recoil";
import { Event } from "../../types/event";

const useGetReservation = (ReservationId: string) => {
  const token = useRecoilValue(userToken);

  return async (): Promise<Event> => {
    const response = await fetch(
      `https://be-roan.vercel.app/event/${ReservationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  };
};

export default useGetReservation;
