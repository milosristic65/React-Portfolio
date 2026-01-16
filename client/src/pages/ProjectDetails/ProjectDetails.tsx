import styles from "./ProjectDetails.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParallax } from "../../hooks/useParallax";
import slugify from "slugify";
import TechCard from "../../components/TechCard/TechCard";
import NotFound from "../NotFound/NotFound";

import { type Project } from "../../types/project";
import { type Technology } from "../../types/technology";

import Modal from "react-modal";
Modal.setAppElement("#root");
import "./CustomModalStyle.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CustomSwiperStyle.scss";

const ProjectDetails = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const { projectSlug } = useParams();

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

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/data/technologies.json`)
      .then((res) => res.json())
      .then((data: Technology[]) => {
        setTechnologies(data);
      });
  }, [apiUrl]);

  const currentProject = projects.find(
    (project) => slugify(project.title, { lower: true }) === projectSlug
  );

  // Banner //
  const bannerBackgroundRef = useParallax(0.2);
  const [imgLoaded, setImgLoaded] = useState(false);

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

  // Screenshot Modal //
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  if (!currentProject && projects.length > 0) {
    return <NotFound />;
  }

  return (
    <div className={styles.projectDetails}>
      <title>{`Milos Ristic ${
        currentProject ? `| ${currentProject.title}` : ""
      }`}</title>
      
      <div className={`banner ${styles.banner}`}>
        <div
          className={`bannerText ${styles.bannerText} loadFade`}
          style={{
            opacity: currentProject ? 1 : 0,
          }}
        >
          <h1>{currentProject?.title}</h1>
          <p>{currentProject?.snippet}</p>
        </div>
        <div
          ref={bannerBackgroundRef}
          className={`bannerHeroWrapper loadFade ${styles.bannerHeroWrapper} ${
            imgLoaded ? styles.loaded : ""
          }`}
          style={{
            opacity: currentProject ? 1 : 0,
          }}
        >
          <img
            src={`${apiUrl}/api/assets/${currentProject?.screenshots[0]}`}
            className={styles.bannerHero}
            alt="Projects Hero"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      </div>

      <section
        className={`${styles.projectInfoSection} loadFade`}
        style={{
          opacity: currentProject ? 1 : 0,
        }}
      >
        <div className={`content ${styles.content} ${styles.challengeSection}`}>
          <h2>The Challenge</h2>
          <p>{currentProject?.challenge}</p>
        </div>
        <div className={`content ${styles.content} ${styles.solutionSection}`}>
          <h2>The Solution</h2>
          <p>{currentProject?.solution}</p>
        </div>
      </section>

      <section
        className={`${styles.screenshotsSection} loadFade`}
        style={{
          opacity: currentProject ? 1 : 0,
        }}
      >
        <div className={`content ${styles.content}`}>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            spaceBetween={20}
            navigation
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
          >
            {currentProject?.screenshots.map((screenshot, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${apiUrl}/api/assets/${screenshot}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setModalImg(`${apiUrl}/api/assets/${screenshot}`);
                    setModalOpen(true);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination" />
        </div>

        <Modal
          isOpen={modalOpen}
          closeTimeoutMS={300}
          onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.9)", zIndex: 1000 },
            content: {
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              inset: 0,
            },
          }}
          contentLabel="Screenshot Fullscreen"
        >
          {modalImg && (
            <>
              <div
                onClick={() => setModalOpen(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 0,
                }}
              ></div>

              <div
                className="modalContent"
                style={{
                  position: "absolute",
                  zIndex: 2,
                }}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className={styles.closeModalButton}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    opacity: 0.9,
                    zIndex: 3,
                  }}
                >
                  Close
                </button>
                <img
                  src={modalImg}
                  alt="Fullscreen Screenshot"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: 2,
                    zIndex: 1,
                  }}
                />
              </div>
            </>
          )}
        </Modal>
      </section>

      {(currentProject?.projectUrl || currentProject?.githubUrl) && (
        <section className={styles.viewProjectSection}>
          <div className={`content ${styles.content}`}>
            <h2>View The Project</h2>
            {currentProject?.projectUrl && (
              <p>
                <a
                  href={currentProject?.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {currentProject?.title}
                </a>
              </p>
            )}
            {currentProject?.githubUrl && (
              <p>
                <a
                  href={currentProject?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      <section className={styles.techStackSection}>
        <div className={`content ${styles.content}`}>
          <h2>The Stack</h2>
          <div className={styles.techStackGrid}>
            {technologiesWithProjectCount
              .filter((tech) =>
                currentProject?.technologies.includes(tech.value)
              )
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
    </div>
  );
};

export default ProjectDetails;
