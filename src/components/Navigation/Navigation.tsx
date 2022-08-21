import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { info as atomInfo } from "../../stores/steps";
import styles from "./Navigation.module.scss";
import { step } from "../../stores/steps";
import dayjs from "dayjs";

export default function Navigation() {
  const setStep = useSetRecoilState(step);

  const { guests, menu, day, duration, month, time, year } =
    useRecoilValue(atomInfo);

  return (
    <div className={styles.NavigationModule}>
      {guests && (
        <button onClick={() => setStep("guests")}>
          <PeopleOutlineIcon /> {guests}
        </button>
      )}
      {menu && (
        <button onClick={() => setStep("menu")}>
          <RestaurantMenuIcon /> {menu}
        </button>
      )}

      {day && month && year && time && duration && (
        <button>
          <CalendarMonthIcon onClick={() => setStep("date")} />
          {`${dayjs(new Date(year, month, day)).format(
            "D MMMM YYYY"
          )}, ${time}`}
        </button>
      )}
    </div>
  );
}
