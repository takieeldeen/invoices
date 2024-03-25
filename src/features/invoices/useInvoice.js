import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../../services/apiInvoices";

export default function useInvoice(id) {
  const {
    isFetching,
    isPending: isLoading,
    error,
    data: invoiceData,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: () => getInvoice(id),
  });

  return { isFetching, isLoading, error, invoiceData };
}
