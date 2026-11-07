import React, { useState } from "react";
import Link from "next/link";
import menu_data from "./menu-data";
// internal

const MobileMenus = () => {
  const [subMenu, setSubMenu] = useState("");
  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  // openSubMobileMenu
  const openSubMobileMenu = (s_menu) => {
    if (subMenu === s_menu) {
      setSubMenu("");
    } else {
      setSubMenu(s_menu);
    }
  };
  return (
    <nav className="mean-nav">
      <ul>
        {menu_data.map((menu, i) => (
          <React.Fragment key={i}>
            {!menu.has_dropdown && (
              <li>
                {menu.title === "Book Meeting With CEO" ? (
                  <Link
                    href={menu.link}
                    style={{
                      backgroundColor: "#B91C1B",
                      color: "#ffffff",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "700",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {menu.title}
                  </Link>
                ) : menu.title === "Book Demo" ? (
                  <Link
                    href={menu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontWeight: "500",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {menu.title}
                  </Link>
                ) : (
                  <Link href={menu.link}>{menu.title}</Link>
                )}
              </li>
            )}

            {menu.has_dropdown && !menu.mega_menu && (
              <li className="has-dropdown">
                <a
                  href={menu.link}
                  aria-expanded={navTitle === menu.title}
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileMenu(menu.title);
                  }}
                >
                  {menu.title} {navTitle === menu.title ? "−" : "+"}
                </a>
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu?.sub_menus?.map((sub, i) => (
                    <li key={i}>
                      <Link href={sub.link}>{sub.title}</Link>
                    </li>
                  ))}
                </ul>
                {/* Remove the plus sign */}
                {/* <a
                  className={`mean-expand ${
                    navTitle === menu.title ? "mean-clicked" : ""
                  }`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a> */}
              </li>
            )}

            {menu.mega_menu && (
              <li className="has-dropdown has-mega-menu">
                <Link href={menu.link}>{menu.title}</Link>
                <ul
                  className="mega-menu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.mega_menus.map((mega_m, i) => (
                    <li key={i}>
                      <Link href={mega_m.link} className="mega-menu-title">
                        {mega_m.title}
                      </Link>

                      <ul
                        style={{
                          display: subMenu === mega_m.title ? "block" : "none",
                        }}
                      >
                        {mega_m.layout.map((sub_m, i) => (
                          <li key={i}>
                            <Link href={sub_m.link}>{sub_m.title}</Link>
                          </li>
                        ))}
                      </ul>

                      {/* Remove the plus sign */}
                      {/* <a
                        className={`mean-expand ${
                          subMenu === mega_m.title ? "mean-clicked" : ""
                        }`}
                        onClick={() => openSubMobileMenu(mega_m.title)}
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      >
                        <i className="fal fa-plus"></i>
                      </a> */}
                    </li>
                  ))}
                </ul>

                {/* Remove the plus sign */}
                {/* <a
                  className={`mean-expand ${
                    navTitle === menu.title ? "mean-clicked" : ""
                  }`}
                  onClick={() => openMobileMenu(menu.title)}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  <i className="fal fa-plus"></i>
                </a> */}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenus;
