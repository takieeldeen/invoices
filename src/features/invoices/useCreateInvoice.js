import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  const { mutate: createInv, isLoading: isCreating } = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      toast.success("Successfully Added the invoice");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
  return { createInv, isCreating };
}
