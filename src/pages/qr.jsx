import Head from "next/head";
import { QR_COOKIE_NAME, isValidSessionToken, parseCookies } from "@/src/lib/qrAuth";
import QRLogin from "@/src/components/qr/QRLogin";
import DigitalCardStudio from "@/src/components/qr/DigitalCardStudio";

export default function QrPage({ authenticated }) {
  return (
    <>
      <Head>
        <title>Digital Business Card | Devmate Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {authenticated ? <DigitalCardStudio /> : <QRLogin />}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req.headers.cookie);
  const authenticated = isValidSessionToken(cookies[QR_COOKIE_NAME]);
  return { props: { authenticated } };
}
