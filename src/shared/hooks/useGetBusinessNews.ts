import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

function getQueryKey() {
  return ["businessNews"];
}

export type TNewsArticle = {
  author: string | null;
  content: string | null;
  description: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string | null;
};

// This function performs the actual API call.
async function fetchBusinessNews(): Promise<TNewsArticle[] | null> {
  const { data } = await axios.get<TNewsArticle[]>(
    "http://192.168.1.6:5007/news/business"
  );
  return data as TNewsArticle[];
}

// This hook can be used for fetching data with the expected types.
export function useGetBusinessNews(): UseQueryResult<
  TNewsArticle[] | null,
  unknown
> {
  const queryKey = getQueryKey();

  return useQuery<TNewsArticle[] | null, unknown>({
    queryKey,
    queryFn: fetchBusinessNews,
    // You can add more options here if needed
  });
}
