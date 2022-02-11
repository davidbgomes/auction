import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import Hero from "../components/Hero";
const AboutUs = dynamic(() => import("../components/AboutUs"));
const Explore = dynamic(() => import("../components/Explore"));
const Footer = dynamic(() => import("../components/Footer"));
const OurServices = dynamic(() => import("../components/OurServices"));

const Home: NextPage = () => {
  return (
    <>
      <Head>
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
      <Footer />
    </>
  );
};

export default Home;
