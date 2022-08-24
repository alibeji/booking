import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import styles from "./Header.module.scss";

const restaurantId = "62c1a011e95e96a91dbfd023";

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
