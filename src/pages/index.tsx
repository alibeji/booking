import React from "react";
import type { NextPage } from "next";
import { Button } from "@mui/material";
import Link from "next/link";
const RestaurantSelect: NextPage = () => {
  const restaurants = [{ name: "chez ali", id: "630beb02a4e1be72df787259" }];

  return (
    <div className="container">
      <h2 className="title">
        Please <span>Select</span> a Restaurant
      </h2>

      <div>
        {restaurants.map((restaurant) => (
          <Link href={`/${restaurant.id}`} key={restaurant.id}>
            <Button variant="contained">{restaurant.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSelect;
