import { useQuery } from "@tanstack/react-query";
import { checkForAdmin } from "../../services/apiUsers";

export function useCheckAdmin() {
  const { data, isPending } = useQuery({
    queryKey: ["userAdmin"],
    queryFn: checkForAdmin,
  });

  return { data, isPending };
}
