import FormLogIn from "../components/login/FormLogIn"
import heroLogin from "../assets/Login/hero-bg.png"

import { Link } from "react-router-dom"


const LogIn = () => {


  return (
    <main className="bg-background min-h-screen">

      <Link to="/" className="absolute left-4 top-5 z-10 sm:left-6 sm:top-6"><span className="text-background bg-primary text-sm font-semibold font-sans btn-glow rounded-xl px-3 py-2 sm:px-4 sm:text-md">Volver al inicio</span></Link>

      <div className="flex min-h-screen w-full flex-col items-stretch justify-center lg:flex-row lg:items-center lg:gap-12 lg:pr-8 xl:gap-20 xl:pr-15">

        <div className="flex min-h-[42vh] w-full items-center overflow-hidden border-b border-tertiary bg-cover bg-center px-6 py-24 sm:px-10 lg:min-h-screen lg:w-1/2 lg:border-b-0 lg:border-r lg:px-12 lg:py-0 xl:px-20" style={{ backgroundImage: `linear-gradient(rgba(13, 17, 23, 0.6), rgba(13, 17, 23, 0.8)), url(${heroLogin})` }}>
          <div className="flex w-full flex-col items-start justify-center gap-4 sm:gap-6">
            <h1 className="text-3xl font-bold leading-snug text-secondary sm:text-4xl lg:text-5xl">
              Bienvenido a <span className="text-primary">DejaBoom</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-tertiary sm:text-lg">
              Inicia sesión para descubrir tu próximo juego favorito, compartir tus experiencias y conectar con otros jugadores.
            </p>
          </div>
        </div>

        <FormLogIn />

      </div>

    </main>
  )
}

export default LogIn