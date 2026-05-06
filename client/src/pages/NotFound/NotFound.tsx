import styles from "./NotFound.module.scss";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Milos Ristic | 404 Not Found";
  }, []);

  return (
    <div className={styles.notFound}>
      <div className={`content ${styles.content}`}>
        <h1>
          <span className="highlight">404</span> Not Found
        </h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
