import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";

import logo from "/logo.svg";

const Header = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Header style on page top for pages with banner
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(`.${styles.header}`);
      const banner = document.querySelector(".banner");

      if (header && banner) {
        const headerAtTop = header.classList.contains(styles.atTop);

        if (window.scrollY < 50 && !headerAtTop) {
          header.classList.add(styles.atTop);
        } else if (window.scrollY >= 50 && headerAtTop) {
          header.classList.remove(styles.atTop);
        }
      } else if (header && !banner) {
        header.classList.remove(styles.atTop);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to={ROUTES.HOME} className={`${styles.navLink} ${styles.logo}`}>
          <img src={logo} alt="logo" />
        </Link>

        <button
          className={styles.skipNavigation}
          onClick={() => {
            const main = document.querySelector("main");
            if (main) {
              const focusable = main.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
              );
              if (focusable.length > 0) {
                (focusable[0] as HTMLElement).focus();
              }
            }
          }}
        >
          Skip navigation
        </button>

        <nav className={styles.desktopNav}>
          <Link to={ROUTES.HOME} className={styles.navLink}>
            Home
          </Link>
          <Link to={ROUTES.PROJECTS} className={styles.navLink}>
            Projects
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className={`${styles.navLink} ${styles.contactButton}`}
          >
            Get in Contact
          </Link>
        </nav>

        <div
          className={`${styles.sidebarToggle} ${
            isSidebarOpen ? styles.open : ""
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ></div>

        <div
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        >
          <nav className={styles.mobileNav}>
            <Link to={ROUTES.HOME} onClick={() => setIsSidebarOpen(false)}>
              Home
            </Link>
            <Link to={ROUTES.PROJECTS} onClick={() => setIsSidebarOpen(false)}>
              Projects
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className={styles.contactButton}
              onClick={() => setIsSidebarOpen(false)}
            >
              Get in Contact
            </Link>
          </nav>
        </div>
        <div
          className={`${styles.sidebarOverlay} ${
            isSidebarOpen ? styles.open : ""
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
