import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice } from "../../services/apiInvoices";
import { FaZhihu } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteInvoice() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { mutate: deleteInv, isLoading: isDeleting } = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["invoices"],
      });
      navigate(-1);
      toast.success("Succefully deleted the invoice.");
    },
    onError: (err) => toast.error("Failed to delete the invoice."),
  });
  return { isDeleting, deleteInv };
}
