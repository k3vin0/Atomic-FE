import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export type TIngredients = {
  Name: string;
  Calories: number;
};

// Function to call the API with the constructed payload
async function updateIngredient(
  id: string,
  updateData: Partial<TIngredients>
): Promise<void> {
  await axios.put(`http://192.168.1.6:42069/ingredients/${id}`, updateData);
}

// Hook to use the update function, assuming an `id` is used to identify the ingredient
export function useUpdateIngredient(): UseMutationResult<
  void,
  unknown,
  { id: string; data: Partial<TIngredients> },
  unknown
> {
  return useMutation({
    mutationFn: ({ id, data }) => updateIngredient(id, data),
  });
}
