import styles from "./ProjectDetails.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParallax } from "../../hooks/useParallax";
import slugify from "slugify";
import TechCard from "../../components/TechCard/TechCard";
import NotFound from "../NotFound/NotFound";

import { projects } from "../../data/projects";
import { technologies } from "../../data/technologies";

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
  const { projectSlug } = useParams();
  const currentProject = projects.find(
    (p) => slugify(p.title, { lower: true }) === projectSlug
  );

  // Banner //
  const bannerBackgroundRef = useParallax(0.2);

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

  if (!currentProject) {
    return <NotFound />;
  }

  return (
    <div className={styles.projectDetails}>
      <div className={`banner ${styles.banner}`}>
        <div className={`bannerText ${styles.bannerText}`}>
          <h1>{currentProject?.title}</h1>
          <p>{currentProject?.snippet}</p>
        </div>
        <div
          ref={bannerBackgroundRef}
          className={`bannerHeroWrapper ${styles.bannerHeroWrapper}`}
        >
          <img
            src={currentProject?.screenshots[0]}
            className={styles.bannerHero}
            alt="Projects Hero"
          />
        </div>
      </div>

      <section className={styles.projectInfoSection}>
        <div className={`content ${styles.content}`}>
          <h2>The Challenge</h2>
          <p>{currentProject?.challenge}</p>
        </div>
        <div className={`content ${styles.content}`}>
          <h2>The Solution</h2>
          <p>{currentProject?.solution}</p>
        </div>
      </section>

      <section className={styles.screenshotsSection}>
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
                  src={screenshot}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setModalImg(screenshot);
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
                currentProject.technologies?.includes(tech.value)
              )
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
    </div>
  );
};

export default ProjectDetails;
