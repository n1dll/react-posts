import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "./Card";
import { getPosts, createPost, type Post } from "../api/posts";

export function Posts() {
  const [userId, setUserId] = useState<number>();
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const queryClient = useQueryClient();

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPosts(userId),
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPost({ title: "", body: "", userId: 1 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate(newPost);
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Post</h3>
        <input
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost((prev) => ({ ...prev, body: e.target.value }))}
        />
        <button type="submit">Add Post</button>
      </form>
      <div>
        <label>
          Filter by User ID:
          <input
            type="text"
            value={userId || ""}
            onChange={(e) => setUserId(e.target.value ? Number(e.target.value) : undefined)}
          />
        </label>
      </div>

      <div>
        {posts?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
