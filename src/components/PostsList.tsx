import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";
import { getPosts, Post } from "../api/posts";
import { useDebounce } from "../hooks/useDebounce";

export function PostsList() {
  const [userId, setUserId] = useState<number>();
  const debouncedUserId = useDebounce(userId, 300);

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", debouncedUserId],
    queryFn: () => getPosts(debouncedUserId ? Number(debouncedUserId) : undefined),
  });

  return (
    <div className="posts-list">
      <h2>Posts</h2>
      <div>
        <label>Filter by User ID:</label>
        <input
          type="number"
          min="1"
          value={userId || ""}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />

        {error && <div style={{ marginTop: "1rem" }}>Error: {error.message}</div>}
        {isPending && <div style={{ marginTop: "1rem" }}>Loading...</div>}

        <div className="posts-container">
          {posts?.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
