import { Link } from "react-router-dom"

function CTASection() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 bg-background-secondary">
      <section 
        className="relative w-full py-14 sm:py-20 lg:py-24 px-4 sm:px-8 overflow-hidden rounded-2xl border border-tertiary shadow-lg"
        style={{
          background: 'radial-gradient(circle at center, rgba(103, 228, 91, 0.15) 0%, transparent 70%), #0A0D12'
        }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Inicia tu diario de juegos hoy
          </h2>
          
          
          <p className="text-sm sm:text-lg text-tertiary mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Gratis para siempre para uso personal. Crea una cuenta en segundos y registra tu primer juego antes de que termine la próxima pantalla de carga.
          </p>
          
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link to='/register'className="px-8 py-3 bg-primary text-background rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 cursor-pointer w-full sm:w-auto">
              Crear cuenta gratis
            </Link>
            <Link to='/home' className="px-8 py-3 border-2 border-tertiary text-white rounded-full text-sm font-semibold transition-all duration-300 hover:border-primary hover:text-primary cursor-pointer w-full sm:w-auto">
              Explorar la comunidad
            </Link>
          </div>
          
          
          <p className="text-sm text-tertiary">
            Hecho para jugadores, por jugadores. 
          </p>
        </div>
      </section>
    </div>
  )
}

export default CTASection
