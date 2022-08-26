import { Reservation } from "../../types/reservation";

const postReservation = async (data: Reservation) => {
  const response = await fetch(`https://be-roan.vercel.app/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default postReservation;
