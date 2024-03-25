import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUsers";

export function useUser() {
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
