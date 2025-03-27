import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const LOCAL_STORAGE_KEY = "local_posts";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getLocalPosts = (): Post[] => {
  const posts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

const saveLocalPosts = (posts: Post[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

export const getPosts = async (userId?: number) => {
  const params = new URLSearchParams({
    _limit: "20",
    _sort: "id",
    _order: "desc",
    ...(userId ? { userId: userId } : undefined),
  });

  const response = await axios.get<Post[]>(`${BASE_URL}/posts?${params}`);
  const serverPosts = response.data;
  const localPosts = getLocalPosts();

  const filteredLocalPosts = userId
    ? localPosts.filter((post) => post.userId === userId)
    : localPosts;

  return [...filteredLocalPosts, ...serverPosts].slice(0, 20);
};

export const createPost = async (post: Omit<Post, "id">) => {
  const localPosts = getLocalPosts();
  const newPost: Post = {
    ...post,
    id: Date.now(), // Use timestamp as unique ID
  };

  const updatedPosts = [newPost, ...localPosts];
  saveLocalPosts(updatedPosts);

  return newPost;
};
