import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Successfull registration!");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
  return { signup, isPending };
}
