import Head from 'next/head'
import LandingPage from './landing'

export default function Page() {
  return (
    <>
      <Head>
        <title>HSWLP - Saját márkás SaaS hoszting</title>
        <meta
          name="description"
          content="White-label SaaS hoszting megoldás viszonteladóknak"
        />
      </Head>
      <LandingPage />
    </>
  )
}
