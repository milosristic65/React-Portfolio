import styles from "./TechCard.module.scss";
import "./filterColors.scss";
import { TechCardColor } from "./types.ts";
import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";

interface TechCardProps {
  title: string;
  value: string;
  projectCount: number;
  logo: string;
  color?: TechCardColor;
}

const TechCard = ({
  title,
  value,
  projectCount,
  logo,
  color,
}: TechCardProps) => {
  const tech = value;
  const search = new URLSearchParams({
    tech,
  }).toString();

  return (
    <div className={styles.techCard}>
      <Link to={{ pathname: ROUTES.PROJECTS, search: `?${search}` }}>
        <div className={styles.cardContent}>
          <h3>{title}</h3>
          <p>
            Projects: <span className="highlight">{projectCount}</span>
          </p>
        </div>
        <img className={color} src={logo} alt={title} />
        {/* 3 text lines icon */}
        <div className={styles.textIcon}>
          <div className={styles.textLine}></div>
          <div className={styles.textLine}></div>
          <div className={styles.textLine}></div>
        </div>
      </Link>
    </div>
  );
};

export default TechCard;
