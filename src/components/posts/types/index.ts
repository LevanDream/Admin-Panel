export type PostType = {
  id: number;
  title: string;
  body: string;
};

export type GetPostsParams = {
  page: number;
  limit: number;
};

export type PostsResponse = {
  posts: PostType[];
  nextPage: number | null;
};