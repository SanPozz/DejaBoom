import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Sidebar from "../components/app/Sidebar"
import { userReviews } from "../data/reviews"

const Stars = ({ rating }) => (
  <div className="flex gap-0.5 text-sm" aria-label={`${rating} de 5`}>
    {Array.from({ length: 5 }).map((_, i) => {
      const fill = Math.min(Math.max(rating - i, 0), 1) * 100
      return (
        <span key={i} className="relative text-tertiary/20">
          ★
          <span
            className="absolute inset-0 overflow-hidden text-primary"
            style={{ width: `${fill}%` }}
          >
            ★
          </span>
        </span>
      )
    })}
  </div>
)

const sorters = {
  recent: (a, b) => a.id - b.id,
  best: (a, b) => b.rating - a.rating,
  worst: (a, b) => a.rating - b.rating,
}

const AllReviews = () => {
  const [sort, setSort] = useState("recent")
  const reviews = [...userReviews].sort(sorters[sort])

  return (
    <div className="flex w-full min-h-screen bg-background text-secondary font-sans antialiased">
      <Sidebar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Volver al perfil
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-tertiary mb-2">
                Perfil
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Todas las reseñas{" "}
                <span className="text-tertiary/50 text-xl font-normal">({reviews.length})</span>
              </h1>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-background-secondary border border-tertiary/20 rounded-lg px-3 py-2 text-sm text-secondary focus:outline-none focus:border-primary"
            >
              <option value="recent">Más recientes</option>
              <option value="best">Mejor calificadas</option>
              <option value="worst">Peor calificadas</option>
            </select>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="bg-background-secondary border border-tertiary/15 rounded-lg p-4 sm:p-6 hover:border-tertiary/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h2 className="font-bold text-secondary text-base sm:text-lg mb-1">
                      {review.gameTitle}
                    </h2>
                    <p className="text-tertiary/60 text-xs">{review.date}</p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="text-tertiary text-sm font-light leading-relaxed">{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AllReviews