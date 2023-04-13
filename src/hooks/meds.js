import { readManyCollection, readOneCollection } from "@/lib/collection";
import { useQuery } from "@tanstack/react-query";

export const useMeds = ({ query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("prescription", query),
    queryKey: queryKey,
    ...options,
  });
};

export const useMed = ({ id, query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readOneCollection("prescription", query, id),
    queryKey: queryKey,
    ...options,
  });
};

export const useProducts = ({ query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("meds", query),
    queryKey: queryKey,
    ...options,
  });
};

export const useProduct = ({ id, query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readOneCollection("meds", query, id),
    queryKey: queryKey,
    ...options,
  });
};

export const usePresMeta = ({ query = {}, queryKey, options = {} } = {}) => {
  return useQuery({
    queryFn: () => readManyCollection("pres_meta", query),
    queryKey: queryKey,
    ...options,
  });
};
