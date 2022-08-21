import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";

const restaurantId = "62c1a011e95e96a91dbfd023";
/* type HeaderProps = {}; */

export default function Header() {
  const { data, status } = useQuery("restaurants", () =>
    fetchRestaurantData(restaurantId)
  );
  console.log(status);
  console.log(data);
  console.log("hi");

  return <div> Reservation at {data?.name}</div>;
}