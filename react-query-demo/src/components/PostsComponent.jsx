import { useState } from "react";
import { useQuery } from "react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  // This local toggle helps you "navigate away and return" without React Router
  const [showPosts, setShowPosts] = useState(true);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery("posts", fetchPosts, {
    // Cache behavior: data stays in cache for 5 minutes
    staleTime: 60 * 1000, // 1 minute considered "fresh"
    cacheTime: 5 * 60 * 1000, // 5 minutes stored in cache after unmount
    refetchOnWindowFocus: false,
  });

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Posts (React Query)</h2>

      {/* Toggle simulates leaving/returning to the component */}
      <button onClick={() => setShowPosts((prev) => !prev)}>
        {showPosts ? "Navigate away" : "Return to posts"}
      </button>

      <button onClick={() => refetch()} style={{ marginLeft: "10px" }}>
        Refetch Posts
      </button>

      {isFetching && <p>Updating...</p>}

      <hr style={{ margin: "16px 0" }} />

      {!showPosts ? (
        <p>You left the posts page. Click “Return to posts”.</p>
      ) : isLoading ? (
        <p>Loading posts...</p>
      ) : isError ? (
        <p style={{ color: "crimson" }}>
          Error: {error?.message || "Something went wrong"}
        </p>
      ) : (
        <ul>
          {posts.slice(0, 10).map((post) => (
            <li key={post.id} style={{ marginBottom: "12px" }}>
              <strong>{post.title}</strong>
              <p style={{ margin: "4px 0" }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}