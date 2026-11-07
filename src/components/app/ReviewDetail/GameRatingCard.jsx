import { Link } from "react-router-dom"

const ratingDistribution = [
  { stars: 5, pct: 58 },
  { stars: 4, pct: 24 },
  { stars: 3, pct: 11 },
  { stars: 2, pct: 5 },
  { stars: 1, pct: 2 },
]

//HARDCODED DATA 

const GameRatingCard = ({ gameId }) => (
  <section className="bg-background-secondary border border-white/[0.07] rounded-2xl p-5 space-y-4">
    <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary">Valoraciones del juego</h2>
    <div className="flex items-end gap-2">
      <span className="text-4xl font-black text-white leading-none">4.6</span>
      <span className="text-xs text-tertiary/60 pb-1">de 5 · 1.248 reseñas</span>
    </div>
    <div className="space-y-1.5">
      {ratingDistribution.map(({ stars, pct }) => (
        <div key={stars} className="flex items-center gap-2 text-[11px] text-tertiary/70">
          <span className="w-3">{stars}</span>
          <div className="flex-1 h-1.5 rounded-full bg-background overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="w-8 text-right">{pct}%</span>
        </div>
      ))}
    </div>
    <Link to={`/game/${gameId}`} className="block text-center text-xs font-bold text-black bg-primary hover:opacity-90 rounded-md py-2 transition-opacity">
      Ver el juego
    </Link>
  </section>
)

export default GameRatingCard
