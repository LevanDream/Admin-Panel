import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Loader,
  Stack,
  Table,
  Title,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { AddCircle, Edit, Trash } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useDeleteUser, useGetUsers } from "../queries";

export const UsersContent = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();

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
      onConfirm: () => deleteUser(id),
    });
  };

  const usersList = Array.isArray(users)
    ? users
    : Array.isArray((users as any)?.data)
      ? (users as any).data
      : [];

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
      {!isLoading && !isError && (
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
            {usersList.map((user: any) => (
              <Table.Tr key={user.id}>
                <Table.Td>{user.firstName}</Table.Td>
                <Table.Td>{user.lastName}</Table.Td>
                <Table.Td>{user.age}</Table.Td>
                <Table.Td>{user.userName ?? user.username}</Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>
                  <Flex align={"center"} justify={"end"} gap={"sm"}>
                    <ActionIcon
                      onClick={() => navigate(`/users/edit/${user.id}`)}
                    >
                      <Edit size={20} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => handleDelete(user.id)}>
                      <Trash size={20} />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Stack>
  );
};