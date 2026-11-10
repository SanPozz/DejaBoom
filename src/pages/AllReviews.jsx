import { useState, useEffect } from "react"
import { useParams, Link, useSearchParams } from "react-router-dom"

import { getUserReviews } from "../services/users.service.js"
import { getErrorMessage } from "../services/api.service.js"

import { ArrowLeft } from "lucide-react"
import Sidebar from "../components/app/Sidebar"
import ReviewCard from "../components/app/Profile/ReviewCard.jsx"
import { Spinner } from "../components/app/Spinner.jsx"

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  
  const { nickname } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") ?? 'recent';
  const page = Number(searchParams.get("page") ) || 1;

  useEffect(() => {

    let ignore = false;

    getUserReviews(nickname, { sort, page })
      .then((data) => {
        if (!ignore) {
          setReviews(data.reviews)
          setTotalPages(data.totalPages)
          setTotal(data.total)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(getErrorMessage(err, "No se pudieron cargar las reseñas"))
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })
    return () => {
      ignore = true;
    }

  }, [nickname, sort, page]);

  const handleSortChange = (e) => {
    setSearchParams({ sort: e.target.value })
    setLoading(true)
    setError(null)
  }

  const goToPage = (newPage) => {
    setSearchParams({ sort, page: String(newPage) });
    setLoading(true)
    setError(null)
    window.scrollTo(0, 0);
  }

  return (
    <div className="flex w-full min-h-screen bg-background text-secondary font-sans antialiased">
      <Sidebar />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pt-8 pb-28 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/profile/${encodeURIComponent(nickname)}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Volver al perfil
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-tertiary mb-2">
                {nickname}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Todas las reseñas{" "}
                <span className="text-tertiary/50 text-xl font-normal">({total})</span>
              </h1>
            </div>

            <select
              value={sort}
              onChange={handleSortChange}
              className="bg-background-secondary border border-tertiary/20 rounded-lg px-3 py-2 text-sm text-secondary focus:outline-none focus:border-primary"
            >
              <option value="recent">Más recientes</option>
              <option value="best">Mejor calificadas</option>
              <option value="worst">Peor calificadas</option>
            </select>
          </div>

          <div className="space-y-4">

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {loading && <Spinner />}

            {!loading && reviews.map((review) => (
              <ReviewCard key={review.id} review={review} lineClamp="line-clamp-4" />
            ))}

            {!loading && !error && reviews.length === 0 && (
              <p className="text-sm text-tertiary">No hay reseñas disponibles.</p>
            )}

            {!loading && totalPages > 1 && (
              <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-2 rounded-lg border border-tertiary/20 text-xs font-semibold uppercase tracking-wider text-tertiary hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                >
                  Anterior
                </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      aria-current={n === page ? "page" : undefined}
                      className={`min-w-9 px-3 py-2 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                        n === page
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-tertiary/20 text-tertiary hover:border-primary hover:text-primary"
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-3 py-2 rounded-lg border border-tertiary/20 text-xs font-semibold uppercase tracking-wider text-tertiary hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Siguiente
                  </button>
              </nav>
            )}


          </div>
        </div>
      </main>
    </div>
  )
}

export default AllReviews