import { Link } from "react-router-dom"
import { CheckCircle2, Gamepad2, Heart } from "lucide-react"
import ReviewStars from "../ReviewDetail/ReviewStars"

const MAX_CHIPS = 3

// Muestra hasta MAX_CHIPS elementos y resume el resto como "+N"
const Chips = ({ items }) => {
  if (items.length === 0) return null

  const visible = items.slice(0, MAX_CHIPS)
  const hidden = items.length - visible.length

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <span key={item} className="rounded-full border border-tertiary/20 px-2 py-0.5 text-[11px] text-tertiary">
          {item}
        </span>
      ))}
      {hidden > 0 && (
        <span className="rounded-full border border-tertiary/20 px-2 py-0.5 text-[11px] text-tertiary/60" title={items.slice(MAX_CHIPS).join(", ")}>
          +{hidden}
        </span>
      )}
    </div>
  )
}

// Tarjeta de una reseña con los datos de su juego. `review` viene de toReview (users.service).
const ReviewCard = ({ review, lineClamp = "line-clamp-3" }) => {
  const { game } = review

  return (
    <Link
      to={`/review/${review.id}`}
      className="group flex gap-4 rounded-lg border border-tertiary/15 bg-background-secondary p-3 sm:gap-5 sm:p-4 transition-all duration-300 hover:border-tertiary/40"
    >
      {/* Portada */}
      <div className="aspect-3/4 w-20 shrink-0 overflow-hidden rounded-md border border-tertiary/15 bg-background sm:w-28">
        {game?.cover ? (
          <img
            src={game.cover}
            alt={game.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-tertiary/40">
            <Gamepad2 size={24} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Juego */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold text-secondary text-base sm:text-lg leading-tight wrap-break-word group-hover:text-primary transition-colors">
              {game?.title ?? "Juego no disponible"}
            </h3>
            {game?.releaseDate && (
              <p className="mt-0.5 text-xs text-tertiary/60">{game.releaseDate.getFullYear()}</p>
            )}
          </div>
          <ReviewStars rating={review.rating} className="text-sm shrink-0" />
        </div>

        <div className="hidden sm:flex sm:flex-col sm:gap-1.5">
          <Chips items={game?.genres ?? []} />
          <Chips items={game?.platforms ?? []} />
        </div>

        {/* Reseña */}
        <p className={`text-sm font-light leading-relaxed text-tertiary wrap-break-word ${lineClamp}`}>
          {review.content}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-tertiary/60">
          <span>
            {review.createdAt.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          {review.likes !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Heart size={13} />
              {review.likes}
            </span>
          )}
          {review.completed && (
            <span className="inline-flex items-center gap-1 text-primary">
              <CheckCircle2 size={13} />
              Completado
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ReviewCard
