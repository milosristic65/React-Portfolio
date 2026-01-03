import styles from "./Home.module.scss";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { addDays, intervalToDuration } from "date-fns";
import { Link } from "react-router-dom";
import slugify from "slugify";
import ModelRenderer from "../../components/ModelRenderer/ModelRenderer";

import { ROUTES } from "../../config/routes";

// import bannerImage from "../../assets/Banner/portrait.png";
import reactLogo from "../../assets/TechStack/react.svg";
import dotnetLogo from "../../assets/TechStack/dotnet.svg";
import phpLogo from "../../assets/TechStack/php.svg";
import drupalLogo from "../../assets/TechStack/drupal.svg";

import TechCard from "../../components/TechCard/TechCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useParallax } from "../../hooks/useParallax";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

import { projects } from "../../data/projects";
import { experiences } from "../../data/experiences";
import { technologies } from "../../data/technologies";

const Home = () => {
  // Banner //
  const bannerBackgroundRef = useParallax(0.2);
  const bannerLogosRef = useParallax(0.16);

  // Tech Stack //
  const technologiesWithProjectCount = technologies.map((tech) => {
    const count = projects.filter((project) =>
      project.technologies?.includes(tech.value)
    ).length;

    return {
      ...tech,
      projectCount: count,
    };
  });

  // Featured projects //
  const featuredProjectsRef = useInViewAnimation(styles.visible, 0.4);

  // Experiences //
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const experienceInitialCount = 1;
  const hasMoreExperiences = experiences.length > experienceInitialCount;
  const revealedExperiencesRef = useRef<HTMLDivElement | null>(null);
  const [experienceHeight, setHeight] = useState(0);

  // Calculate revealed experiences list height
  useEffect(() => {
    if (!revealedExperiencesRef.current) return;

    requestAnimationFrame(() => {
      setHeight(
        showAllExperiences ? revealedExperiencesRef.current!.scrollHeight : 0
      );
    });
  }, [showAllExperiences]);

  const calculateDuration = (start: Date, end?: Date | null) => {
    start = addDays(start, -1);
    const duration = intervalToDuration({ start, end: end || new Date() });
    const years: number = duration.years ?? 0;
    const months: number = duration.months ?? 0;
    const days: number = duration.days ?? 0;

    const parts = [];
    if (years) {
      parts.push(`${years} year${years > 1 ? "s" : ""}`);
      if (months > 0) parts.push(`${months} month${months! > 1 ? "s" : ""}`);
    } else if (months) {
      parts.push(`${months} month${months > 1 ? "s" : ""}`);
    } else {
      parts.push(`${days} day${days! > 1 ? "s" : ""}`);
    }

    return parts.join(", ");
  };

  return (
    <div className={styles.home}>
      <div className={`banner ${styles.banner}`}>
        <div className={`bannerText ${styles.bannerText}`}>
          <h1>Milos Ristic</h1>
          <p>
            <span className="highlight">Full Stack Developer</span> (PHP • .NET
            • React)
          </p>
        </div>
        <div
          className={`${styles.bannerHeroWrapper}`}
          ref={bannerBackgroundRef}
        >
          <div className={`${styles.bannerHeroBackground}`}>
            <div className={styles.bannerHero}>
              <ModelRenderer />
            </div>
          </div>
        </div>
        <div ref={bannerLogosRef} className={styles.bannerLogos}>
          <img src={reactLogo} alt="React Logo" />
          <img src={phpLogo} alt="PHP Logo" />
          <img src={drupalLogo} alt="Drupal Logo" />
          <img src={dotnetLogo} alt="Dotnet Logo" />
        </div>
      </div>

      <section className={styles.aboutSection}>
        <div className={`content ${styles.content}`}>
          <h2>What I Do</h2>
          <p>
            I focus on <span className="highlight">backend logic</span>,{" "}
            <span className="highlight"> data modeling</span>, and building
            maintainable systems, while also creating{" "}
            <span className="highlight"> modern, responsive frontends</span> and
            integration layers to deliver complete solutions. By day I work on
            production systems, and in my free time I explore creativity through{" "}
            game development.
          </p>
        </div>
      </section>

      <section className={styles.techStackSection}>
        <div className={`content ${styles.content}`}>
          <h2>Tech Stack</h2>
          <div className={styles.techStackGrid}>
            {technologiesWithProjectCount
              .filter((tech) => tech.projectCount > 0)
              .map((tech) => (
                <TechCard
                  key={tech.name}
                  title={tech.name}
                  value={tech.value}
                  projectCount={tech.projectCount}
                  logo={tech.icon!}
                  color={tech.color}
                />
              ))}
          </div>
        </div>
      </section>

      <section
        className={styles.featuredProjectsSection}
        ref={featuredProjectsRef}
      >
        <div className={`content ${styles.content}`}>
          <h2>Featured Projects</h2>
          <div className={styles.featuredProjectsGrid}>
            {projects
              .filter((project) => project.featured === true)
              .map((project) => (
                <ProjectCard
                  title={project.title}
                  snippet={project.snippet}
                  thumbnail={project.thumbnail}
                />
              ))}
          </div>
          <Link
            to={ROUTES.PROJECTS}
            className={`buttonLink ${styles.buttonLink}`}
          >
            All Projects
          </Link>
        </div>
      </section>

      <section className={styles.experienceSection}>
        <div className={`content ${styles.content}`}>
          <h2>Experience</h2>
          <div className={`${styles.experienceList} ${styles.initialList}`}>
            {/* Initial list */}
            {experiences
              .slice(0, experienceInitialCount)
              .map((experiences, index) => (
                <div
                  key={experiences.company}
                  className={`${styles.experienceCard} ${
                    index === 0 ? styles.lastExperience : ""
                  }`}
                >
                  <h3>{experiences.company}</h3>
                  <h4 className="highlight">{experiences.position}</h4>
                  <p>{experiences.description}</p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {experiences.duration.start.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {experiences.duration.end
                      ? experiences.duration.end.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Present"}{" "}
                    <span className="highlight">
                      (
                      {calculateDuration(
                        experiences.duration.start,
                        experiences.duration.end
                      )}
                      )
                    </span>
                  </p>
                  {experiences.relatedProjects &&
                    experiences.relatedProjects.length > 0 && (
                      <p>
                        <strong>Related projects:</strong>{" "}
                        {experiences.relatedProjects.map((project, index) => (
                          <span key={project}>
                            <a
                              href={`${ROUTES.PROJECTS}/${slugify(project, {
                                lower: true,
                              })}`}
                            >
                              {project}
                            </a>
                            {index < experiences.relatedProjects!.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </p>
                    )}
                </div>
              ))}
            {/* Revealed list */}
            <motion.div
              ref={revealedExperiencesRef}
              className={styles.revealedExperienceList}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showAllExperiences ? experienceHeight : 0,
                opacity: showAllExperiences ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                margin: "-10px -10px",
                padding: "10px 10px",
                pointerEvents: showAllExperiences ? "auto" : "none",
              }}
            >
              {experiences
                .slice(experienceInitialCount)
                .map((experiences, index) => (
                  <motion.div
                    key={experiences.company}
                    className={styles.experienceCard}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <h3>{experiences.company}</h3>
                    <h4 className="highlight">{experiences.position}</h4>
                    <p>{experiences.description}</p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {experiences.duration.start.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {experiences.duration.end
                        ? experiences.duration.end.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : "Present"}{" "}
                      <span className="highlight">
                        (
                        {calculateDuration(
                          experiences.duration.start,
                          experiences.duration.end
                        )}
                        )
                      </span>
                    </p>
                    {experiences.relatedProjects &&
                      experiences.relatedProjects.length > 0 && (
                        <p>
                          <strong>Related projects:</strong>{" "}
                          {experiences.relatedProjects.map((project, index) => (
                            <span key={project}>
                              <a
                                href={`${ROUTES.PROJECTS}/${slugify(project, {
                                  lower: true,
                                })}`}
                              >
                                {project}
                              </a>
                              {index < experiences.relatedProjects!.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </p>
                      )}
                  </motion.div>
                ))}
            </motion.div>
          </div>
          {/* Show More button */}
          {hasMoreExperiences && (
            <button
              className={`buttonLink ${styles.buttonLink}`}
              onClick={() => setShowAllExperiences(!showAllExperiences)}
            >
              {showAllExperiences ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
