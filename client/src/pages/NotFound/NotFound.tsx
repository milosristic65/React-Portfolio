import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section>
      <div className={`content ${styles.content}`}>
        <h1>404 Not Found</h1>
      </div>
    </section>
  );
};

export default NotFound;
