import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../../services/apiInvoices";

export default function useInvoices(filter) {
  const {
    isFetching: isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices(filter),
  });

  return { isLoading, error, data };
}
