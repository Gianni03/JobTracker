// app/(public)/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la Landing */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-burnt-peach rounded-lg" />
          <span className="text-xl font-bold">JobTracker</span>
        </div>
        <Link 
          href="/login" 
          className="bg-primary text-white px-6 py-2 rounded-full font-medium"
        >
          Iniciar Sesión
        </Link>
      </header>

      {/* Hero Section (Basado en tu HTML) */}
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
          Gestiona tus postulaciones <br />
          <span className="text-primary bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            como un profesional
          </span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Centraliza tus entrevistas, salarios y feedback en un solo lugar. 
          Lleva el control total de tu carrera.
        </p>
      </main>
    </div>
  );
}