import { Button, TextField } from "@mui/material";
import React from "react";
import styles from "./Confirmation.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Reservation } from "../../types/reservation";
import { object, string } from "yup";
import { info as atomInfo, step } from "../../stores/steps";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { restaurantId } from "../../constants/restaurantId";
import { useMutation } from "react-query";
import postReservation from "../../utils/api/postReservation";
import { toast } from "react-toastify";

const confirmationSchema = object().shape({
  name: string().required(),
  email: string().email().required(),
  phone: string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8)
    .max(12),
});

export default function Confirmation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<Reservation, "email" | "name" | "phone">>({
    resolver: yupResolver(confirmationSchema),
  });

  const setStep = useSetRecoilState(step);

  const { mutate } = useMutation(postReservation, {
    onSuccess: (data: { cod?: number }) => {
      if (data.cod !== 400) {
        setStep("final");
      } else {
        toast.error("something went wrong");
      }
    },
  });

  const { duration, day, guests, menu, month, time, year } =
    useRecoilValue(atomInfo);

  const callback = (data: Pick<Reservation, "email" | "name" | "phone">) => {
    if (
      duration !== undefined &&
      day !== undefined &&
      year !== undefined &&
      menu !== undefined &&
      guests !== undefined &&
      month !== undefined &&
      time !== undefined &&
      year !== undefined
    ) {
      const reservationData: Reservation = {
        day,
        year,
        menu,
        guests,
        month,
        time,
        duration,
        email: data.email,
        phone: data.phone,
        name: data.name,
        restaurant: restaurantId,
      };
      mutate(reservationData);
    }
  };

  return (
    <>
      <h2 className="title">
        Confirm <span>reservation</span>
      </h2>
      <form className={styles.form} onSubmit={handleSubmit(callback)}>
        <TextField
          required
          {...register("name")}
          variant="standard"
          label="Name"
          error={errors.name ? true : false}
          helperText={errors.name?.message}
        />
        <TextField
          required
          {...register("email")}
          variant="standard"
          label="E-mail"
          error={errors.email ? true : false}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("phone")}
          variant="standard"
          label="Phone Number"
          error={errors.phone ? true : false}
          helperText={errors.phone?.message}
        />
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </form>
    </>
  );
}
