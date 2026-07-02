import { Icon, type IconName } from "@/components/Icon";
import { assetPath } from "@/lib/assetPath";
import styles from "./Footer.module.css";

const socials: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "GitHub", href: "https://github.com/BigRock32", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vasilii-samarin-6a4184254",
    icon: "linkedin",
  },
  { label: "Telegram", href: "https://t.me/Vaska325", icon: "send" },
  { label: "Email", href: "mailto:vasya.samarin.00@gmail.com", icon: "gmail" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <h2>Vasilii Samarin</h2>
            <p>Clean frontend development, scalable CMS systems, and practical automations</p>
          </div>
          <div className={styles.footerActions}>
            <nav className={styles.footerNav} aria-label="Footer navigation">
              <a href={assetPath("/#projects")}>Projects</a>
              <a href={assetPath("/#about")}>About</a>
              <a href={assetPath("/#contacts")}>Contacts</a>
            </nav>
            <a className={styles.footerCircle} href="#" aria-label="Back to top">
              <Icon name="arrow-up" />
            </a>
          </div>
        </div>

        <div className={styles.footerContact}>
          <a className={styles.footerScheduleButton} href="mailto:vasya.samarin.00@gmail.com">
            <span>Schedule a free consultation</span>
            <Icon name="calendar-plus" />
          </a>
          <span className={styles.footerLine} aria-hidden="true" />
          <div className={styles.footerSocials} aria-label="Social links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                <Icon name={social.icon} className={social.icon === "gmail" ? styles.footerGoogleIcon : ""} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Samarin Vasilii</span>
          <span>Handcrafted with <a href="https://www.linkedin.com/in/alevtinka">Alevtinka</a></span>
          {/* <span className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Settings</a>
          </span> */}
        </div>
      </div>
    </footer>
  );
}
