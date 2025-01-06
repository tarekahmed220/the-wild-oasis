import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCapins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
