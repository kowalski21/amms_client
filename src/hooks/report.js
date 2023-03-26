import { readManyCollection, readOneCollection } from "@/lib/collection";
import { useQuery } from "@tanstack/react-query";

export const useReports = ({ query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("report", query),
    queryKey: queryKey,
    ...options,
  });
};

export const useReport = ({ id, query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readOneCollection("report", query, id),
    queryKey: queryKey,
    ...options,
  });
};
