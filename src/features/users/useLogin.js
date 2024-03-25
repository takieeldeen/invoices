import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials) => loginAPI(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("logged in succefully");
      navigate("/invoices");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { login, isPending };
}
// const queryClient = useQueryClient();
// const navigate = useNavigate();
// const { mutate: login, isLoading } = useMutation({
//   mutationFn: loginAPI,
//   onSuccess: (user) => {
//     queryClient.setQueryData(["user"], user);
//     toast.success("Logged In succefully");
//     navigate("/invoices");
//   },
//   onError: () => {
//     toast.error("Something went wrong!");
//   },
// });
// return { login, isLoading };
