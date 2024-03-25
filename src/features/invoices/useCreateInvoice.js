import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const { mutate: createInv, isPending: isCreating } = useMutation({
=======
  const { mutate: createInv, isLoading: isCreating } = useMutation({
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
    mutationFn: createInvoice,
    onSuccess: () => {
      toast.success("Successfully Added the invoice");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
  return { createInv, isCreating };
}
