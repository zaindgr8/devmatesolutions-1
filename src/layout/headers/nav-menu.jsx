import Link from "next/link";
import React from "react";
import menu_data from "./menu-data";

const NavMenu = () => {
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
            style={{
              display: "inline-block",
              flexShrink: 0,
              whiteSpace: "nowrap",
              margin: 0,
              marginRight: 0,
            }}
          >
            {item.title === "Book Demo" ? (
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
              <ul className="submenu">
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
