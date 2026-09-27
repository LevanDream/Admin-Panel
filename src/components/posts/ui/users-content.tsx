import {
  Alert,
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useGetPosts } from "../queries";

export const PostsContent = () => {
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useGetPosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <Stack align="center">
      {isLoading && (
        <Flex justify="center" py="xl">
          <Loader />
        </Flex>
      )}

      {isError && (
        <Alert color="red" title="Ошибка загрузки">
          {error instanceof Error
            ? error.message
            : "Не удалось загрузить пользователей"}
        </Alert>
      )}
      <Grid>
        {posts?.map((post) => (
          <Grid.Col span={3} key={post.id}>
            <Paper withBorder p={"md"} h={"300px"}>
              <Title order={4}>{post.title.toUpperCase()}</Title>
              <Text>{post.body}</Text>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
      <Button
        style={{ width: "fit-content" }}
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? <Loader size={"xs"} /> : "Ещё"}
      </Button>
    </Stack>
  );
};