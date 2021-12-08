import type { NextPage } from "next";
import Head from "next/head";

import AboutUs from "../components/AboutUs";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import OurServices from "@/components/OurServices";

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
