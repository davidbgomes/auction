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
        <title>Leiloou</title>
        <meta name="description" content="Leiloo - Leilões de imóveis em Portugal" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2a5967" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="preload" href="/api/houses" as="fetch" crossOrigin="anonymous"></link>
      </Head>
      <Hero />
      <Explore />
      <AboutUs />
      <Footer />
    </>
  )
}

export default Home
