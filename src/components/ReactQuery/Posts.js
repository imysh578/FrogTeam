import React, { useCallback } from "react";
import { useQueryClient } from "react-query";
import { usePosts } from "../../hooks/usePosts";

interface Props {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}

const Posts = ({ setPostId }: Props) => {
  const queryClient = useQueryClient();

  const { status, data, error } = usePosts();

  const renderByStatus = useCallback(() => {
    switch (status) {
      case "loading":
        return <div>Loading...</div>;
      case "error":
        if (error instanceof Error) {
          return <span>Error: {error.message}</span>;
        }
        break;
      default:
        return (
          <div>
            {data?.map((post) => (
              <p key={post.id}>
                <a
                  onClick={() => setPostId(post.id)}
                  href="#"
                  style={
                    queryClient.getQueryData(["post", post.id])
                      ? {
                          fontWeight: "bold",
                          color: "green",
                        }
                      : {}
                  }
                >
                  {post.title}
                </a>
              </p>
            ))}
          </div>
        );
    }
  }, [status]);

  return (
    <div>
      <h1>Posts</h1>
      {renderByStatus()}
    </div>
  );
};

export default Posts;
