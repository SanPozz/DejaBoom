

const Stats = () => {
  return (
    <section className="w-full bg-background-secondary border-y border-tertiary px-4 sm:px-8 lg:px-16 py-10 sm:py-12">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

        <div className="flex flex-col items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-primary font-mono">
                100k
            </span>
            <span className="text-sm sm:text-base text-tertiary text-center">Juegos rastreados</span>
        </div>

        <div className="flex flex-col items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-primary font-mono">
                30k
            </span>
            <span className="text-sm sm:text-base text-tertiary text-center">Jugadores unidos</span>
        </div>

        <div className="flex flex-col items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-primary font-mono">
                200k
            </span>
            <span className="text-sm sm:text-base text-tertiary text-center">
                Reseñas publicadas
            </span>
        </div>

        <div className="flex flex-col items-center gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-primary font-mono">
                20k
            </span>
            <span className="text-sm sm:text-base text-tertiary text-center">
                Listas personalizadas
            </span>
        </div>

        </div>

    </section>
  )
}

export default Stats