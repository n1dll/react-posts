import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const getPosts = async (userId?: number) => {
  const params = new URLSearchParams({
    _limit: "20",
    _sort: "id",
    _order: "desc",
    ...(userId ? { userId: userId.toString() } : {}),
  });

  const response = await axios.get<Post[]>(`${BASE_URL}/posts?${params}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, "id">) => {
  const response = await axios.post<Post>(`${BASE_URL}/posts`, post);
  return response.data;
};
