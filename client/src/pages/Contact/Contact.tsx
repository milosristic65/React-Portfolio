import styles from "./Contact.module.scss";
import bannerImage from "../../assets/Banner/undraw_mailbox.svg";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useParallax } from "../../hooks/useParallax";

const Contact = () => {
  const bannerBackgroundRef = useParallax(0.2);

  return (
    <div className={styles.contact}>
      <title>Milos Ristic | Contact</title>

      <div className={`banner ${styles.banner}`}>
        <div className={`bannerText ${styles.bannerText}`}>
          <h1>Contact</h1>
          <p>
            Let's talk, <span className="highlight">send an email</span>.
          </p>
        </div>
        <div
          ref={bannerBackgroundRef}
          className={`bannerHeroWrapper ${styles.bannerHeroWrapper}`}
        >
          <div className={`${styles.bannerHeroBackground}`}>
            <img
              src={bannerImage}
              className={styles.bannerHero}
              alt="Projects Hero"
            />
          </div>
        </div>
      </div>

      <section className={styles.contactFormSection}>
        <div className={`content ${styles.content}`}>
          <div className={styles.contactText}>
            <h2>Got a Project in Mind?</h2>
            <p>
              I'm always open to chat about{" "}
              <span className="highlight">projects</span>,{" "}
              <span className="highlight">ideas</span>, or{" "}
              <span className="highlight">potential collaborations</span>. Feel
              free to reach out anytime.
            </p>
          </div>
          <ContactForm className={styles.contactForm} />
        </div>
      </section>
    </div>
  );
};

export default Contact;
