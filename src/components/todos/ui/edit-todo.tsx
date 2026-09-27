import { Alert, Loader, Modal } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { TodosForm } from "./todos-form";
import { useEditTodo, useGetTodoId } from "../queries";
import { ROUTES } from "../../../routes/routes";
import type { CreateTodoType } from "../types";

export const TodoEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: todo, isLoading: isFetching, isError, error } = useGetTodoId(id || "");
    const { mutate: updateTodo, isPending: isUpdating } = useEditTodo();

    const handleClose = () => {
        navigate(ROUTES.TODOS);
    };

    const handleSubmit = (values: CreateTodoType) => {
        if (!id) return;

        updateTodo(
            { id, ...values },
            {
                onSuccess: () => {
                    handleClose();
                },
            }
        );
    };

    return (
        <Modal
            opened={true}
            onClose={handleClose}
            title="Редактирование задачи"
            centered
        >
            {isFetching && <Loader size="sm" />}

            {isError && (
                <Alert color="red" title="Ошибка загрузки задачи">
                    {error instanceof Error ? error.message : "Ошибка при получении данных"}
                </Alert>
            )}

            {todo && (
                <TodosForm
                    initialValues={{
                        task: todo.task,
                        completed: todo.completed,
                    }}
                    onSubmit={handleSubmit}
                    isLoading={isUpdating}
                    onCancel={handleClose}
                />
            )}
        </Modal>
    );
};