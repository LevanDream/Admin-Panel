import { api } from "../../../api/api";
import type { CreateUser, UsersType } from "../types";

export const usersApi = {
  getUsers: async (): Promise<UsersType[]> => {
    const { data } = await api.get<UsersType[]>("/users");
    return data;
  },

  getUserId: async (id: number | string): Promise<UsersType> => {
    const { data } = await api.get<UsersType>(`/users/${id}`);
    return data;
  },

  createUser: async (body: CreateUser): Promise<UsersType> => {
    const { data } = await api.post("/users", body);
    return data;
  },

  editUser: async ({ id, ...body }: UsersType): Promise<UsersType> => {
    const { data } = await api.put(`/users/${id}`, body);
    return data;
  },

  delete: async (id: number | string): Promise<void> => {
    return await api.delete(`/users/${id}`);
  },
};