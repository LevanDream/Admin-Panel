import { Card, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useCreateUser } from "../queries";
import type { CreateUser as CreateUserType } from "../types";
import { UsersForm } from "./users-form";

export const CreateUser = () => {
    const navigate = useNavigate();
    const { mutate: createUser, isPending } = useCreateUser();

    const handleSubmit = (values: CreateUserType) => {
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