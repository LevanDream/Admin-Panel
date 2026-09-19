import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Loader,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { AddCircle, Edit, Trash } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useGetUsers } from "../queries";

export const UsersContent = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useGetUsers();


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
            <Table.Th>ID</Table.Th>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Фамилия</Table.Th>
            <Table.Th>Возраст</Table.Th>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Эл. адрес</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {users?.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.firstName}</Table.Td>
              <Table.Td>{user.lastName}</Table.Td>
              <Table.Td>{user.age}</Table.Td>
              <Table.Td>{user.userName}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>
                <Flex align={'center'} justify={'end'} gap={'sm'}>
                  <ActionIcon>
                    <Edit size={20}/>
                  </ActionIcon>
                  <ActionIcon color="red">
                    <Trash size={20}/>
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
