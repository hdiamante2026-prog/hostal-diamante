import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOSTAL DIAMANTE",
  description: "Aplicacion de Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-dvh w-full">
        {children}
      </body>
    </html>
  );
}