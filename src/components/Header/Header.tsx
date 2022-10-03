import React from "react";
import { useQuery } from "react-query";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import RestaurantSelect from "../RestaurantSelect/RestaurantSelect";
import Link from "next/link";
import { Logo } from "../icons/logo";

export default function Header() {
  const {
    query: { id },
    asPath,
  } = useRouter();

  const { data } = useQuery(
    `restaurant-${id}`,
    () => fetchRestaurantData(id as string),
    {
      enabled: !!id,
    }
  );

  const isAdmin = asPath.includes("/admin");


  return (
    <div className={styles.header}>
      {!isAdmin && (
        <p>
          Reservation at <span>{data?.name}</span>
        </p>
      )}

      {isAdmin && id && (
        <div className={styles.admin}>
          <Logo />
          <StyledLinked id={`/admin/${id}/edit`} label="edit" path={asPath} />

          <StyledLinked id={`/admin/${id}/menu`} label="Menu" path={asPath} />
          <StyledLinked
            id={`/admin/${id}`}
            label="Reservations"
            path={asPath}
          />
          <RestaurantSelect />
        </div>
      )}
    </div>
  );
}

const StyledLinked = ({
  id,
  path,
  label,
}: {
  id: string;
  path: string;
  label: string;
}) => (
  <Link href={id}>
    <span
      style={{
        fontWeight: path === id ? "600" : "initial",
      }}
    >
      {label}
    </span>
  </Link>
);
