import { http } from "../../../api/api";
import type { GetPostsParams, PostsResponse, PostType } from "../types";

export const postsApi = {
  get: async ({ page, limit }: GetPostsParams): Promise<PostsResponse> => {
    const { data } = await http.get<PostType[]>("/posts", {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return {
      posts: data,
      nextPage: data.length === limit ? page + 1 : null,
    };
  },
};