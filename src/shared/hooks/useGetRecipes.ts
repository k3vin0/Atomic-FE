import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

function getQueryKey() {
  return ["recipes"];
}
type TRecipes = {
  Name: string;
  Ingredients: TIngredients[];
};
type TIngredients = {
  ObjectID: string;
  Name: string;
  string: number;
};

// This function performs the actual API call.
async function fetchRecipes(): Promise<TRecipes[] | null> {
  const { data } = await axios.get<TRecipes[]>(
    "http://192.168.1.6:42069/recipes"
  );
  return data as TRecipes[];
}

// This hook can be used for fetching data with the expected types.
export function useGetRecipes(): UseQueryResult<TRecipes[] | null, unknown> {
  const queryKey = getQueryKey();

  return useQuery<TRecipes[] | null, unknown>({
    queryKey,
    queryFn: fetchRecipes,
    // You can add more options here if needed
  });
}
