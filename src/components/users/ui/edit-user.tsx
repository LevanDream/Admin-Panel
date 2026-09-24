import { Alert, Card, Loader, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useEditUser, useGetUserId } from "../queries";
import type { CreateUser as CreateUserType } from "../types";
import { UsersForm } from "./users-form";

export const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: user, isLoading: isUserLoading, isError } = useGetUserId(id!);
    const { mutate: editUser, isPending: isSaving } = useEditUser();

    if (isUserLoading) return <Loader color="blue" />;
    if (isError || !user) {
        return <Alert color="red">Не удалось загрузить данные пользователя</Alert>;
    }

    const handleSubmit = (values: CreateUserType) => {
        editUser(
            { ...values, id: user.id },
            {
                onSuccess: () => {
                    navigate(ROUTES.USERS || "/users");
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
                key={user.id}
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    userName: user.userName,
                    email: user.email,
                }}
                onSubmit={handleSubmit}
                isLoading={isSaving}
            />
        </Card>
    );
};