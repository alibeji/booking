import dayjs from "dayjs";
const year = dayjs().year();

type RestaurantId = string;

const fetchMonth = async (
  id: RestaurantId,
  month: number
): Promise<Record<string, string[]>> => {
  const response = await fetch(
    `https://be-roan.vercel.app//month?year=${year}&month=${month}&restaurant=${id}`
  );

  return response.json();
};

export default fetchMonth;
