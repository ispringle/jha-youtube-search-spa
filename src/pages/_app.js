import Head from 'next/head'

import '../styles/styles.sass'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>ian.ist</title>
          <link rel="icon" href="fleuron.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
