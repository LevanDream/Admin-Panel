import { useNavigate } from "react-router-dom";
import { useCreateTodo } from "../queries";
import type { CreateTodoType } from "../types";
import { ROUTES } from "../../../routes/routes";
import { Card, Title } from "@mantine/core";
import { UsersForm } from "./todos-form";

export const CreateTodo = () => {
    const navigate = useNavigate();
    const { mutate: createUser, isPending } = useCreateTodo();

    const handleSubmit = (values: CreateTodoType) => {
        createUser(values, {
            onSuccess: () => {
                navigate(ROUTES.USERS);
            },
        });
    };

    return (
        <Card withBorder padding="lg" radius="md">
            <Title order={3} mb="lg">
                Создать пользователя
            </Title>
            <UsersForm onSubmit={handleSubmit} isLoading={isPending} />
        </Card>
    );
};