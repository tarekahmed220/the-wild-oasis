import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCapins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: (newCabinData, id) => createEditCabins(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin Succssfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error("Can't create the cabin, please try again");
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
