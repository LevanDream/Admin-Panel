import { useInfiniteQuery } from "@tanstack/react-query";
import { postsApi } from "../api";

const LIMIT = 4;

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      postsApi.get({
        page: pageParam,
        limit: LIMIT,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};