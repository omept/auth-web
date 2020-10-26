import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import React from 'react'
import { Provider, createClient } from 'urql';
import theme from '../theme'


const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_CLIENT, fetchOptions: {
    credentials: "include"
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
