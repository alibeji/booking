import { useRecoilValue } from "recoil";
import { userToken } from "../../stores/token";
import { Restaurant } from "../../types/restaurant";

const usePutRestaurant = (id: string) => {
  const token = useRecoilValue(userToken);

  return async (
    data: Omit<Restaurant, "_id" | "userId" | "menu"> | Pick<Restaurant, "menu">
  ) => {
    const response = await fetch(
      `https://be-roan.vercel.app/restaurant/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  };
};

export default usePutRestaurant;
