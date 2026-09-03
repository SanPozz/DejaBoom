import { Link } from "react-router-dom"

const ListItem = ({ game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-tertiary/15 bg-background-secondary hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(103,228,91,0.08)]"
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="rounded-full border border-white/20 bg-black/35 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {game.platform}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[9px] font-bold text-black shadow-lg shadow-primary/20">
              ★ {game.communityRating.toFixed(1)}
            </span>
          </div>

          <h2 className="text-sm font-bold text-white leading-tight line-clamp-2">
            {game.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default ListItem
