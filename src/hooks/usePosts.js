import axios from "axios";
import { useQuery } from "react-query";
import { Type } from "./type";

const getPosts = async (): Promise<Array<Type>> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

export const usePosts = () => {
  return useQuery("posts", getPosts);
};
