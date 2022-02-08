import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GdprBanner from "@/components/GdprBanner";
import Head from "next/head";
import Script from "next/script";
import "@fontsource/faustina"

import Header from "../components/Header";

const GTM_ID = process.env.GTM_ID
const GA_ID = process.env.GA_ID
const G_TRACKING_ID = process.env.G_TRACKING_ID

function MyApp({ Component, pageProps }: AppProps) {

  const theme = extendTheme({
    fonts: {
      heading: 'Faustina',
      body: 'Faustina',
    },
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2a5967" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="google-site-verification" content="34aN0oAtR60hpfDReUSgdFjm1raYz6cpOBKwsfTHZRc" />
      </Head>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <GdprBanner />
      </ChakraProvider>
      
      {/* <!-- Global site tag (gtag.js) - Google Analytics -->  */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="googleAnalytics"
        async
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}');`,
        }}
      />
      {/* <!-- Global site tag (gtag.js) - Google Ads -->  */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${G_TRACKING_ID}`}
      />
      <Script
        id="googleAds"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${G_TRACKING_ID}');`
        }}
      />
      {/* <!-- Google Tag Manager -->  */}
      <Script
        id="googleTagManager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}')`,
        }}
      />
    </>
  );
}
export default MyApp;
