import { useNavigate, useParams } from "react-router-dom";
import { useEditTodo, useGetTodoId } from "../queries";
import { Alert, Card, Loader, Title } from "@mantine/core";
import type { CreateTodoType } from "../types";
import { ROUTES } from "../../../routes/routes";
import { UsersForm } from "../../users/ui/users-form";

export const TodoEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: todo, isLoading: isUserLoading, isError } = useGetTodoId(id!);
    const { mutate: editTodo, isPending: isSaving } = useEditTodo();

    if (isUserLoading) return <Loader color="blue" />;
    if (isError || !todo) {
        return <Alert color="red">Не удалось загрузить данные пользователя</Alert>;
    }

    const handleSubmit = (values: Omit<CreateTodoType, "id">) => {
        editTodo(
            { ...values, id: todo.id },
            {
                onSuccess: () => {
                    navigate(ROUTES.TODOS || "/todos");
                },
            }
        );
    };



    return (
        <Card withBorder padding="lg" radius="md">
            <Title order={3} mb="lg">
                Редактировать пользователя
            </Title>
            <UsersForm
                initialValues={{
                    task: todo?.task,
                    completed: todo?.completed,
                }}
                onSubmit={handleSubmit}
                isLoading={isSaving}
            />
        </Card>
    );
};