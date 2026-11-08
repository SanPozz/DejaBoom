import { X, Search, Check, Gamepad2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import RatingStars from "./GameDetail/RatingStars"
import Checkbox from "./Checkbox"

import { searchGames } from "../../services/games.service"
import { createReview } from "../../services/reviews.service"
import { getErrorMessage } from "../../services/api.service"

import { useDebounce } from "../../hooks/useDebounce"

const MAX_RESULTS = 6

const NewReviewModal = ({ isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [search, setSearch] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [completed, setCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Con un juego elegido no se busca: el input muestra su título
  const debouncedSearch = useDebounce(search, 300)
  const term = selectedGame ? "" : debouncedSearch.trim()

  const [results, setResults] = useState({ term: "", games: [] })
  const isSearching = search.trim() !== term || results.term !== term

  useEffect(() => {
    if (!term) return

    const controller = new AbortController()
    searchGames(term, controller.signal)
      .then((games) => setResults({ term, games: games.slice(0, MAX_RESULTS) }))
      .catch((error) => {
        if (!axios.isCancel(error)) setResults({ term, games: [] })
      })

    return () => controller.abort()
  }, [term])

  const resetForm = () => {
    setSelectedGame(null)
    setSearch("")
    setRating(0)
    setComment("")
    setCompleted(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSelectGame = (game) => {
    setSelectedGame(game)
    setSearch(game.title)
  }

  const handleChangeSearch = (value) => {
    setSearch(value)
    if (selectedGame && value !== selectedGame.title) {
      setSelectedGame(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedGame) {
      alert("Por favor selecciona un juego")
      return
    }
    if (rating === 0 || !comment.trim()) {
      alert("Por favor completa la calificación y comentario")
      return
    }

    setIsSubmitting(true)
    try {
      await createReview({ gameId: selectedGame.id, rating, content: comment.trim(), completed })
      alert("Reseña enviada exitosamente")
      handleClose()
    } catch (error) {
      alert(getErrorMessage(error, "Error al enviar la reseña"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background-secondary border border-primary/35 rounded-2xl max-w-md w-full shadow-[0_0_0_1px_rgba(103,228,91,0.08),0_24px_80px_rgba(0,0,0,0.65),0_0_36px_rgba(103,228,91,0.14)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-lg font-bold text-secondary">Nueva Reseña</h2>
          <button
            onClick={handleClose}
            className="cursor-pointer p-2 hover:bg-primary/10 rounded-lg text-tertiary hover:text-primary transition-all"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Selector de juego */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              Juego
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleChangeSearch(e.target.value)}
                placeholder="Busca un juego..."
                maxLength={100}
                className="w-full bg-background border border-primary/25 rounded-lg pl-9 pr-9 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
                autoComplete="off"
              />
              {selectedGame && (
                <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
              )}
            </div>

            {/* Resultados de búsqueda */}
            {search.trim() && !selectedGame && (
              <div className="dropdown-reveal list-games-scrollbar mt-2 max-h-56 overflow-y-auto rounded-lg border border-primary/20 bg-background-secondary">
                {isSearching ? (
                  <p className="px-3 py-3 text-sm text-tertiary">Buscando...</p>
                ) : results.games.length > 0 ? (
                  results.games.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleSelectGame(game)}
                      className="cursor-pointer w-full flex items-center gap-3 border-b border-primary/10 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-primary/10"
                    >
                      {game.cover ? (
                        <img
                          src={game.cover}
                          alt={game.title}
                          className="size-10 rounded-md object-cover shrink-0 border border-primary/10"
                        />
                      ) : (
                        <div className="size-10 rounded-md shrink-0 border border-primary/10 bg-background flex items-center justify-center">
                          <Gamepad2 size={18} className="text-tertiary" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-secondary truncate">{game.title}</p>
                        <p className="text-xs text-tertiary truncate">
                          {[game.releaseDate?.getUTCFullYear(), game.platforms.join(", ")].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-3 text-sm text-tertiary">No se encontraron juegos</p>
                )}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-3">
              ¿Cuál es tu calificación? {rating > 0 && <span className="text-primary">({rating})</span>}
            </label>
            <RatingStars rating={rating} onRatingChange={setRating} size="lg" />
          </div>

          {/* Completado */}
          <Checkbox
            checked={completed}
            onChange={setCompleted}
            label="Lo completé"
            description="Marcalo si terminaste el juego"
          />

          {/* Comentario */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              Tu comentario
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia con este juego..."
              rows={4}
              maxLength={500}
              className="w-full bg-background border border-primary/25 rounded-lg px-3 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none resize-none transition-colors"
            />
            <div className="mt-1 text-xs text-tertiary text-right">
              {comment.length}/500
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer flex-1 px-4 py-2 rounded-lg border border-primary/30 text-secondary hover:border-primary hover:bg-primary/5 transition-all font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 hover:shadow-[0_0_22px_rgba(103,228,91,0.28)] transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Enviar reseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewReviewModal
