import { ActionIcon, Alert, Button, Checkbox, Flex, Loader, Modal, Stack, Table, Text, Title } from "@mantine/core";
import { useDeleteTodo, useGetTodos, useCreateTodo } from "../queries";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { AddCircle, Edit, Trash } from "iconsax-reactjs";
import { useDisclosure } from "@mantine/hooks";
import { TodosForm } from "./todos-form";
import type { CreateTodoType } from "../types";

export const TodosContent = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useGetTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();

  const [opened, { open, close }] = useDisclosure(false);

  const handleCreateSubmit = (values: CreateTodoType) => {
    createTodo(values, {
      onSuccess: () => {
        close();
      },
    });
  };

  const handleDelete = (id: number | string) => {
    modals.openConfirmModal({
      title: "Удаление задачи",
      centered: true,
      children: (
        <Text size="sm">
          Вы уверены, что хотите удалить эту задачу? Это действие нельзя
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
        <Title order={3}>Все задачи</Title>
        <Button
          leftSection={<AddCircle />}
          onClick={open}
        >
          Создать
        </Button>
      </Flex>

      <Modal
        opened={opened}
        onClose={close}
        title="Создание задачи"
        centered
      >
        <TodosForm
          onSubmit={handleCreateSubmit}
          isLoading={isCreating}
          onCancel={close}
        />
      </Modal>

      {isLoading && (
        <Flex justify="center" py="xl">
          <Loader />
        </Flex>
      )}

      {isError && (
        <Alert color="red" title="Ошибка загрузки">
          {error instanceof Error
            ? error.message
            : "Не удалось загрузить задачи"}
        </Alert>
      )}

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Task</Table.Th>
            <Table.Th>Completed ?</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {users?.map((todo) => (
            <Table.Tr key={todo.id}>
              <Table.Td>{todo.task}</Table.Td>
              <Table.Td><Checkbox checked={todo.completed} readOnly /></Table.Td>
              <Table.Td>
                <Flex align={"center"} justify={"end"} gap={"sm"}>
                  <ActionIcon
                    onClick={() => navigate(`/todos/edit/${todo.id}`)}
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