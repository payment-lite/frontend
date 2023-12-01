import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {MantineProvider} from "@mantine/core";
import {SessionProvider} from "next-auth/react";
import Providers from "@/components/providers/providers";

// export default function App({ Component, pageProps }: AppProps) {
export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider>
          <Providers>
            <Component {...pageProps} />
          </Providers>
      </SessionProvider>
  )
}
