import { userToken } from "../../stores/token";
import { useRecoilValue } from "recoil";

const useDeleteReservation = (ReservationId: string) => {
  const token = useRecoilValue(userToken);

  return async () => {
    const response = await fetch(
      `https://be-roan.vercel.app/event/${ReservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  };
};

export default useDeleteReservation;
