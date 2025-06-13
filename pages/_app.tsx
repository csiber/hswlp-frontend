import type { AppProps } from 'next/app'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '#theme'
import { Provider } from '#components/provider'

export default function MyApp({ Component, pageProps }: AppProps) {
  const colorMode = theme.config.initialColorMode
  return (
    <>
      <ColorModeScript initialColorMode={colorMode} />
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
