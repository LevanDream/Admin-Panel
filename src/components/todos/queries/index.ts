import { useQuery } from "@tanstack/react-query";
import { todosApi } from "../api";

export const useGetTodos = () => {
    return  useQuery({
        queryKey: ["todos"],
        queryFn: todosApi.getTodos
    });
};