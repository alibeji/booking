import React, { useState } from "react";
import { Restaurant } from "../../types/restaurant";
import useFetchRestaurants from "../../utils/api/fetchRestaurants";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const RestaurantSelect = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(0);
  const fetchRestaurants = useFetchRestaurants();
  const { data } = useQuery<Restaurant[]>("userRestaurant", fetchRestaurants);

  if (!data?.[0] || data.length < 2) return null;

  const handlechange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(target.value);
    const _restaurantId = data[index]._id;
    if (index === restaurant) return;
    setRestaurant(index);
    router.push(`/admin/${_restaurantId}`);
  };

  return (
    <select value={restaurant} key={restaurant} onChange={handlechange}>
      {data.map((name, index) => (
        <option value={index} key={index}>
          {name.name}
        </option>
      ))}
    </select>
  );
};

export default RestaurantSelect;
