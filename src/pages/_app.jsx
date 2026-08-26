
import "@/src/styles/index.scss";
import "@/src/styles/footer-3.css";
import "@/src/styles/home-3-our-team.css";
import "@/src/styles/home-3-testimonial.css";
import "@/src/styles/home-3-about.css";
import "@/src/styles/home-3-hero.css";
import "@/src/styles/hero-about-me.css";
import "@/src/styles/ai-lead-management.css";
import "@/src/styles/ai-lead-management-system.css";
import "@/src/styles/call-agents.css";
import ConsultationPayment from "@/src/components/consultation/ConsultationPayment";
import AILeadPromoModal from "@/src/components/AILeadPromoModal";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ConsultationPayment mode="global" />
      <AILeadPromoModal />
    </>
  );
}
