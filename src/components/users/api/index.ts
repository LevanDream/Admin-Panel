import { api } from "../../../api/api";
import type { UsersType } from "../types";

export const usersApi = {
  getUsers: async (): Promise<UsersType[]> => {
    const { data } = await api.get<UsersType[]>("/users");
    return data;
  },
};
