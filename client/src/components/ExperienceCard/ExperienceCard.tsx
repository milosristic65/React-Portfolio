import styles from "./ExperienceCard.module.scss";

// import { addDays, intervalToDuration } from "date-fns";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { ROUTES } from "../../config/routes";
import { Link } from "react-router";

import { type Project } from "../../types/project";

interface ExperienceCardProps {
  title: string;
  logo: string;
  position: string;
  // duration: {
  //   start: Date;
  //   end: Date | null;
  // };
  url?: string;
  relatedProjects?: string[];
}

const ExperienceCard = ({
  title,
  logo,
  url,
  position,
  // duration,
  relatedProjects,
}: ExperienceCardProps) => {
  const apiUrl = import.meta.env.VITE_API_URL || "";

  // const calculateDuration = (start: Date, end?: Date | null) => {
  //   start = addDays(start, -1);
  //   const dur = intervalToDuration({ start, end: end || new Date() });
  //   const years = dur.years ?? 0;
  //   const months = dur.months ?? 0;
  //   const days = dur.days ?? 0;

  //   const parts = [];
  //   if (years) {
  //     parts.push(`${years} year${years > 1 ? "s" : ""}`);
  //     if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  //   } else if (months) {
  //     parts.push(`${months} month${months > 1 ? "s" : ""}`);
  //   } else {
  //     parts.push(`${days} day${days > 1 ? "s" : ""}`);
  //   }
  //   return parts.join(", ");
  // };

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/projects.json`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  }, [apiUrl]);

  const filteredProjects = projects.filter((project) =>
    relatedProjects?.includes(project.title),
  );

  return (
    <div className={styles.experienceCard}>
      <div className={styles.logo}>
        <a href={url} target="_blank">
          <img src={`${apiUrl}/api/assets/${logo}`} title={title} />
        </a>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.subtitle}>Related projects:</p>
        {relatedProjects ? (
          <div className={styles.projects}>
            {filteredProjects.slice(0, 4).map((project) => (
              <div key={project.title} className={styles.projectItem}>
                <Link
                  to={`${ROUTES.PROJECTS}/${slugify(project.title, { lower: true })}`}
                >
                  <img
                    src={`${apiUrl}/api/assets/${project.thumbnail}`}
                    alt={project.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No notable projects were found.</p>
        )}
      </div>
      <h3 className={styles.position}>{position}</h3>
    </div>
  );
};

export default ExperienceCard;
