import axios from "axios";
import { useQuery } from "react-query";

const getRest = async () => {
  try {
    const { data } = await axios.get(
      "https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=200"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useRest = () => {
  return useQuery({ queryKey: "rest", queryFn: getRest });
};
