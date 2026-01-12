import styles from "./ProjectCard.module.scss";
import slugify from "slugify";
import { ROUTES } from "../../config/routes";
import { Link } from "react-router";

interface ProjectCardProps {
  title: string;
  snippet: string;
  thumbnail: string;
  onLoad?: () => void;
}

const ProjectCard = ({
  title,
  snippet,
  thumbnail,
  onLoad,
}: ProjectCardProps) => {
  return (
    <div key={title} className={styles.projectCard}>
      <Link
        to={`${ROUTES.PROJECTS}/${slugify(title, {
          lower: true,
        })}`}
        className={styles.projectLink}
      >
        <img src={thumbnail} alt={title} onLoad={onLoad} />
        <div className={styles.projectInfo}>
          <h3>{title}</h3>
          <p>{snippet}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
