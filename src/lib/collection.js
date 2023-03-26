import { directus } from "./api";

export const readManyCollection = async (collectionName, query) => {
  return await directus.items(collectionName).readByQuery(query);
};

export const readOneCollection = async (
  collectionName,
  query,
  collectionId
) => {
  return await directus.items(collectionName).readOne(collectionId, query);
};
