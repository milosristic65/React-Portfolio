import styles from "./Home.module.scss";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ModelRenderer from "../../components/ModelRenderer/ModelRenderer";

import { ROUTES } from "../../config/routes";

import reactLogo from "../../assets/TechStack/react.svg";
import dotnetLogo from "../../assets/TechStack/dotnet.svg";
import phpLogo from "../../assets/TechStack/php.svg";
import drupalLogo from "../../assets/TechStack/drupal.svg";

import TechCard from "../../components/TechCard/TechCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ExperienceCard from "../../components/ExperienceCard/ExperienceCard";
import { useParallax } from "../../hooks/useParallax";
import { useInViewAnimation } from "../../hooks/useInViewAnimation";

import { type Project } from "../../types/project";
import { type Experience } from "../../types/experience";
import { type Technology } from "../../types/technology";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";

  // Banner //
  const bannerBackgroundRef = useParallax(0.2);
  const bannerLogosRef = useParallax(0.16);

  // Featured projects //
  const featuredProjectsRef = useInViewAnimation(styles.visible, 0.4);
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

  // Tech Stack //
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/technologies.json`)
      .then((res) => res.json())
      .then((data: Technology[]) => {
        setTechnologies(data);
      })
      .catch((error) => {
        console.error("Failed to fetch technologies:", error);
      });
  }, [apiUrl]);

  const technologiesWithProjectCount = technologies.map((tech) => {
    const count = projects.filter((project) =>
      project.technologies?.includes(tech.value)
    ).length;

    return {
      ...tech,
      projectCount: count,
    };
  });

  // Experiences //
  const [experiences, setExperiences] = useState<Experience[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/experiences.json`)
      .then((res) => res.json())
      .then((data: Experience[]) => {
        const experiencesData = data.map((exp) => ({
          ...exp,
          duration: {
            start: new Date(exp.duration.start),
            end: exp.duration.end ? new Date(exp.duration.end) : null,
          },
        }));
        setExperiences(experiencesData);
      })
      .catch((error) => {
        console.error("Failed to fetch experiences:", error);
      });
  }, [apiUrl]);
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

  return (
    <div className={styles.home}>
      <title>Milos Ristic</title>
      
      <div className={`banner ${styles.banner}`}>
        <div className={`bannerText ${styles.bannerText}`}>
          <h1>Milos Ristic</h1>
          <p>
            <span className="highlight">Full Stack Developer</span>{" "}
            <span style={{ whiteSpace: "nowrap" }}>(PHP • React)</span>
          </p>
        </div>
        <div
          className={`bannerHeroWrapper ${styles.bannerHeroWrapper}`}
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
                  logo={`${apiUrl}/api/assets/${tech.icon}`}
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
                  thumbnail={`${apiUrl}/api/assets/${project.thumbnail}`}
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
          <h2>Roles</h2>
          <div className={`${styles.experienceList} ${styles.initialList}`}>
            {/* Initial list */}
            {experiences
              .slice(0, experienceInitialCount)
              .map((experience, index) => (
                <div
                  key={experience.company}
                  className={`${styles.experienceCard} ${
                    index === 0 ? styles.lastExperience : ""
                  }`}
                >
                  <ExperienceCard {...experience} />
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
                .map((experience, index) => (
                  <motion.div
                    key={experience.company}
                    className={styles.experienceCard}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <ExperienceCard {...experience} />
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
