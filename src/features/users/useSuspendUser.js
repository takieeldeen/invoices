import { useMutation } from "@tanstack/react-query";

export function useSuspendUser() {
  const { mutate: suspend, isMutating: suspending } = useMutation({
    mutationFn: () => {},
  });
}
