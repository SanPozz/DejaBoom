import FormRegister from "../components/register/FormRegister"
import heroRegister from "../assets/Login/hero-bg.png"

import { Link } from "react-router-dom"

const Register = () => {

    

  return (
    <main className="bg-background h-screen">

      <Link to="/" className="absolute"><span className="text-background bg-primary text-md font-semibold font-sans btn-glow py-2 px-4 top-10 left-5 rounded-xl">Volver al inicio</span></Link>

      <div className="w-full pr-15 flex items-center justify-center gap-20 h-full">

        <div className="bg-center bg-cover px-20 h-full w-1/2 border-r border-tertiary" style={{ backgroundImage: `linear-gradient(rgba(13, 17, 23, 0.6), rgba(13, 17, 23, 0.8)), url(${heroRegister})` }}>
          <div className="h-full w-full flex flex-col items-start justify-center gap-6">
            <h1 className="text-5xl font-bold text-secondary leading-snug">
              Únete a <span className="text-primary">DejaBoom</span>
            </h1>
            <p className="text-lg text-tertiary max-w-md leading-relaxed">
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
