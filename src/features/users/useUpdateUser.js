import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecificUser } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryclient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateSpecificUser,
    onSuccess: () => {
      toast.success("User Updated successfully");
      queryclient.invalidateQueries(["specificUser"]);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateUser };
}
