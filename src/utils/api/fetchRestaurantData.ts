import { Restaurant } from "./../../types/restaurant";

type restaurantId = string;

const fetchRestaurantData = async (id: restaurantId): Promise<Restaurant> => {
  const response = await fetch(`https://be-roan.vercel.app/restaurant/${id}`);

  return response.json();
};

export default fetchRestaurantData;
