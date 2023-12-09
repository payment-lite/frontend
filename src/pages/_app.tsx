import Providers from "@/components/providers/providers";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </SessionProvider>
  );
}
