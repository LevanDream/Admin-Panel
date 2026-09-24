import { api } from "../../../api/api";
import type { CreateTodoType, TodosType } from "../types";

export const todosApi = {
    getTodos: async (): Promise<TodosType[]> => {
        const { data } = await api.get<TodosType[]>("/todos");
        return data;
    },
    getTodoId: async (id: number | string): Promise<TodosType> => {
        const { data } = await api.get<TodosType>(`/users/${id}`);
        return data;
    },

    createTodo: async (body: CreateTodoType): Promise<TodosType> => {
        const { data } = await api.post("/users", body);
        return data;
    },

    editTodo: async ({ id, ...body }: TodosType): Promise<TodosType> => {
        const { data } = await api.put(`/users/${id}`, body);
        return data;
    },

    deleteTodo: async (id: number | string): Promise<void> => {
        return await api.delete(`/users/${id}`);
    },
};