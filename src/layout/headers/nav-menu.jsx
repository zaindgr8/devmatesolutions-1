import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import menu_data from "./menu-data";

const NavMenu = () => {
  const router = useRouter();

  const handleCeoClick = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      const el = document.getElementById("ceo");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#ceo");
    }
  };
  return (
    <>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px, 1.4vw, 22px)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }}
      >
        {menu_data.map((item, i) => (
          <li
            key={i}
            className={item.has_dropdown ? "dm-nav-drop" : undefined}
            style={{
              display: "inline-block",
              flexShrink: 0,
              whiteSpace: "nowrap",
              margin: 0,
              marginRight: 0,
            }}
          >
            {item.title === "Book Meeting With CEO" ? (
              <a
                href="/#ceo"
                onClick={handleCeoClick}
                style={{
                  backgroundColor: "#B91C1B",
                  color: "#ffffff",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "700",
                  fontSize: "12.5px",
                  letterSpacing: "0.3px",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  boxShadow: "0 2px 8px rgba(185,28,27,0.30)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#991b1b";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(185,28,27,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#B91C1B";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(185,28,27,0.30)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {item.title}
              </a>
            ) : item.has_dropdown ? (
              <button type="button" className="dm-nav-drop__btn" aria-haspopup="true">
                {item.title}
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
            ) : item.title === "Book Demo" ? (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "7px 14px",
                  borderRadius: "6px",
                  display: "inline-block",
                  fontWeight: "600",
                  fontSize: "13px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#333333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000000";
                }}
              >
                {item.title}
              </Link>
            ) : (
              <Link
                href={item.link}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  fontSize: "13.5px",
                  fontWeight: "600",
                  letterSpacing: "0.2px",
                }}
              >
                {item.title}
              </Link>
            )}
            {item.sub_menus && (
              <ul className="dm-nav-drop__menu">
                {item.sub_menus.map((sub_item, sub_i) => (
                  <li key={sub_i}>
                    <Link
                      href={sub_item.link}
                      target={sub_item.new_tab ? "_blank" : "_self"}
                      rel={sub_item.new_tab ? "noopener noreferrer" : ""}
                    >
                      {sub_item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {item.mega_menus && (
              <ul className="mega-menu">
                {item.mega_menus.map((mega_item, mega_i) => (
                  <li key={mega_i}>
                    <Link className="" href={mega_item.link}>
                      {mega_item.title}
                    </Link>
                    <ul>
                      {mega_item.layout.map((m_item, m_i) => (
                        <li key={m_i}>
                          <Link href={m_item.link}>{m_item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
