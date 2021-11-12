import React, { useCallback } from "react";
import { useQueryClient } from "react-query";
import { useRest } from "../../hooks/useRest";

interface Props {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}

// { setPostId }: Props
const Rest = () => {
  const queryClient = useQueryClient();

  const { status, data, error } = useRest();

  // console.log(data);

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
            화면에 렌더는 안해놨슴
            {/* {data?.map((post) => (
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
            ))} */}
          </div>
        );
    }
  }, [status]);

  return (
    <div>
      <h1>Coins</h1>
      {renderByStatus()}
    </div>
  );
};

export default Rest;
