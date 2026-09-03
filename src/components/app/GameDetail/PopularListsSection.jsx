import { Users, Bookmark, Eye } from "lucide-react"

const PopularListsSection = ({ gameName = "Ember Souls" }) => {
  const popularLists = [
    {
      id: 1,
      name: "Los mejores soulslike de la historia",
      creator: "GameCritics",
      image: "https://images.unsplash.com/photo-1538481143235-da08409cc288?auto=format&fit=crop&w=300&q=80",
      followers: 12400,
      games: 25,
      description: "Una colección exhaustiva de los mejores juegos tipo souls jamás creados.",
    },
    {
      id: 2,
      name: "Desafio Aceptado: Los juegos mas dificiles",
      creator: "ProGamer_Elite",
      image: "https://images.unsplash.com/photo-1511882150382-421b4717cf44?auto=format&fit=crop&w=300&q=80",
      followers: 8900,
      games: 18,
      description: "Para los valientes. Los juegos más difíciles que te harán sudar.",
    },
    {
      id: 3,
      name: "Obras maestras atmosfericas",
      creator: "StoryLover",
      image: "https://images.unsplash.com/photo-1552062407-291817635bae?auto=format&fit=crop&w=300&q=80",
      followers: 15600,
      games: 32,
      description: "Juegos con mundos inmersivos y narrativas cautivadoras.",
    },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-tertiary/15">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
          En Listas Populares
        </h2>
        <p className="text-tertiary text-sm md:text-base">
          <span className="text-primary font-semibold">{gameName}</span> se encuentra en estas listas de la comunidad
        </p>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularLists.map((list) => (
          <div
            key={list.id}
            className="group bg-background-secondary border border-tertiary/15 rounded-xl overflow-hidden hover:border-tertiary/50 transition-all duration-300 hover:bg-background-secondary/80 cursor-pointer"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-40 bg-tertiary/10">
              <img
                src={list.image}
                alt={list.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Overlay Badge */}
              <div className="absolute top-3 right-3 bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-lg px-2.5 py-1">
                <span className="text-primary text-xs font-bold">+{list.games} juegos</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Creator */}
              <div className="flex items-center gap-2 text-tertiary text-xs">
                <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-[10px]">
                  {list.creator.charAt(0)}
                </div>
                <span className="font-medium">{list.creator}</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 text-sm md:text-base mb-1">
                  {list.name}
                </h3>
                <p className="text-tertiary text-xs line-clamp-2">
                  {list.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-xs pt-2 border-t border-tertiary/10">
                <div className="flex items-center gap-1.5 text-tertiary">
                  <Users size={14} className="text-primary/70" />
                  <span className="font-medium">{(list.followers / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center gap-1.5 text-tertiary">
                  <Bookmark size={14} className="text-primary/70" />
                  <span className="font-medium">{list.games}</span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 font-semibold text-sm transition-all duration-200">
                Ver Lista
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularListsSection
