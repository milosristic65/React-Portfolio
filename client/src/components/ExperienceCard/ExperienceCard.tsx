import { addDays, intervalToDuration } from "date-fns";
import slugify from "slugify";
import { ROUTES } from "../../config/routes";
import { Link } from "react-router";

interface ExperienceCardProps {
  company: string;
  position: string;
  description: string;
  duration: {
    start: Date;
    end: Date | null;
  };
  relatedProjects?: string[];
}

const ExperienceCard = ({
  company,
  position,
  description,
  duration,
  relatedProjects,
}: ExperienceCardProps) => {
  const calculateDuration = (start: Date, end?: Date | null) => {
    start = addDays(start, -1);
    const dur = intervalToDuration({ start, end: end || new Date() });
    const years = dur.years ?? 0;
    const months = dur.months ?? 0;
    const days = dur.days ?? 0;

    const parts = [];
    if (years) {
      parts.push(`${years} year${years > 1 ? "s" : ""}`);
      if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    } else if (months) {
      parts.push(`${months} month${months > 1 ? "s" : ""}`);
    } else {
      parts.push(`${days} day${days > 1 ? "s" : ""}`);
    }
    return parts.join(", ");
  };

  return (
    <>
      <h3>{company}</h3>
      <h4 className="highlight">{position}</h4>
      <p>{description}</p>
      <p>
        <strong>Duration:</strong>{" "}
        {duration.start.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}{" "}
        -{" "}
        {duration.end
          ? duration.end.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "Present"}{" "}
        <span className="highlight">
          ({calculateDuration(duration.start, duration.end)})
        </span>
      </p>
      {relatedProjects && relatedProjects.length > 0 && (
        <p>
          <strong>Related projects:</strong>{" "}
          {relatedProjects.map((project, index) => (
            <span key={project}>
              <Link
                to={`${ROUTES.PROJECTS}/${slugify(project, { lower: true })}`}
              >
                {project}
              </Link>
              {index < relatedProjects.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
    </>
  );
};

export default ExperienceCard;
