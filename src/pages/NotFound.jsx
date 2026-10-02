import { Gamepad2, Home } from "lucide-react"
import { Link } from "react-router-dom"

import logo from "../assets/dejaboompng.png"

const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-10 py-16 text-center">

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

      <Link to="/" className="relative z-10 flex items-center gap-2 mb-10">
        <img src={logo} alt="Logo" className="h-12 sm:h-14 w-auto" />
      </Link>

      <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-tertiary bg-primary/10 px-4 py-2 text-xs font-medium text-primary mb-8">
        <Gamepad2 size={14} />
        Error 404
      </span>

      <h1 className="relative z-10 text-6xl sm:text-7xl md:text-8xl font-bold mb-4 leading-tight text-primary">
        404
      </h1>

      <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-secondary">
        Esta pantalla no fue encontrada
      </h2>

      <p className="relative z-10 text-sm sm:text-base text-tertiary mb-10 max-w-md leading-relaxed">
        Parece que te perdiste en el mapa. La página que buscas no existe o fue movida a otra ubicación.
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary rounded-2xl text-md font-medium text-background hover:cursor-pointer btn-glow transition-all duration-300"
        >
          <Home size={18} />
          Volver al inicio
        </Link>
      </div>

    </div>
  )
}

export default NotFound
