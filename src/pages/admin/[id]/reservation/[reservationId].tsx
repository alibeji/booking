import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import useGetReservation from "../../../../utils/api/getReservation";
import { useQuery } from "react-query";
import ReservationForm from "../../../../components/ReservationForm/ReservationForm";
import { Event } from "../../../../types/event";

const Reservation: NextPage = () => {
  const router = useRouter();
  const { id, reservationId } = router.query;

  const getReservation = useGetReservation(
    typeof reservationId === "string" ? reservationId : ""
  );

  const { data: _data } = useQuery<Event>(`reservation-${id}`, () =>
    getReservation()
  );

  if (!_data) return null;

  const {
    email,
    menu,
    phone,
    guests,
    startDate: date,
    endDate: endTime,
    name,
  } = _data;

  return (
    <div className="container">
      <h2 className="title">
        <span>Reservation</span> Details
      </h2>
      {typeof id === "string" && typeof reservationId === "string" && (
        <ReservationForm
          id={id}
          reservationId={reservationId}
          data={{ email, menu, phone, guests, date, endTime, name }}
        />
      )}
    </div>
  );
};

export default Reservation;
