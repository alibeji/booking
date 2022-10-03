import React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import styles from "./RestaurantForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, array, InferType } from "yup";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Restaurant } from "../../types/restaurant";
import usePostRestaurant from "../../utils/api/postRestaurant";
import usePutRestaurant from "../../utils/api/putRestaurant";
import { useRouter } from "next/router";

type CreationSchema = Partial<InferType<typeof creationSchema>> & {
  edit?: boolean;
};

const creationSchema = object({
  name: string().required().max(50),
  city: string().required(),
  street: string().required(),
  closedDays: array(number().min(0).max(6).integer().required()),
  slots: number().min(1).required(),
  open: string()
    .required()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be in HH:mm format"),
  closed: string()
    .required()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be in HH:mm format"),
});

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const RestaurantForm = ({
  city,
  closed,
  closedDays,
  name,
  open,
  slots,
  street,
  edit,
}: CreationSchema) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreationSchema>({
    resolver: yupResolver(creationSchema),
    defaultValues: {
      name,
      city,
      street,
      closedDays,
      slots,
      open,
      closed,
    },
  });

  const router = useRouter();
  const { id } = router.query;
  const postRestaurant = usePostRestaurant();
  const putRestaurant = usePutRestaurant(typeof id === "string" ? id : "");

  const { mutateAsync } = useMutation(
    "change-restaurant",
    edit ? putRestaurant : postRestaurant,
    {
      onSuccess: (data: { cod?: number }) => {
        if (data.cod === 400) {
          toast.error("something went wrong");
        }
      },
    }
  );

  const [selectedDays, setSelectedDays] = useState<
    CreationSchema["closedDays"]
  >(closedDays || []);

  const handleAddDay = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    if (typeof value === "string") return;

    setSelectedDays(value);
  };

  const callback = async ({
    city,
    closed,
    closedDays,
    name,
    open,
    slots,
    street,
  }: CreationSchema) => {
    if (!!name && !!city && !!street && !!slots && !!closed && !!open) {
      const restaurantData: Omit<Restaurant, "_id" | "userId" | "menu"> = {
        name,
        address: {
          city,
          street,
        },
        closedDays,
        slots,
        times: {
          closed,
          open,
        },
      };

      const res = await mutateAsync(restaurantData);
      const { _id: id } = res ?? {};

      if (id) router.push(`/admin/${id}${edit ? "" : "/menu"}`);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={"form"} onSubmit={handleSubmit(callback)}>
        <TextField
          variant="standard"
          label="Restaurant name"
          {...register("name")}
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
        />
        <TextField
          variant="standard"
          label="City"
          {...register("city")}
          error={!!errors?.city?.message}
          helperText={errors?.city?.message}
        />
        <TextField
          variant="standard"
          label="Street"
          {...register("street")}
          error={!!errors?.street?.message}
          helperText={errors?.street?.message}
        />

        <FormControl variant="standard">
          <InputLabel id="demo-multiple-checkbox-label">
            Closing Days
          </InputLabel>
          <Select
            {...register("closedDays")}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            label="Closing Days"
            value={selectedDays}
            renderValue={(selected) =>
              selected.map((item) => weekdays[item]).join(", ")
            }
            onChange={handleAddDay}
          >
            {weekdays.map((day) => (
              <MenuItem value={weekdays.indexOf(day)} key={day}>
                <Checkbox
                  checked={selectedDays?.includes(weekdays.indexOf(day))}
                />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          label="Number of Tables"
          {...register("slots")}
        />
        <TextField
          variant="standard"
          label="Opening time"
          {...register("open")}
          error={!!errors?.open?.message}
          helperText={errors?.open?.message}
        />
        <TextField
          variant="standard"
          label="Closing time"
          {...register("closed")}
        />
        <Button type="submit" variant="contained">
          {edit ? "Edit" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default RestaurantForm;
