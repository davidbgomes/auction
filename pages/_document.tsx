// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="pt">
        <Head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9812155664610860" crossOrigin="anonymous"></script>
        </Head>
        <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>
          </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
