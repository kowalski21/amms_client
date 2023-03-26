import { readManyCollection, readOneCollection } from "@/lib/collection";
import { useQuery } from "@tanstack/react-query";

export const useRoles = ({ queryKey, query = {}, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("directus_roles", query),
    queryKey,
    ...options,
  });
};

export const useRole = ({ id, queryKey, query = {}, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readOneCollection("directus_roles", query, id),
    queryKey,
    ...options,
  });
};

export const useUsers = (queryKey, query, options = {}) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readManyCollection("directus_users", query),
    ...options,
  });
};
