import { readManyCollection } from "@/lib/collection";
import { useQuery } from "@tanstack/react-query";

export const useStations = ({ queryKey, query = {}, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("station", query),
    queryKey: queryKey,
    ...options,
  });
};
