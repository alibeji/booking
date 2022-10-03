import { useRecoilValue } from "recoil";
import { userToken } from "../../stores/token";

const usePostAdminReservation = () => {
  const token = useRecoilValue(userToken);

  return async (data) => {
    const response = await fetch(`https://be-roan.vercel.app/event`, {
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

export default usePostAdminReservation;
