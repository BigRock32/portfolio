import type { Metadata } from "next";
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
        <div className="pageBackground" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
