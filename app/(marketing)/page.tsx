import Head from 'next/head'
import LandingPage from './landing'

export default function Page() {
  return (
    <>
      <Head>
        <title>Saas UI Landingspage</title>
        <meta name="description" content="Free SaaS landingspage starter kit" />
      </Head>
      <LandingPage />
    </>
  )
}
