import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

function getQueryKey() {
  return ["ingredients"];
}

export type TIngredients = {
  Name: string;
  Calories: string;
};

const backendUrl = "http://192.168.1.27:42069/ingredients";
// This function performs the actual API call.
async function fetchIngredients(): Promise<TIngredients[] | null> {
  const { data } = await axios.get<TIngredients[]>(backendUrl);
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
