import "@/styles/globals.css";
import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CustomProvider } from "rsuite";

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CustomProvider>
          <Component {...pageProps} />
        </CustomProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
