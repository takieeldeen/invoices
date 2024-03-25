import { useMutation } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: logoutAPI,
    onSuccess: () => navigate("/"),
    onError: (err) => toast.error(err.message),
  });
  return { logout, isPending };
}
