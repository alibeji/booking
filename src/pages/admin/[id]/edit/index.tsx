import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import RestaurantForm from "../../../../components/RestaurantForm/RestaurantForm";
import fetchRestaurantData from "../../../../utils/api/fetchRestaurantData";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  if (!data) return null;

  const { address, times, ...props } = data;

  return (
    <div className="container">
      <h2 className="title">
        Edit <span>Restaurant</span>
      </h2>

      <RestaurantForm {...props} {...times} {...address} edit />
    </div>
  );
};

export default Edit;
