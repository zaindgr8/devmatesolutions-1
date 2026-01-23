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
                {menu.title === "Book Demo" ? (
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
                <Link href={menu.link}>{menu.title}</Link>
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
