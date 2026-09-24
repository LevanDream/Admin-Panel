import { ActionIcon, Alert, Button, Checkbox, Flex, Loader, Stack, Table, Text, Title } from "@mantine/core";
import { useDeleteTodo, useGetTodos } from "../queries";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { AddCircle, Edit, Trash } from "iconsax-reactjs";
import { ROUTES } from "../../../routes/routes";

export const TodosContent = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useGetTodos();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDelete = (id: number | string) => {
    modals.openConfirmModal({
      title: "Удаление пользователя",
      centered: true,
      children: (
        <Text size="sm">
          Вы уверены, что хотите удалить этого пользователя? Это действие нельзя
          отменить.
        </Text>
      ),
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteTodo(id),
    });
  };

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title order={3}>Все пользователи</Title>
        <Button
          leftSection={<AddCircle />}
          onClick={() => navigate(ROUTES.CREATE_USER)}
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
            : "Не удалось загрузить пользователей"}
        </Alert>
      )}

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Фамилия</Table.Th>
            <Table.Th>Возраст</Table.Th>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Эл. адрес</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {users?.map((todo) => (
            <Table.Tr key={todo.id}>
              <Table.Td>{todo.id}</Table.Td>
              <Table.Td>{todo.task}</Table.Td>
              <Table.Td><Checkbox checked={todo.completed} /></Table.Td>
              <Table.Td>
                <Flex align={"center"} justify={"end"} gap={"sm"}>
                  <ActionIcon
                    onClick={() => navigate(`/edit-todo/:id/${todo.id}`)}
                  >
                    <Edit size={20} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDelete(todo.id)}>
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