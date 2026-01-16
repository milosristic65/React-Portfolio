import styles from "./Projects.module.scss";
import "./Projects.scss";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Dropdown, { type OptionType } from "../../components/Dropdown/Dropdown";

import bannerImage from "../../assets/Banner/undraw_programming.svg";

import { type Project } from "../../types/project";
import { type Industry } from "../../types/industry";
import { type Technology } from "../../types/technology";

const Projects = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";

  const [searchParams, setSearchParams] = useSearchParams();
  const industryParam = searchParams.get("industry");
  const techParam = searchParams.get("tech");

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

  const [technologyValue, setTechnologyValue] = useState<OptionType | null>();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/technologies.json`)
      .then((res) => res.json())
      .then((data: Technology[]) => {
        setTechnologies(data);

        if (techParam) {
          const found =
            data
              .map((item) => ({ label: item.name, value: item.value }))
              .find((option) => option.value === techParam) ?? null;

          setTechnologyValue(found);
        }
      });
  }, [apiUrl, techParam]);

  const [industryValue, setIndustryValue] = useState<OptionType | null>();
  const [industries, setIndustries] = useState<Industry[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/industries.json`)
      .then((res) => res.json())
      .then((data: Industry[]) => {
        setIndustries(data);

        if (industryParam) {
          const found =
            data
              .map((item) => ({ label: item.name, value: item.value }))
              .find((option) => option.value === industryParam) ?? null;

          setIndustryValue(found);
        }
      });
  }, [apiUrl, industryParam]);

  const industryFilter = industries.map((industry) => ({
    label: industry.name,
    value: industry.value,
  }));

  const technologyFilter = technologies.map((tech) => ({
    label: tech.name,
    value: tech.value,
  }));

  const onIndustryChange = (option: OptionType | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (option) {
        next.set("industry", option.value);
      } else {
        next.delete("industry");
      }

      return next;
    });

    setIndustryValue(option);
  };

  const onTechnologyChange = (option: OptionType | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (option) {
        next.set("tech", option.value);
      } else {
        next.delete("tech");
      }

      return next;
    });

    setTechnologyValue(option);
  };

  const clearFilters = () => {
    setIndustryValue(null);
    setTechnologyValue(null);
    setSearchParams();
  };

  const filteredProjects = projects.filter(
    (project) =>
      (technologyValue == null
        ? true
        : project.technologies.includes(technologyValue?.value ?? "")) &&
      (industryValue == null
        ? true
        : project.industries.includes(industryValue?.value ?? ""))
  );

  return (
    <div className={styles.projects}>
      <title>Milos Ristic | Projects</title>
      
      <div className={`banner ${styles.banner}`}>
        <div className={`bannerText ${styles.bannerText}`}>
          <h1>Projects</h1>
          <p>
            From experiments to <span className="highlight">client work</span>.
          </p>
          <div className={`bannerHeroWrapper ${styles.bannerHeroWrapper}`}>
            <div className={`${styles.bannerHeroBackground}`}>
              <img
                src={bannerImage}
                className={styles.bannerHero}
                alt="Projects Hero"
              />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.projectsSection}>
        <div className={`content ${styles.content}`}>
          <div className={`filters ${styles.filters}`}>
            <span>Filter by:</span>
            <div className={styles.dropdowns}>
              <Dropdown
                options={industryFilter}
                placeholder="Industry"
                value={industryValue}
                onChange={onIndustryChange}
              />
              <Dropdown
                options={technologyFilter}
                placeholder="Technology"
                value={technologyValue}
                onChange={onTechnologyChange}
              />
            </div>
            <div
              className={`buttonLink ${styles.buttonLink} ${
                industryValue || technologyValue ? "" : "hidden"
              }`}
              onClick={clearFilters}
            >
              Clear Filters
            </div>
          </div>
        </div>
        <div
          className={`content ${styles.content} loadFade`}
          style={{ opacity: projects.length > 0 ? 1 : 0 }}
        >
          {filteredProjects.length > 0 ? (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  title={project.title}
                  snippet={project.snippet}
                  thumbnail={`${apiUrl}/api/assets/${project.thumbnail}`}
                />
              ))}
            </div>
          ) : (
            <p>No projects match the selected filters.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
