import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const { mutate: updateInv, isPending: isUpdating } = useMutation({
=======
  const { mutate: updateInv, isLoading: isUpdating } = useMutation({
>>>>>>> 8cb2b3e681733f6d5994bfef949239a73b023f74
    mutationFn: updateInvoice,
    onSuccess: () => {
      toast.success("Invoice was updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["invoice"],
      });
    },
    onError: () => {
      toast.error("An error occured while updating the invoice");
    },
  });
  return { updateInv, isUpdating };
}
