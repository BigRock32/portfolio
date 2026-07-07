"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import styles from "./Header.module.css";

const navItems = [
  { label: "Projects", href: "/projects" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label="Vasilii portfolio home">
          Vasilii Samarin
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={assetPath(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
