
import "@/src/styles/index.scss";
import ConsultationPayment from "@/src/components/consultation/ConsultationPayment";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ConsultationPayment mode="global" />
    </>
  );
}
