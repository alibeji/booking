import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import { restaurantId } from "../../constants/restaurantId";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const { data } = useQuery("restaurants", () =>
    fetchRestaurantData(restaurantId)
  );

  return (
    <div className={styles.header}>
      {router.asPath === "/" ? (
        <p>
          Reservation at <span>{data?.name}</span>
        </p>
      ) : (
        <p>RestoBooking</p>
      )}
    </div>
  );
}
