import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

function getQueryKey() {
  return ["ingredients"];
}

export type TIngredients = {
  Name: string;
  Calories: string;
};

// This function performs the actual API call.
async function fetchIngredients(): Promise<TIngredients[] | null> {
  const { data } = await axios.get<TIngredients[]>(
    "http://192.168.1.13:42069/ingredients"
  );
  return data as TIngredients[];
}

// This hook can be used for fetching data with the expected types.
export function useGetIngredients(): UseQueryResult<
  TIngredients[] | null,
  unknown
> {
  const queryKey = getQueryKey();

  return useQuery<TIngredients[] | null, unknown>({
    queryKey,
    queryFn: fetchIngredients,
    // You can add more options here if needed
  });
}
