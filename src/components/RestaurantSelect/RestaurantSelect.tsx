import React, { useState } from "react";
import { Restaurant } from "../../types/restaurant";
import useFetchRestaurants from "../../utils/api/fetchRestaurants";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

const RestaurantSelect = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(0);
  const fetchRestaurants = useFetchRestaurants();
  const { data } = useQuery<Restaurant[]>("userRestaurant", fetchRestaurants);

  if (!data?.[0] || data.length < 2) return null;

  const handlechange = ({ target }: SelectChangeEvent<number>) => {
    const index = Number(target.value);
    const _restaurantId = data[index]._id;
    if (index === restaurant) return;
    setRestaurant(index);
    router.push(`/admin/${_restaurantId}`);
  };

  return (
    <Select
      variant="standard"
      sx={{ minWidth: 120, maxHeight: "35px" }}
      labelId="restaurant-select-label"
      value={restaurant}
      key={restaurant}
      onChange={handlechange}
    >
      {data.map((name, index) => (
        <MenuItem value={index} key={index}>
          {name.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RestaurantSelect;
