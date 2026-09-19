import { api } from "../../../api/api";
import type { TodosType } from "../types";

export const todosApi = {
    getTodos: async (): Promise<TodosType[]> => {
        const { data } = await api.get<TodosType[]>("/todos");
        return data;
    },
};