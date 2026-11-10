import { Link } from "react-router-dom"

import ReviewCard from "./ReviewCard"


export default function RecentReviews({ reviews, nickname }) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-6 border-b border-tertiary/10 pb-2">
        Reseñas Recientes
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {reviews.length === 0 && (
          <p className="text-tertiary text-sm font-light">
            No hay reseñas recientes.
          </p>
        )}

        {reviews.length > 0 && (
          <Link
            to={`/profile/${encodeURIComponent(nickname)}/reviews`}
            className="mt-6 inline-block w-full sm:w-auto px-6 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-all text-xs uppercase tracking-wider text-center"
          >
            Ver Todas las Reseñas
          </Link>
        )}
      </div>

      
    </div>
  )
}