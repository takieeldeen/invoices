import { useQuery } from "@tanstack/react-query";
import { getMovements } from "../../services/apiInvoices";

export function useMovements() {
  const { data, isPending } = useQuery({
    queryKey: ["movements"],
    queryFn: getMovements,
  });
  return { data, isPending };
}
