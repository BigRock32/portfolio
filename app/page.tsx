import Image from "next/image";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon, type IconName } from "@/components/Icon";
import { ProjectsSection } from "@/components/ProjectsSection";
import ogCache from "@/data/og-cache.json";
import { projects, type Project } from "@/data/projects";
import { assetPath } from "@/lib/assetPath";
import styles from "./page.module.css";

const socials: Array<{ label: string; value: string; href: string; icon: IconName }> = [
  { label: "GitHub", value: "BigRock32", href: "https://github.com/BigRock32", icon: "github" },
  {
    label: "LinkedIn",
    value: "Vasilii Samarin",
    href: "https://www.linkedin.com/in/vasilii-samarin-6a4184254",
    icon: "linkedin",
  },
  { label: "Telegram", value: "Vaska325", href: "https://t.me/Vaska325", icon: "send" },
  {
    label: "Email",
    value: "vasya.samarin.00@gmail.com",
    href: "mailto:vasya.samarin.00@gmail.com",
    icon: "gmail",
  },
];

const featuredProjectIds = ["sdi", "dune", "bd-emerson", "flower-ai", "lingo"];

const ogCacheByProject = ogCache as Record<string, Partial<Project["og"]>>;
const projectsWithOg = projects.map((project) => ({
  ...project,
  og: {
    ...project.og,
    ...ogCacheByProject[project.id],
  },
}));

const featuredProjects = featuredProjectIds
  .map((id) => projectsWithOg.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className={`${styles.section} ${styles.hero}`} id="home">
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <p className={styles.heroIntro}>Hi, I&apos;m Vasilii</p>
                <h1>Webflow/JS developer</h1>
                <p className={styles.lead}>
                  with 5 years of experience. I create clean and scalable Webflow experiences with
                  custom JavaScript, thoughtful CMS architecture, smooth interactions, automations,
                  and integrations that help teams work more efficiently
                </p>
                <div className={styles.actions} aria-label="Primary actions">
                  <Button href="mailto:vasya.samarin.00@gmail.com" minWidth="6.75rem" variant="primary">
                    Get in touch
                  </Button>
                  <Button
                    href={assetPath("/cv/vasilii-samarin-cv.pdf")}
                    icon={<Icon name="download" />}
                    target="_blank"
                    minWidth="11.5625rem"
                    variant="secondary"
                  >
                    Download CV
                  </Button>
                </div>
              </div>

              <div className={styles.heroIllustration} aria-hidden="true">
                <Image
                  src={assetPath("/hero-illustration-transparent.png")}
                  alt=""
                  width={434}
                  height={434}
                  priority
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.socialsSection}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>My social media</h2>
            <ul className={styles.socialGrid} aria-label="Social media links">
              {socials.map((social) => (
                <li key={social.label}>
                  <a className={styles.socialCard} href={social.href} target="_blank" rel="noreferrer">
                    <span className={styles.socialIconWrap}>
                      <Icon
                        name={social.icon}
                        className={`${styles.socialIcon} ${social.icon === "gmail" ? styles.googleIcon : ""}`}
                      />
                    </span>
                    <span>
                      <strong>{social.label}</strong>
                      <small>{social.value}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProjectsSection projects={featuredProjects} variant="featured" />

        <section className={`${styles.section} ${styles.about}`} id="about">
          <div className={styles.container}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutCopy}>
                <h2>Developer building polished marketing systems and practical automations</h2>
                <p>
                  I help founders, agencies, and product teams turn design systems into reliable
                  Webflow experiences, enhance them with JavaScript, and connect the operational
                  workflows behind them
                </p>
                <p>
                  My work sits at the intersection of frontend development, no-code systems, and
                  automation — from CMS architecture and polished interactions to membership
                  systems, Airtable integrations, and n8n workflows
                </p>
              </div>

              <div className={styles.aboutMeta} aria-label="Work focus">
                <div className={styles.metaRow}>
                  <Icon name="scan" className={styles.metaIcon} />
                  <span>
                    <strong>Focus</strong>
                    <small>Webflow buildings, Custom JS, Integrations</small>
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <Icon name="tiles" className={styles.metaIcon} />
                  <span>
                    <strong>Core tools</strong>
                    <small>Webflow, Next.js, GSAP; Airtable, n8n, GAS</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.cta}`} id="contacts">
          <div className={styles.container}>
            <div
              className={styles.ctaPanel}
              style={{ backgroundImage: `url("${assetPath("/cta-background.png")}")` }}
            >
              <p>Available for work</p>
              <h2>Need a polished Webflow build or frontend support?</h2>
              <p>
                I build fast, scalable websites, smooth interactions, and practical automations for
                modern teams and brands
              </p>
              <Button
                href="mailto:vasya.samarin.00@gmail.com"
                icon={<Icon name="arrow-circle-up-right" />}
                variant="light"
              >
                Send Inquiry
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
