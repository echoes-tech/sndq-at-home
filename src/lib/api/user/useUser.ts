import { urlParseParams } from "@/lib/utils/helper";
import { apiClient } from "../apiClient";
import { useQuery } from "@tanstack/react-query";

const getListUser = async (params: Record<string, string>) => {
  const queryParams = urlParseParams(params);
  const response = await apiClient.get(`/api/user?${queryParams}`);
  return response.data;
};

export function useGetListUser(params: Record<string, string>) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getListUser(params),
  });
}