"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { Project } from "@/data/projects";
import styles from "./ProjectsSection.module.css";

type ProjectsSectionProps = {
  projects: Project[];
  variant?: "featured" | "all";
};

type ProjectCardProps = {
  project: Project;
  layout: "wide" | "compact";
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
};

function ProjectCard({ project, layout, onOpen }: ProjectCardProps) {
  return (
    <article className={`${styles.card} ${layout === "wide" ? styles.cardWide : styles.cardCompact}`}>
      <button
        className={styles.cardButton}
        type="button"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-haspopup="dialog"
      >
        <span className={styles.stackPreview}>
          {project.stack.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>

        <span className={styles.imageFrame}>
          <Image
            src={project.image}
            alt=""
            fill
            sizes={layout === "wide" ? "(max-width: 64rem) 100vw, 42vw" : "(max-width: 64rem) 100vw, 28vw"}
            className={styles.cardImage}
            unoptimized
          />
        </span>

        <span className={styles.cardText}>
          <span className={styles.cardTitleRow}>
            <strong>{project.title}</strong>
            <span className={styles.viewButton}>
              <Icon name="arrow-right" />
            </span>
          </span>
          <span className={styles.cardSummary}>{project.summary}</span>
        </span>
      </button>
    </article>
  );
}

export function ProjectsSection({ projects, variant = "featured" }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isFeatured = variant === "featured";

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  useEffect(() => {
    if (!activeProject) {
      document.body.classList.remove("modal-open");
      lastTriggerRef.current?.focus();
      return;
    }

    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  const ogImage = activeProject?.og.image ?? activeProject?.image;

  return (
    <section className={`${styles.section} ${isFeatured ? styles.featured : styles.allProjects}`} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{isFeatured ? "Featured Work" : "All Projects"}</h2>
          {isFeatured ? (
            <Button href="/projects" icon={<Icon name="arrow-up-right" />} variant="secondary">
              View All Projects
            </Button>
          ) : (
            <p>
              A broader archive of Webflow builds, frontend systems, integrations, and automation
              work.
            </p>
          )}
        </div>

        <div className={isFeatured ? styles.featuredGrid : styles.archiveGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={isFeatured && index < 2 ? "wide" : "compact"}
              onOpen={openProject}
            />
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className={styles.overlay} onMouseDown={closeProject}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.modalTop}>
              <p>Project detail</p>
              <button
                ref={closeButtonRef}
                className={styles.closeButton}
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className={styles.modalGrid}>
              <aside className={styles.modalMedia}>
                <span className={`${styles.imageFrame} ${styles.modalImageFrame}`}>
                  <Image
                    src={activeProject.image}
                    alt={`${activeProject.title} preview`}
                    fill
                    sizes="(max-width: 64rem) 100vw, 46vw"
                    className={styles.modalImage}
                    unoptimized
                  />
                </span>
                <a
                  className={styles.ogPreview}
                  href={activeProject.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${activeProject.title}`}
                >
                  <span className={styles.ogThumb} aria-hidden="true">
                    {ogImage ? (
                      <Image
                        src={ogImage}
                        alt=""
                        fill
                        sizes="7rem"
                        className={styles.ogImage}
                        unoptimized
                      />
                    ) : null}
                  </span>
                  <span>
                    <strong>{activeProject.og.title}</strong>
                    <small>{activeProject.og.description}</small>
                    <em>{activeProject.og.url}</em>
                  </span>
                </a>
              </aside>

              <div className={styles.modalContent}>
                <h3 id="project-modal-title">{activeProject.title}</h3>
                <p>{activeProject.description}</p>

                <div className={styles.detailBlock}>
                  <h4>Stack</h4>
                  <ul className={styles.modalStack}>
                    {activeProject.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.detailBlock}>
                  <h4>Role / Work done</h4>
                  <p>{activeProject.role}</p>
                </div>

                <div className={styles.detailBlock}>
                  <h4>Published</h4>
                  <p>{activeProject.publishedDate}</p>
                </div>

                <Button
                  href={activeProject.url}
                  icon={<Icon name="arrow-circle-up-right" />}
                  target="_blank"
                  rel="noreferrer"
                  variant="dark"
                >
                  Open project
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
