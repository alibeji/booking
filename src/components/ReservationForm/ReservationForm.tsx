import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { object, string, number, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDeleteReservation from "../../utils/api/deleteReservation";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import customParseFormat from "dayjs/plugin/customParseFormat";
import usePostAdminReservation from "../../utils/api/postAdminReservation";
dayjs.extend(customParseFormat);

type ReservationData = InferType<typeof ReservationFormSchema> & {
  duration: "short" | "long";
};

const ReservationFormSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: number().typeError("Phone must be a number"),
  date: string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "must be in dd/mm/yyyy format"
    )
    .when("reservationId", {
      is: false,
      then: string().required(),
    }),
  time: string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be in HH:mm format")
    .when("reservationId", {
      is: false,
      then: string().required(),
    }),
  guests: number()
    .required()
    .integer()
    .min(1)
    .max(12)
    .typeError("Please enter a number"),
  menu: string().required(),
  duration: string().required(),
});

type ReservationFormProps = {
  reservationId?: string;
  id: string;
  data?: Omit<InferType<typeof ReservationFormSchema>, "time"> & {
    endTime: string;
  };
};

const ReservationForm = ({ id, reservationId, data }: ReservationFormProps) => {
  const router = useRouter();

  const { data: info } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  const menus = info?.menu;
  const [menu, setMenu] = useState("");
  const [duration, setDuration] = useState("short");

  const handleMenuChange = ({ target }: SelectChangeEvent<string>) => {
    setMenu(target.value);
  };

  const handleChangeDuration = ({ target }: SelectChangeEvent<string>) => {
    setDuration(target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof ReservationFormSchema>>({
    resolver: yupResolver(ReservationFormSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      guests: data?.guests,
    },
  });

  const deleteReservation = useDeleteReservation(
    typeof reservationId === "string" ? reservationId : ""
  );

  const postAdminReservation = usePostAdminReservation();

  const { mutate } = useMutation(
    reservationId ? deleteReservation : postAdminReservation,
    {
      onSuccess: (data: { cod?: number }) => {
        if (data.cod === 400) {
          toast.error("something went wrong");
        }
      },
    }
  );

  const deleteCallback = () => {
    mutate(null);
    router.push(`/admin/${id}`);
  };

  const sendCallback = ({
    date,
    duration,
    email,
    guests,
    menu,
    name,
    phone,
    time,
  }: ReservationData) => {
    const reservationData = {
      restaurant: id,
      duration: duration,
      time,
      startDate: dayjs(date, "DD-MM-YYYY").toDate(),
      phone,
      name,
      menu,
      guests,
      email,
    };
    mutate(reservationData);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(reservationId ? deleteCallback : sendCallback)}
      style={{ rowGap: "1rem" }}
    >
      <FormControl variant="standard">
        <InputLabel>Name</InputLabel>
        <Input
          {...register("name")}
          readOnly={!!reservationId}
          error={!!errors.name}
        />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Email</InputLabel>
        <Input
          {...register("email")}
          readOnly={!!reservationId}
          error={!!errors.email}
        />
        {errors.email && (
          <FormHelperText>{errors.email.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Phone</InputLabel>
        <Input
          {...register("phone")}
          readOnly={!!reservationId}
          error={!!errors.phone}
        />
        {errors.phone && (
          <FormHelperText>{errors.phone.message}</FormHelperText>
        )}
      </FormControl>
      {!reservationId ? (
        <FormControl variant="standard">
          <InputLabel>Date</InputLabel>
          <Input
            {...register("date")}
            error={!!errors.date}
            placeholder="dd/mm/yyyy"
          />
          {errors.date && (
            <FormHelperText>{errors.date.message}</FormHelperText>
          )}
        </FormControl>
      ) : (
        <FormControl variant="standard">
          <InputLabel>Date</InputLabel>
          <Input
            readOnly
            value={reservationId && dayjs(data?.date).format("dddd D MMM YYYY")}
          />
        </FormControl>
      )}
      {!reservationId ? (
        <div>
          <FormControl variant="standard">
            <InputLabel>Time</InputLabel>
            <Input {...register("time")} error={!!errors.time} />
            {errors.time && (
              <FormHelperText>{errors.time.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="duration">Duration</InputLabel>
            <Select
              {...register("duration")}
              labelId="duration"
              value={duration}
              label="Duration"
              onChange={handleChangeDuration}
            >
              <MenuItem value="short">Short</MenuItem>
              <MenuItem value="long">Long</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <p>{`From ${dayjs(data?.date).format("HH:mm")} to ${dayjs(
          data?.endTime
        ).format("HH:mm")}`}</p>
      )}
      <FormControl variant="standard">
        <InputLabel id="menu">Menu</InputLabel>
        <Select
          {...register("menu")}
          labelId="menu"
          value={reservationId ? data?.menu : menu}
          readOnly={!!reservationId}
          onChange={handleMenuChange}
          error={!!errors.menu}
        >
          {!reservationId && menus ? (
            menus.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={data?.menu}>{data?.menu}</MenuItem>
          )}
        </Select>
        {errors.menu && <FormHelperText>{errors.menu.message}</FormHelperText>}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Number of guests</InputLabel>
        <Input
          {...register("guests")}
          readOnly={!!reservationId}
          error={!!errors.guests}
        />
        {errors.guests && (
          <FormHelperText>{errors.guests.message}</FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        color={reservationId ? "error" : "primary"}
        type="submit"
        style={{ marginTop: "1.5rem", alignSelf: "center" }}
      >
        {reservationId ? "DELETE" : "ADD"}
      </Button>
    </form>
  );
};

export default ReservationForm;
