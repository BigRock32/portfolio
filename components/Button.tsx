import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "light" | "dark";
type ButtonSize = "default" | "compact";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  icon?: ReactNode;
  minWidth?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

function getButtonClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [
    styles.button,
    styles[variant],
    size === "compact" ? styles.compact : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  className,
  href,
  icon,
  minWidth,
  size = "default",
  style,
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonClassName = getButtonClassName(variant, size, className);
  const buttonStyle = {
    ...style,
    ...(minWidth ? ({ "--button-min-width": minWidth } as CSSProperties) : null),
  };
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className={`${buttonClassName} ${minWidth ? styles.wide : ""}`} href={href} style={buttonStyle} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a className={`${buttonClassName} ${minWidth ? styles.wide : ""}`} href={href} style={buttonStyle} {...props}>
      {content}
    </a>
  );
}
