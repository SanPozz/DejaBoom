import { Link } from "react-router-dom"

import ReviewStars from "../ReviewDetail/ReviewStars"


export default function RecentReviews({ reviews }) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-6 border-b border-tertiary/10 pb-2">
        Reseñas Recientes
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
            <Link
              to={`/review/${review.id}`}
              key={review.id}
              className="block bg-background-secondary border border-tertiary/15 rounded-lg p-4 sm:p-6 hover:border-tertiary/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-secondary text-base sm:text-lg mb-1">
                    {review.game?.title ?? 'Juego no disponible'}
                  </h3>
                  <p className="text-tertiary/60 text-xs">
                    {review.createdAt.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <ReviewStars rating={review.rating} />

              </div>
              <p className="text-tertiary text-sm font-light leading-relaxed line-clamp-3">
                {review.content}
              </p>
            </Link>
        ))
        
        }

        {reviews.length === 0 && (
          <p className="text-tertiary text-sm font-light">
            No hay reseñas recientes.
          </p>
        )}

        {reviews.length > 0 && (
          <Link
            to="/profile/reviews"
            className="mt-6 inline-block w-full sm:w-auto px-6 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-all text-xs uppercase tracking-wider text-center"
          >
            Ver Todas las Reseñas
          </Link>
        )}
      </div>

      
    </div>
  )
}