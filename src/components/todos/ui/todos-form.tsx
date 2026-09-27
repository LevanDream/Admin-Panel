import { Button, Checkbox, Group, Stack, TextInput } from "@mantine/core";
import { ROUTES } from "../../../routes/routes";
import type { CreateTodoType } from "../types";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

type TodoFormProps = {
  onSubmit: (value: CreateTodoType) => void;
  initialValues?: CreateTodoType;
  isLoading?: boolean;
  onCancel?: () => void;
};

export const TodosForm = ({
  initialValues,
  onSubmit,
  isLoading,
  onCancel,
}: TodoFormProps) => {
  const navigate = useNavigate();

  const form = useForm<CreateTodoType>({
    initialValues: initialValues || {
      task: "",
      completed: false,
    },

    validate: {
      task: (value) => {
        if (!value.trim()) {
          return "Введите название задачи";
        }
        if (value.trim().length < 3) {
          return "Название задачи должно содержать минимум 3 символа";
        }
        return null;
      },

      completed: (value) => {
        if (typeof value !== "boolean") {
          return "Некорректный тип значения";
        }
        return null;
      },
    },
  });

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(ROUTES.TODOS);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Task"
          placeholder="Input task"
          {...form.getInputProps("task")}
        />

        <Checkbox
          label="Завершено"
          {...form.getInputProps("completed", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="button"
            color="red"
            variant="light"
            disabled={isLoading}
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button type="submit" loading={isLoading}>
            Сохранить
          </Button>
        </Group>
      </Stack>
    </form>
  );
};