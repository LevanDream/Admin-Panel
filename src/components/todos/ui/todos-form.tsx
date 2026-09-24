import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { ROUTES } from "../../../routes/routes";
import type { CreateTodoType } from "../types";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

type TodoFormProps = {
  onSubmit: (value: Omit<CreateTodoType, "id">) => void;
  initialValues?: Omit<CreateTodoType, "id">;
  isLoading?: boolean;
};

export const TodosForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: TodoFormProps) => {
  const navigate = useNavigate();

  const form = useForm<Omit<CreateTodoType, 'id'>>({
    initialValues: initialValues || {
      task: "",
      completed: false,
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