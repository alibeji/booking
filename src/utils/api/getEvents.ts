import { userToken } from "../../stores/token";
import { useRecoilValue } from "recoil";

const useGetEvents = (id: string) => {
  const token = useRecoilValue(userToken);

  return async () => {
    const response = await fetch(`https://be-roan.vercel.app/event?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };
};

export default useGetEvents;
