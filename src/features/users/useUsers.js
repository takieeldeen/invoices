import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";

export function useUsers() {
  const { data: users, isPending: isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, isLoading };
}
