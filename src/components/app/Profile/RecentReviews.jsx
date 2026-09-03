import React from 'react'

export default function RecentReviews({ reviews }) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-6 border-b border-tertiary/10 pb-2">
        Reseñas Recientes
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-background-secondary border border-tertiary/15 rounded-lg p-4 sm:p-6 hover:border-tertiary/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-secondary text-base sm:text-lg mb-1">
                  {review.gameTitle}
                </h3>
                <p className="text-tertiary/60 text-xs">{review.date}</p>
              </div>
              <div className="flex gap-0.5 text-sm tracking-tighter">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(review.rating) ? "text-primary" : "text-tertiary/20"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-tertiary text-sm font-light leading-relaxed line-clamp-3">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full sm:w-auto px-6 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-all text-xs uppercase tracking-wider">
        Ver Todas las Reseñas
      </button>
    </div>
  )
}
