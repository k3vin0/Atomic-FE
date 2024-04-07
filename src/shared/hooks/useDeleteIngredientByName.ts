import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

// This function performs the actual API call.
async function deleteIngredient(ingredientName: string): Promise<void> {
  await axios.delete(`http://192.168.1.6:42069/ingredients/${ingredientName}`);
}

// This hook can be used for fetching data with the expected types.
export function useDeleteIngredient(): UseMutationResult<
  void,
  unknown,
  string,
  unknown
> {
  return useMutation({
    mutationFn: deleteIngredient,
  });
}
