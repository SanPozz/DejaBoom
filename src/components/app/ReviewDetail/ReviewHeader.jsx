import { Link } from "react-router-dom"
import { ArrowLeft, Clock, Gamepad2 } from "lucide-react"
import ReviewScore from "./ReviewScore"

const Chip = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-tertiary/80 border border-white/8 rounded-full px-2.5 py-1">
    <Icon className="w-3 h-3 text-primary" /> {children}
  </span>
)


const ReviewHeader = ({ review, cover, artwork, game }) => {

  const handleBack = () => {
    window.history.back()
  }
  
  return (
  <header className="relative overflow-hidden border-b border-white/6">
    {game && (
      <img
        src={artwork ?? cover}
        alt=""
        aria-hidden
        className={`absolute inset-0 w-full h-full object-cover scale-110 ${artwork ? "opacity-50 blur-[3px]" : "opacity-25 blur-2xl"}`}
      />
    )}
    <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-background/10" />

    <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-10 space-y-6">
      <button onClick={handleBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-primary transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver
      </button>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch sm:items-start">
        <div className="flex gap-4 sm:gap-6 items-start flex-1 min-w-0">
        <div className="relative w-28 sm:w-44 aspect-3/4 shrink-0">
          {game && (
            <img src={cover} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover rounded-xl blur-xl opacity-70 scale-[1.08]" />
          )}
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
            {game ? (
              <img src={cover} alt={game.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full animate-pulse bg-white/6" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Reseña de</p>
          {game ? (
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white wrap-break-word">{game.title}</h1>
          ) : (
            <div className="h-9 w-2/3 rounded animate-pulse bg-white/6" />
          )}

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-black text-black shrink-0 ring-2 ring-background-secondary">
              {review.user?.nickname.charAt(0).toUpperCase()}
            </div>
            <Link to="/profile" className="text-sm font-bold text-secondary hover:text-primary transition-colors">{review.user?.nickname}</Link>
            <span className="text-[11px] text-tertiary/60">· {new Date(review.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip icon={Gamepad2}>PC</Chip>
            <Chip icon={Clock}>60 h jugadas</Chip>
          </div>
        </div>
        </div>

        <ReviewScore rating={review.rating} />
      </div>
    </div>
  </header>
  )
}

export default ReviewHeader
