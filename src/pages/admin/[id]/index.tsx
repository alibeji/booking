import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Restaurant } from "../../../types/restaurant";
import fetchRestaurantData from "../../../utils/api/fetchRestaurantData";
import useFetchRestaurants from "../../../utils/api/fetchRestaurants";

const Redirect: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchRestaurants = useFetchRestaurants();

  const { data } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  const { data: restaurantList } = useQuery<Restaurant[]>(
    "restaurants",
    fetchRestaurants
  );

  if (!data || !restaurantList) return null;

  if (restaurantList.length < 1) {
    router.push(`/admin/create`);
  } else if (data.menu.length < 1) {
    router.push(`/admin/${id}/menu`);
  }

  return <div>: NextPage</div>;
};

export default Redirect;
