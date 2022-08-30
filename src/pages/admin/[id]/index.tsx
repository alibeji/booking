import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Restaurant } from "../../../types/restaurant";
import fetchRestaurantData from "../../../utils/api/fetchRestaurantData";
import useFetchRestaurants from "../../../utils/api/fetchRestaurants";
import useGetEvents from "../../../utils/api/getEvents";
import Timeline, { TimelineItemBase } from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import dayjs from "dayjs";

type Events = {
  _id: string;
  group: number;
  startDate: string;
  endDate: string;
  name: string;
  menu: string;
  guests: number;
  email: string;
  phone: number;
  restaurant: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const CalendarPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchRestaurants = useFetchRestaurants();
  const getEvents = useGetEvents(typeof id === "string" ? id : "");
  const { data: events } = useQuery(`events-${id}`, () => getEvents());

  const { data } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  const { data: restaurantList } = useQuery<Restaurant[]>(
    "restaurants",
    fetchRestaurants
  );

  if (!data || !restaurantList || !events) return null;

  if (restaurantList.length < 1) {
    router.push(`/admin/create`);
  } else if (data.menu.length < 1) {
    router.push(`/admin/${id}/menu`);
  }

  const groups = Array.from({ length: data.slots }, (_, i) => {
    return { id: i + 1, title: `Table ${i + 1}` };
  });

  const items = events.map(
    ({ _id, group, name: title, startDate, endDate, guests }: Events) => {
      const item: TimelineItemBase<Date> = {
        id: _id,
        group,
        title: `${title} table of ${guests}`,
        start_time: dayjs(startDate).toDate(),
        end_time: dayjs(endDate).toDate(),
        canMove: false,
      };

      return item;
    }
  );

  return (
    <div className="">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={dayjs().add(-12, "hour").toDate()}
        defaultTimeEnd={dayjs().add(12, "hour").toDate()}
        onItemSelect={(itemId) => {
          router.push(`/admin/${id}/reservation/${itemId}`);
        }}
      />
    </div>
  );
};

export default CalendarPage;
