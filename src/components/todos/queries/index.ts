import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "../api";
import type { CreateTodoType, TodosType } from "../types";
import { notifications } from "@mantine/notifications";

const USER_KEY = ["users"];

export const useGetTodos = () => {
    return useQuery({
        queryKey: USER_KEY,
        queryFn: todosApi.getTodos,
    });
};

export const useGetTodoId = (id: number | string) => {
    return useQuery({
        queryKey: USER_KEY,
        queryFn: () => todosApi.getTodoId(id),
        enabled: !!id,
    });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateTodoType) => todosApi.createTodo(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEY });
            notifications.show({
                title: "Успешно!",
                message: "Задание добавлено.",
                color: "green",
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка!",
                message: "Ошибка при создании задания",
                color: "red",
            });
        },
    });
};

export const useEditTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: TodosType) => todosApi.editTodo(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEY });
            notifications.show({
                title: "Успешно!",
                message: "Задание обновлено.",
                color: "green",
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка!",
                message: "Ошибка при обновлении задания",
                color: "red",
            });
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number | string) => todosApi.deleteTodo(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEY });
            notifications.show({
                title: "Успешно!",
                message: "Задание удалено.",
                color: "green",
            });
        },
        onError: () => {
            notifications.show({
                title: "Ошибка!",
                message: "Ошибка при удалении задания",
                color: "red",
            });
        },
    });
};