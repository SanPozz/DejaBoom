import logo from "../../assets/dejaboompng.png"

function Footer() {
  return (
    <footer className="w-full bg-background-secondary border-t border-tertiary py-6 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          <div>
            <img src={logo} alt="DejaBoom Logo" className="h-20 sm:h-24" />
          </div>
          
          
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 text-tertiary text-sm">
            <a href="#" className="hover:text-primary transition-colors duration-300 cursor-pointer">
              Inicio
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 cursor-pointer">
              Comunidad
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 cursor-pointer">
              Contacto
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 cursor-pointer">
              Privacidad
            </a>
          </div>
          
          
          <div className="text-tertiary text-xs text-center">
            © 2026 DejaBoom. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
