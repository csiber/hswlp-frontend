import { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '#theme'

export default function Document() {
  const colorMode = theme.config.initialColorMode
  return (
    <Html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/manifest.json" />
      </Head>
      <body className={`chakra-ui-${colorMode}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
