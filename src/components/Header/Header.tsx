import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import { id as restaurantId } from "../../stores/id";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import RestaurantSelect from "../RestaurantSelect/RestaurantSelect";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const id = useRecoilValue(restaurantId);
  const { data } = useQuery(`restaurant-${id}`, () => fetchRestaurantData(id));

  return (
    <div className={styles.header}>
      {router.asPath === "/" ? (
        <p>
          Reservation at <span>{data?.name}</span>
        </p>
      ) : (
        <p>RestoBooking</p>
      )}
      {router.asPath.includes("/admin") && (
        <>
          <Link href={`/admin/${id}/edit`}>Edit</Link>
          <RestaurantSelect />
        </>
      )}
    </div>
  );
}
