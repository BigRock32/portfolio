import type { Metadata } from "next";
import { assetPath } from "@/lib/assetPath";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasilii | Webflow / JavaScript Developer",
  description:
    "Portfolio of Vasilii, a remote Webflow and JavaScript developer building fast marketing sites, automations, and custom integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className="pageBackground"
          style={{ backgroundImage: `url("${assetPath("/hero-background.jpg")}")` }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
