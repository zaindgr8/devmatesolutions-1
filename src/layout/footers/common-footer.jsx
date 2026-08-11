import Link from "next/link";
import React from "react";

// footer_links data
const footer_links = [
  {
    id: "company",
    title: "Company",
    col: "col-xl-3",
    links: [
      { title: "About Us", link: "/about" },
      { title: "Our Team", link: "/our-team" },
      { title: "Careers", link: "/job" },
      { title: "FAQ", link: "/faq" },
      { title: "Get In Touch", link: "/contact" },
      { title: "Pay an Invoice →", link: "/pay" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    col: "col-xl-2",
    links: [
      { title: "Privacy Policy", link: "/privacy-policy" },
      { title: "Terms of Service", link: "/terms" },
      { title: "Refund Policy", link: "/refund-policy" },
    ],
  },
  {
    id: "services",
    title: "Services",
    col: "col-xl-2",
    links: [
      { title: "Business Consultancy", link: "/service-3" },
      { title: "Web Development", link: "/service-3" },
      { title: "UI & UX Design", link: "/service-3" },
      { title: "SEO Optimization", link: "/service-3" },
      { title: "Digital Marketing", link: "/service-3" },
    ],
  },
];

const CommonFooter = () => {
  return (
    <>
      {footer_links.map((item, i) => (
        <div key={i} className={`${item.col} col-md-6`}>
          <div className="tp-footer__widget mb-40">
            <h3 className="tp-footer__widget-title mb-35">{item.title}</h3>
            <ul id={item.id}>
              {item.links?.map((link, id) => (
                <li key={id}>
                  <Link href={link.link} style={link.title.includes("Pay an Invoice") ? { fontWeight: 600, color: "#B91C1B" } : {}}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommonFooter;







// copy right text
const footer_content = {
  copy_right_info: <> Copyright &amp; Design By <a href="#">@DEVMATE Solutions</a> — TechMate Solutions FZ LLC — {new Date().getFullYear()} </>,
};

const { copy_right_info } = footer_content;

export const FooterCopyRight = ({style_3, style_7, style_9}) => {
  return (
    <> 
      <div className={`tp-footer__bottom pt-25 pb-25 ${style_3 ? "da-ft-copyright-bg" : ""} ${style_7 ? "law-footer__bottom red-bg"  :''} ${style_9 ? "ha-footer-copyright" : ""}`}>  
        <div className="row align-items-center">
          <div className="col-md-8 col-12">
            <div className={`tp-copyrigh-text ${style_3 ? "" : "text-center text-md-start"}`}>
              <span>{copy_right_info}</span>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <div className="tp-footer-menu text-end">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                <li><Link href="/privacy-policy" style={{ fontSize: "13px" }}>Privacy</Link></li>
                <li><Link href="/terms" style={{ fontSize: "13px" }}>Terms</Link></li>
                <li><Link href="/refund-policy" style={{ fontSize: "13px" }}>Refunds</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
