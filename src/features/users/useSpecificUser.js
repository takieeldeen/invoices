import { useQuery } from "@tanstack/react-query";
import { getSpecificUser } from "../../services/apiUsers";

export function useSpecificUser(id) {
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["specificUser"],
    queryFn: () => getSpecificUser(id),
  });
  return { isPending: isLoading, user };
}
