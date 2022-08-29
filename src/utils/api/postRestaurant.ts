import { useRecoilValue } from "recoil";
import { userToken } from "../../stores/token";
import { Restaurant } from "../../types/restaurant";

const usePostRestaurant = () => {
  const token = useRecoilValue(userToken);

  return async (data: Omit<Restaurant, "_id" | "userId" | "menu">) => {
    const response = await fetch(`https://be-roan.vercel.app/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };
};

export default usePostRestaurant;
