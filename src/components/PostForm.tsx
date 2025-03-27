import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, type Post } from "../api/posts";

export function PostForm() {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: "" });
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPost({ title: "", body: "", userId: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({
      ...newPost,
      userId: Number(newPost.userId),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>
      <input
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
        required
      />
      <textarea
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost((prev) => ({ ...prev, body: e.target.value }))}
        required
      />
      <input
        type="number"
        min="1"
        placeholder="User ID"
        value={newPost.userId}
        onChange={(e) => setNewPost((prev) => ({ ...prev, userId: e.target.value }))}
        required
      />
      <button type="submit">Add Post</button>
    </form>
  );
}
