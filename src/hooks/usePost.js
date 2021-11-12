import axios from "axios";
import { useQuery } from "react-query";
import { Type } from "./type";

const getPostById = async (id: number): Promise<Type> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export const usePost = (postId: number) => {
  return useQuery(["post", postId], () => getPostById(postId), {
    enabled: !!postId,
  });
};
