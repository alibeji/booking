import React from "react";
import { useQuery } from "react-query";

/* type HeaderProps = {}; */

const fetchRestaurants = async () => {
  const response = await fetch(
    "https://be-roan.vercel.app/restaurant/62c1a011e95e96a91dbfd023"
  );
  console.log(response);
  return response.json();
};

export default function Header() {
  const { data } = useQuery("restaurants", fetchRestaurants);
  console.log(data);
  console.log("hi");

  return <div> Reservation at </div>;
}
