import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";
import { type Social } from "../../types/social";
import { ROUTES } from "../../config/routes";
import { useLocation } from "react-router-dom";

import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";

  const footerRef = useInViewAnimation(styles.visible, 0.3);
  const { pathname } = useLocation();
  const contactFormPages = [ROUTES.HOME];

  const [socials, setSocials] = useState<Social[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/socials.json`)
      .then((res) => res.json())
      .then((data: Social[]) => {
        setSocials(data);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  }, [apiUrl]);

  return (
    <footer ref={footerRef}>
      <div
        className={`${styles.footerInside} ${styles.footerRotatedBackground}`}
      >
        <div className={styles.footerBackground}></div>
        <div className={`content ${styles.content}`}>
          {contactFormPages.includes(pathname) && (
            <>
              {" "}
              <h2 className={styles.branding}>
                Got a Project in Mind?{" "}
                <strong className="highlight" style={{ whiteSpace: "nowrap" }}>
                  Let's Talk :)
                </strong>
              </h2>
              <ContactForm className={styles.contactForm} />
            </>
          )}

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.url} target="_blank">
                  <img
                    src={`${apiUrl}/api/assets/${social.icon ?? ""}`}
                    alt={social.name}
                  />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`${styles.footerPlaceholder} ${styles.footerRotatedBackground}`}
      >
        <div className={styles.footerBackground}></div>
      </div>
    </footer>
  );
};

export default Footer;
