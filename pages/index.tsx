import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
const AboutUs = dynamic(() => import("../components/AboutUs"));
const Explore = dynamic(() => import("../components/Explore"));
const OurServices = dynamic(() => import("../components/OurServices"));

const GOOGLE_ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        <title>Leiloou - Todos os Leilões Eletrónicos</title>
        <meta
          name="description"
          content="Pesquise todos os Leilões eletrónicos de Portugal num só lugar: Imóveis, veículos, equipamentos e muito mais."
        />
      </Head>
      <Hero />
      <Explore />
      <AboutUs />
      <OurServices />
    </>
  );
};

export default Home;
