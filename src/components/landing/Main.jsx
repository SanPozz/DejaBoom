import {Play, Star} from "lucide-react"
import { Link } from "react-router-dom"

import coverds3 from "../../assets/covers/ds3_cover.png"
import coverEldenRing from "../../assets/covers/EldenRing_Cover.png"
import coversaac from "../../assets/covers/cover_isaac.png"
import coversminecraft from "../../assets/covers/minecraft_cover.png"

const Main = () => {
  
  const covers = [
    { src: coverds3, alt: "Dark Souls 3", rating: 5 },
    { src: coverEldenRing, alt: "Elden Ring", rating: 5 },
    { src: coversaac, alt: "the Binding of Isaac", rating: 4 },
    { src: coversminecraft, alt: "Minecraft", rating: 4.5 }
  ]

  return (
    <main className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 bg-background px-4 sm:px-6 lg:px-10 py-10 lg:py-16">

        <div className="max-w-2xl w-full text-center lg:text-left">

            <span className="inline-flex items-center gap-2 rounded-full border border-tertiary bg-primary/10 px-4 py-2 text-xs font-medium text-primary mb-8">
              <span className="size-2 rounded-full bg-primary" />
              Más de 100k juegos rastreados esta temporada
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight text-secondary">
                Registra todos tus juegos. <span className="text-primary">Comparte lo que amas.</span> Descubre lo que te falta.
            </h1>

            <p className="text-sm sm:text-base text-tertiary mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">DejaBoom es una aplicación social para gamers. Registra y puntúa tus juegos favoritos, crea listas y sigue a tus amigos para descubrir tu próxima obsesión.</p>

            <Link to="/register" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-10 sm:mb-12">
              <a href="" className="px-6 py-2 bg-primary rounded-2xl text-md font-medium text-background hover:cursor-pointer btn-glow transition-all duration-300 text-center">Empieza tu bitácora, es gratis</a>
            </Link>

            <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex -space-x-3">
                {Array.from({ length: 4 }).map(
                  (c, i) => (
                    <span
                      key={i}
                      className={`size-6 rounded-full border-2 border-primary bg-background-secondary ${c}`}
                    />
                  ),
                )}
              </div>
                <span className="text-xs text-tertiary">
                    Unido por <span className="text-primary font-semibold">30k+</span> jugadores
                </span>
            </div>

        </div>

        <div className="relative overflow-visible w-full max-w-md lg:max-w-lg">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 overflow-visible">
            {covers.map((cover, i) => {
              return (
                <div
                  key={cover.src}
                  className={`group relative aspect-3/4 rounded-xl border border-tertiary bg-background shadow-2xl transition-all duration-300 hover:scale-[1.04] ${i % 2 === 1 ? "translate-y-4 sm:translate-y-6" : ""
                    }`}
                >
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    className="w-full h-full object-cover transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 to-transparent p-3">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, s) => {
                        const ratingValue = s + 1
                        const isFilled = ratingValue <= Math.floor(cover.rating)
                        const isHalf = ratingValue === Math.ceil(cover.rating) && cover.rating % 1 === 0.5
                        
                        return (
                          <div key={s} className="relative">
                            <Star className="size-3 fill-none opacity-40" />
                            {(isFilled || isHalf) && (
                              <div className={`absolute inset-0 overflow-hidden ${isHalf ? "w-1/2" : "w-full"}`}>
                                <Star className="size-3 fill-primary" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

    </main>
  )
}

export default Main