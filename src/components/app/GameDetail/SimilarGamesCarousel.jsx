import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import Bone from "../Bone"

const SimilarGamesSkeleton = () => (
  <div aria-busy="true" aria-label="Cargando juegos similares">
    {/* Mobile */}
    <div className="flex gap-3 overflow-hidden lg:hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[38%] min-w-[130px] shrink-0 sm:w-[28%] sm:min-w-[170px]">
          <Bone className="mb-2 aspect-3/4 w-full rounded-lg" />
          <Bone className="mb-1.5 h-4 w-3/4" />
          <Bone className="h-3 w-10" />
        </div>
      ))}
    </div>

    {/* Escritorio */}
    <div className="hidden lg:grid grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Bone className="mb-4 aspect-3/4 w-full rounded-xl" />
          <Bone className="mb-2 h-5 w-3/4" />
          <Bone className="h-4 w-12" />
        </div>
      ))}
    </div>
  </div>
)

const SimilarGamesCarousel = ({ games, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerView = 3
  const maxIndex = Math.max(0, games.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const visibleGames = games.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-1 sm:mb-2">
            Juegos Similares
          </h2>
          <p className="text-tertiary text-sm md:text-base">
            Explora otros juegos que te podrían interesar
          </p>
        </div>
      </div>

      {loading ? (
        <SimilarGamesSkeleton />
      ) : games.length === 0 ? (
        <p className="text-sm text-tertiary">No hay juegos similares para mostrar.</p>
      ) : (
      <>
      {/* Mobile: scroll horizontal con snap */}
      <div className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 gap-3 overflow-x-auto px-4 pb-2 sm:px-6 sm:-mx-6 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {games.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="group w-[38%] min-w-[130px] shrink-0 snap-start cursor-pointer sm:w-[28%] sm:min-w-[170px]">
            <div className="mb-2 aspect-[3/4] overflow-hidden rounded-lg border border-tertiary/15 bg-background-secondary">
              {game.cover && <img src={game.cover} alt={game.title} className="h-full w-full object-cover" />}
            </div>
            <h3 className="line-clamp-2 text-sm font-semibold text-secondary">{game.title}</h3>
            <p className="text-xs text-tertiary">{game.releaseDate?.getUTCFullYear()}</p>
          </Link>
        ))}
      </div>

      {/* Carousel Container (lg+) */}
      <div className="relative hidden lg:block">
        {/* Games Grid */}
        <div className="grid grid-cols-3 gap-6">
          {visibleGames.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 bg-background-secondary aspect-[3/4] border border-tertiary/15 hover:border-tertiary/50 transition-all duration-300">
                {game.cover && (
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base">
                {game.title}
              </h3>
              <p className="text-tertiary text-xs md:text-sm">
                {game.releaseDate?.getUTCFullYear()}
              </p>
            </Link>
          ))}
        </div>

        {/* Navigation Buttons */}
        {games.length > itemsPerView && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="text-primary" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} className="text-primary" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-tertiary/30 w-2 hover:bg-tertiary/50"
                  }`}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      </>
      )}
    </section>
  )
}

export default SimilarGamesCarousel
