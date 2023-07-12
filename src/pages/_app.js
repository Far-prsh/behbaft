import '@/styles/globals.scss'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from '../store/index'
import { persistStore } from 'redux-persist'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

let persistor = persistStore(store)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
  <Head>
    <title>Behbaft</title>
    <meta name='description' content='Created by next app'/>
    <link rel='icon' href='/favicon.ico'/>
  </Head>
  
  <SessionProvider session={session}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
  </SessionProvider>
  </>
}
