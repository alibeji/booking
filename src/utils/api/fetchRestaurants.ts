import { useRecoilValue } from "recoil";
import { userToken } from "../../stores/token";

const useFetchRestaurants = () => {
  const token = useRecoilValue(userToken);

  return async () => {
    const response = await fetch(`https://be-roan.vercel.app/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };
};

export default useFetchRestaurants;
