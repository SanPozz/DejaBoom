import FormRegister from "../components/register/FormRegister"
import heroRegister from "../assets/Login/hero-bg.png"

import { Link } from "react-router-dom"

const Register = () => {

    

  return (
    <main className="min-h-screen bg-background lg:h-screen">

      <Link to="/" className="fixed left-4 top-4 z-10 rounded-xl bg-primary px-4 py-2 font-sans text-md font-semibold text-background btn-glow sm:left-5 sm:top-6">Volver al inicio</Link>

      <div className="flex min-h-screen w-full flex-col items-stretch lg:h-full lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:pr-10">

        <div className="flex min-h-[280px] w-full items-center bg-cover bg-center px-6 pb-8 pt-20 sm:min-h-[320px] sm:px-12 lg:h-full lg:w-1/2 lg:border-r lg:border-tertiary lg:px-20 lg:py-12" style={{ backgroundImage: `linear-gradient(rgba(13, 17, 23, 0.6), rgba(13, 17, 23, 0.8)), url(${heroRegister})` }}>
          <div className="flex w-full flex-col items-start justify-center gap-4 sm:gap-6">
            <h1 className="text-3xl font-bold leading-snug text-secondary sm:text-4xl lg:text-5xl">
              Únete a <span className="text-primary">DejaBoom</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-tertiary sm:text-lg">
              Crea tu cuenta para comenzar a registrar tus juegos, descubrir nuevas experiencias y conectar con la comunidad gamer.
            </p>
          </div>
        </div>

        <FormRegister />

      </div>

    </main>
  )
}

export default Register
