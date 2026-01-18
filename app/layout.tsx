import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "JobTracker",
  description: "Gestiona tus postulaciones inteligentemente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50">
        {children} 
      </body>
    </html>
  );
}