import type { Post } from "../api/posts";
interface CardProps {
  post: Post;
}

export function Card({ post }: CardProps) {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  );
}
