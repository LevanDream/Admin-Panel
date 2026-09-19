import {
  ActionIcon,
  Alert,
  Button,
  Checkbox,
  Flex,
  Loader,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { AddCircle, Edit, Trash } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useGetTodos } from "../queries";

export const TodosContent = () => {
  const navigate = useNavigate();
  const { data: todos, isLoading, isError, error } = useGetTodos();

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title order={3}>Все задания</Title>
        <Button
          leftSection={<AddCircle />}
          onClick={() => navigate(ROUTES.CREATE_TODO)}
        >
          Создать
        </Button>
      </Flex>

      {isLoading && (
        <Flex justify="center" py="xl">
          <Loader />
        </Flex>
      )}

      {isError && (
        <Alert color="red" title="Ошибка загрузки">
          {error instanceof Error
            ? error.message
            : "Не удалось загрузить задания"}
        </Alert>
      )}

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Задание</Table.Th>
            <Table.Th>Выполнено?</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {todos?.map((todo) => (
            <Table.Tr key={todo.id}>
              <Table.Td>{todo.id}</Table.Td>
              <Table.Td>{todo.task}</Table.Td>
              <Table.Td>
                <Checkbox checked={todo.completed}/></Table.Td>
              <Table.Td>
                <Flex align={'center'} justify={'end'} gap={'sm'}>
                  <ActionIcon>
                    <Edit size={20} />
                  </ActionIcon>
                  <ActionIcon color="red">
                    <Trash size={20} />
                  </ActionIcon>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

    </Stack>
  );
};
