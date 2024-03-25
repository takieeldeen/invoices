import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  const { mutate: updateInv, isPending: isUpdating } = useMutation({
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
