import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "light" | "dark";
type ButtonSize = "default" | "compact";

type SharedButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  minWidth?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  SharedButtonProps & {
    href: string;
  };

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedButtonProps & {
    href?: never;
  };

type ButtonProps = ButtonLinkProps | ButtonElementProps;

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
  icon,
  minWidth,
  size = "default",
  style,
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonClassName = getButtonClassName(variant, size, className);
  const fullClassName = `${buttonClassName} ${minWidth ? styles.wide : ""}`;
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

  if (typeof props.href === "string") {
    const { href, ...linkProps } = props as ButtonLinkProps;

    if (href.startsWith("/")) {
      return (
        <Link className={fullClassName} href={href} style={buttonStyle} {...linkProps}>
          {content}
        </Link>
      );
    }

    return (
      <a className={fullClassName} href={href} style={buttonStyle} {...linkProps}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonElementProps;

  return (
    <button className={fullClassName} style={buttonStyle} {...buttonProps}>
      {content}
    </button>
  );
}
