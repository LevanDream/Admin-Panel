import { useForm } from "@mantine/form";
import type { CreateUser } from "../types";
import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";

type UserFormProps = {
  initialValues?: CreateUser;
  onSubmit: (value: CreateUser) => void;
  isLoading?: boolean;
};

export const UsersForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: UserFormProps) => {
  const navigate = useNavigate();

  const form = useForm<CreateUser>({
    initialValues: initialValues || {
      firstName: "",
      lastName: "",
      age: 0,
      userName: "",
      email: "",
    },
    validate: {
      firstName: (value) => (value ? null : "Введите имя"),
      lastName: (value) => (value ? null : "Введите фамилию"),
      age: (value) => (value > 0 ? null : "Укажите корректный возраст"),
      userName: (value) => (value ? null : "Введите username"),
      email: (value) => (value ? null : "Введите email"),
    },
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Имя"
          placeholder="Иван"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Фамилия"
          placeholder="Иванов"
          {...form.getInputProps("lastName")}
        />
        <NumberInput
          label="Возраст"
          placeholder="25"
          min={1}
          {...form.getInputProps("age")}
        />
        <TextInput
          label="Username"
          placeholder="ivanov"
          {...form.getInputProps("userName")}
        />
        <TextInput
          label="Эл. адрес"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            color="red"
            onClick={() => navigate(ROUTES.USERS)}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading}>
            Сохранить
          </Button>
        </Group>
      </Stack>
    </form>
  );
};