import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModelRenderer from "../../components/ModelRenderer/ModelRenderer";

import { ROUTES } from "../../config/routes";

import reactLogo from "../../assets/TechStack/react.svg";
import dotnetLogo from "../../assets/TechStack/dotnet.svg";
import phpLogo from "../../assets/TechStack/php.svg";
import drupalLogo from "../../assets/TechStack/drupal.svg";
import portrait from "../../assets/About/milos.webp";

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
  const bannerLogosRef = useParallax(0.1);
  const callToActionRef = useInViewAnimation(
    styles.callToActionVisible,
    0.9,
    true,
  );

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
      project.technologies?.includes(tech.value),
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
          // duration: {
          //   start: new Date(exp.duration.start),
          //   end: exp.duration.end ? new Date(exp.duration.end) : null,
          // },
        }));
        setExperiences(experiencesData);
      })
      .catch((error) => {
        console.error("Failed to fetch experiences:", error);
      });
  }, [apiUrl]);

  return (
    <div className={styles.home}>
      <title>Milos Ristic</title>

      <div ref={callToActionRef} className={`banner ${styles.banner}`}>
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

        <div className={styles.callToAction}>
          {/* Mouse */}
          <div className={styles.scrollDown}>
            <div className={styles.scrollWheel}></div>
          </div>
          {/* Touch */}
          <div className={styles.swipeDown}>
            <div className={styles.dot}></div>
            <div className={styles.trailWrapper}>
              <div className={styles.trail}></div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <div className={`content ${styles.content}`}>
          <h2>What I Do</h2>
          <p>
            Focusing on <span className="highlight">backend logic</span>,{" "}
            <span className="highlight">data modeling</span>, and building
            maintainable systems while also creating{" "}
            <span className="highlight">modern</span>,{" "}
            <span className="highlight">responsive frontends</span> that connect
            everything into complete, polished solutions. I genuinely enjoy
            solving programming challenges like puzzles.
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
          <div className={`${styles.experienceList}`}>
            {/* Initial list */}
            {experiences.map((experience, index) => (
              <div
                key={experience.title}
                className={`${styles.experienceCard} ${
                  index === 0 ? styles.lastExperience : ""
                }`}
              >
                <ExperienceCard {...experience} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whoAmISection}>
        <div className={`content ${styles.content}`}>
          <h2>Who Am I</h2>
          <div className={styles.contentBackground}>
            <img src={portrait} alt="Portrait of Milos Ristic leaning on a railing" />
            <div>
              <h3>I'm a programmer</h3>
              <p>
                My name is Milos Ristic. I was always interested in computers,
                for as long as I can remember. It started with playing video
                games at my uncle's computer to eventually making my own tiny
                video games, and later moving to web development starting in
                high school.
              </p>
              <p>
                Now I'm simultaneously attending college, majoring in computer
                engineering, while working full time. This experience has pushed
                my boundaries and made me learn a lot in a span of a couple of
                years, and I love every second of it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
