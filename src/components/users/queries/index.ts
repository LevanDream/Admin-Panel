import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
  });
};