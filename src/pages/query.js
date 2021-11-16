import React, { useState } from "react";

import { QueryClientProvider, QueryClient } from "react-query";
import Posts from "../components/ReactQuery/Posts";
import Post from "../components/ReactQuery/Post";
import Rest from "../components/ReactQuery/Rest";

const queryClient = new QueryClient();

const QueryPage = () => {
  const [postId, setPostId] = useState(-1);
  const [업비트, 업비트변경] = useState(-1);
  return (
    <>
      {/* react-query 쓰려면 이거 주석 해제 해주세요 너무 더러워서 없애놈 ㅈㅅ */}
      <QueryClientProvider client={queryClient}>
        <div>
          react-query
          <Rest />
          {postId > -1 ? (
            <Post postId={postId} setPostId={setPostId} />
          ) : (
            <Posts setPostId={setPostId} />
          )}
        </div>
      </QueryClientProvider>
    </>
  );
};

export default QueryPage;
