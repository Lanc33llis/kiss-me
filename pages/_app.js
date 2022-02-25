/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'

import Layout from './components/Layout'

import '../styles/globals.sass'

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Head>
      <title>kiss me</title>
      <meta name="description" content="kiss me" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <link rel="icon" href="/AlldayIconWhite.svg" /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,700;1,900&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
