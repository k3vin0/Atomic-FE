import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

// The type for the data that will be sent in the POST request
export type IngredientData = {
  Name: string;
  Calories: number;
};

// This function performs the actual API call for posting new ingredients.
async function addIngredients(
  newIngredientData: IngredientData[]
): Promise<IngredientData[]> {
  const { data } = await axios.post<IngredientData[]>(
    "http://192.168.1.13:42069/ingredients",
    newIngredientData
  );
  return data;
}

// This hook can be used for posting new ingredient data with the expected types.
export function useAddIngredients(): UseMutationResult<
  IngredientData[],
  unknown,
  IngredientData[],
  unknown
> {
  return useMutation({
    mutationFn: addIngredients,
    // You can add more options here if needed, such as onSuccess for cache updates
  });
}
