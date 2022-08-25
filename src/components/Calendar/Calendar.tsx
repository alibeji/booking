import React, { useState } from "react";
import ReactCalendar, { CalendarTileProperties } from "react-calendar";
import { useQueries } from "react-query";
import styles from "./Calendar.module.scss";
import fetchMonth from "../../utils/api/fetchMonth";
import dayjs from "dayjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { info as atomInfo } from "../../stores/steps";
import { step } from "../../stores/steps";

const restaurantId = "62c1a011e95e96a91dbfd023";
const today = dayjs();
const maxDate = dayjs().add(2, "month").endOf("month").toDate();

const months = [
  today.month(),
  today.add(1, "month").month(),
  today.add(2, "month").month(),
];

export default function Calendar() {
  const data = useQueries(
    months.map((month) => {
      return {
        queryKey: ["user", month],
        queryFn: () => fetchMonth(restaurantId, month),
      };
    })
  );

  const [duration, setDuration] = useState<"short" | "long">("short");
  const setStep = useSetRecoilState(step);
  const [info, setInfo] = useRecoilState(atomInfo);

  const [date, setDate] = useState(
    info.year && info.month && info.day
      ? new Date(info.year, info.month, info.day)
      : today.toDate()
  );

  const _date = dayjs(date);
  const day = _date.date();
  const month = _date.month();
  const year = _date.year();
  const monthIndex = months.findIndex((_month) => _month === month);
  const availableTimes = data?.[monthIndex].data?.[day];

  const handleClickDay = (value: Date) => {
    setDate(value);
  };

  const handleSelectTime = (time: string) => {
    setInfo({
      ...info,
      duration,
      time,
      day,
      month,
      year,
    });
    setStep("conditions");
  };

  const availableDates = ({ date }: CalendarTileProperties) => {
    if (date.getTime() < dayjs().toDate().getTime()) return "";

    const currentMonth = dayjs(date).month();
    const index = months.findIndex((month) => month === currentMonth);
    const daysInMonth = data[index]?.data;

    if (!daysInMonth) return "";

    if (Object.keys(daysInMonth).includes(dayjs(date).date().toString())) {
      return "greenTile";
    }

    return "redTile";
  };

  const handleDuration = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === "short" || value === "long") setDuration(value);
  };

  if (
    data[0].status !== "success" &&
    data[1].status !== "success" &&
    data[2].status !== "success"
  )
    return null;

  return (
    <div className={styles.calendarWrapper}>
      <ReactCalendar
        className={styles["react-calendar"]}
        maxDate={maxDate}
        minDate={today.toDate()}
        tileClassName={availableDates}
        onClickDay={handleClickDay}
        value={date}
      />
      <div className={styles.legendWrapper}>
        <p>
          <div className={styles.greenLegend} />
          Slots available
        </p>
        <p>
          <div className={styles.redLegend} />
          No Slots available
        </p>
      </div>

      <div className={styles.durationSelector}>
        <p className="title">
          Please <span>select</span>
        </p>
        <select name="duration" onChange={handleDuration} value={duration}>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>
      </div>
      <div className={styles.timesWrapper}>
        {availableTimes?.map((_time) => {
          const formattedTime = dayjs(_time).format("HH:mm");

          return (
            <button
              key={_time}
              value={_time}
              onClick={() => handleSelectTime(formattedTime)}
              className={
                info.time === formattedTime && day === info.day
                  ? styles.selectedTime
                  : ""
              }
            >
              {formattedTime}
            </button>
          );
        })}
      </div>
    </div>
  );
}
