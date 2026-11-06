import { Link } from "react-router-dom"
import ReviewStars from "./ReviewStars"

//HARDCODED DATA 

const MoreReviews = ({ reviews }) => (
  <section className="space-y-3">
    <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary">Más reseñas</h2>
    {reviews.map((r) => (
      <Link
        key={r.id}
        to={`/review/${r.id}`}
        className="block bg-background-secondary border border-white/[0.07] rounded-xl p-4 space-y-2 hover:border-primary/35 transition-colors"
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-black text-white truncate">{r.gameTitle}</h3>
          <ReviewStars rating={r.rating} className="text-[10px] px-2 py-0.5" />
        </div>
        <p className="text-xs text-tertiary/80 leading-relaxed line-clamp-2">{r.text}</p>
        <span className="text-[10px] text-tertiary/50">{r.date}</span>
      </Link>
    ))}
  </section>
)

export default MoreReviews
