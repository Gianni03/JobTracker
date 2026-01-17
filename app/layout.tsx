import type { Metadata } from "next";
import { Inter } from "next/font/google"; // O la fuente que tengas
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar"; // <--- Importamos

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobTracker AI",
  description: "Gestiona tus postulaciones inteligentemente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex min-h-screen">
          {/* El Sidebar fijo a la izquierda */}
          <Sidebar />
          
          {/* El contenido principal empujado a la derecha (ml-64 = margin-left 256px ancho sidebar) */}
          <main className="flex-1 md:ml-64 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}