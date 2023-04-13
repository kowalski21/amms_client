import { Directus } from "@directus/sdk";
import { create } from "apisauce";

export const directus = new Directus(process.env.NEXT_PUBLIC_API_URL);

export const fileApi = create({
  baseURL: process.env.NEXT_PUBLIC_REPORT_URL,
});
export const handleError = (errorObj) => {
  let { errors } = errorObj;

  if (errors.length > 0) {
    let message = errors[0].message;

    return message;
  } else {
    return "error connecting to server, try again";
  }
};
