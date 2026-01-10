import styles from "./ProjectCard.module.scss";
import slugify from "slugify";
import { ROUTES } from "../../config/routes";

interface ProjectCardProps {
  title: string;
  snippet: string;
  thumbnail: string;
}

const ProjectCard = ({ title, snippet, thumbnail }: ProjectCardProps) => {
  return (
    <div key={title} className={styles.projectCard}>
      <a
        href={`${ROUTES.PROJECTS}/${slugify(title, {
          lower: true,
        })}`}
      >
        <img src={thumbnail} alt={title} />
        <div className={styles.projectInfo}>
          <h3>{title}</h3>
          <p>{snippet}</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
