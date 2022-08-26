import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import { restaurantId } from "../../constants/restaurantId";
import styles from "./Header.module.scss";

export default function Header() {
  const { data } = useQuery("restaurants", () =>
    fetchRestaurantData(restaurantId)
  );

  return (
    <div className={styles.header}>
      <p>
        Reservation at <span>{data?.name}</span>
      </p>
    </div>
  );
}
