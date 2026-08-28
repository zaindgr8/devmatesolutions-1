import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="nVOANx78-yb8oro6fyQSzLn5fDKRokFBDnwjYPv1smw" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/red-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/red-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/red-logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
