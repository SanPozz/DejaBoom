import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SimilarGamesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const similarGames = [
    {
      id: 1,
      title: "Elden Ring",
      image: "https://images.unsplash.com/photo-1538481143235-da08409cc288?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Bloodborne",
      image: "https://images.unsplash.com/photo-1552062407-291817635bae?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Sekiro: Shadows Die Twice",
      image: "https://images.unsplash.com/photo-1511882150382-421b4717cf44?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Dark Souls II",
      image: "https://images.unsplash.com/photo-1538481143235-da08409cc288?auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
    },
    {
      id: 5,
      title: "Demon's Souls",
      image: "https://images.unsplash.com/photo-1552062407-291817635bae?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
    },
  ]

  const itemsPerView = 3
  const maxIndex = Math.max(0, similarGames.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const visibleGames = similarGames.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            Juegos Similares
          </h2>
          <p className="text-tertiary text-sm md:text-base">
            Explora otros juegos que te podrían interesar
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGames.map((game) => (
            <div
              key={game.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 bg-background-secondary aspect-[3/4] border border-tertiary/15 hover:border-tertiary/50 transition-all duration-300">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-primary font-bold flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base">
                {game.title}
              </h3>
              <p className="text-tertiary text-xs md:text-sm">
                {game.rating} de 5
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {similarGames.length > itemsPerView && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="text-primary" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
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
                  className={`h-2 rounded-full transition-all ${
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
    </section>
  )
}

export default SimilarGamesCarousel
