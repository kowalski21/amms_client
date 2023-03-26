import { readManyCollection } from "@/lib/collection";
import { useQuery } from "@tanstack/react-query";

export const useClients = ({ query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("client", query),
    queryKey,
    ...options,
  });
};
