import { useNavigate } from "react-router-dom";
import { useCreateTodo } from "../queries";
import type { CreateTodoType } from "../types";
import { ROUTES } from "../../../routes/routes";
import { Card, Title } from "@mantine/core";
import { TodosForm } from "./todos-form";

export const CreateTodo = () => {
    const navigate = useNavigate();
    const { mutate: createTodo, isPending } = useCreateTodo();

    const handleSubmit = (values: CreateTodoType) => {
        createTodo(values, {
            onSuccess: () => navigate(ROUTES.TODOS),
        });
    };

    return (
        <Card withBorder padding="lg" radius="md">
            <Title order={3} mb="lg">
                Создать задачу
            </Title>
            <TodosForm onSubmit={handleSubmit} isLoading={isPending} />
        </Card>
    );
};