import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/assetPath";

export type IconName =
  | "arrow-circle-up-right"
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "category"
  | "download"
  | "external-link"
  | "github"
  | "gmail"
  | "linkedin"
  | "scan"
  | "send"
  | "tiles";

type IconProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  name: IconName;
  alt?: string;
};

const iconSources: Record<IconName, string> = {
  "arrow-circle-up-right": "/icons/arrow-circle-up-right.svg",
  "arrow-right": "/icons/arrow-narrow-right.svg",
  "arrow-up": "/icons/footer-arrow-up.svg",
  "arrow-up-right": "/icons/arrow-narrow-up-right.svg",
  category: "/icons/category.svg",
  download: "/icons/download-04.svg",
  "external-link": "/icons/link-external-01.svg",
  github: "/icons/github.svg",
  gmail: "/icons/google.svg",
  linkedin: "/icons/linkedin.svg",
  scan: "/icons/focus.svg",
  send: "/icons/telegram.svg",
  tiles: "/icons/category.svg",
};

export function Icon({ name, alt = "", ...props }: IconProps) {
  return (
    <Image
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      height={24}
      src={assetPath(iconSources[name])}
      unoptimized
      width={24}
      {...props}
    />
  );
}
