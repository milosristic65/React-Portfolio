import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <title>Milos Ristic | 404 Not Found</title>
      
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
