import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kengir: Heroes of Sumeria",
  description: "Digitale implementatie van het bordspel Kengir: Heroes of Sumeria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
