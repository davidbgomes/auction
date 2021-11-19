import type { NextPage } from 'next'
import Head from 'next/head'

import AboutUs from '../components/AboutUs'
import Explore from '../components/Explore'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Leiloo</title>
        <meta name="description" content="Leiloo - Leilões de imóveis em Portugal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Explore />
      <AboutUs />
      <Footer />
    </>
  )
}

export default Home
