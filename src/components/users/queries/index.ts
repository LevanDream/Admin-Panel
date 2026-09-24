import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api";
import { notifications } from "@mantine/notifications";
import type { CreateUser, UsersType } from "../types";

const USER_KEY = ["users"];

export const useGetUsers = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: usersApi.getUsers,
  });
};

export const useGetUserId = (id: number | string) => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: () => usersApi.getUserId(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateUser) => usersApi.createUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY });
      notifications.show({
        title: "Успешно!",
        message: "Пользователь добавлен.",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка!",
        message: "Ошибка при создании пользователя",
        color: "red",
      });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UsersType) => usersApi.editUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY });
      notifications.show({
        title: "Успешно!",
        message: "Пользователь обновлен.",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка!",
        message: "Ошибка при обнавлении пользователя",
        color: "red",
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => usersApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY });
      notifications.show({
        title: "Успешно!",
        message: "Пользователь удаден.",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка!",
        message: "Ошибка при удалении пользователя",
        color: "red",
      });
    },
  });
};