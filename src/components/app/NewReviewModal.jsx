import { X, Search, Check } from "lucide-react"
import { useMemo, useState } from "react"
import RatingStars from "./GameDetail/RatingStars"
import { gameCatalog } from "../../data/listEditorData"

const NewReviewModal = ({ isOpen, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [search, setSearch] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredGames = useMemo(() => {
    if (!search.trim()) return []
    return gameCatalog
      .filter((game) => game.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6)
  }, [search])

  const resetForm = () => {
    setSelectedGame(null)
    setSearch("")
    setRating(0)
    setComment("")
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
    // Simular envío
    setTimeout(() => {
      console.log({ game: selectedGame, rating, comment })
      alert("Reseña enviada exitosamente")
      setIsSubmitting(false)
      handleClose()
    }, 500)
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
                className="w-full bg-background border border-primary/25 rounded-lg pl-9 pr-9 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors"
                autoComplete="off"
              />
              {selectedGame && (
                <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
              )}
            </div>

            {/* Resultados de búsqueda */}
            {search.trim() && !selectedGame && (
              <div className="list-games-scrollbar mt-2 max-h-56 overflow-y-auto rounded-lg border border-primary/20 bg-background-secondary">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleSelectGame(game)}
                      className="cursor-pointer w-full flex items-center gap-3 border-b border-primary/10 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-primary/10"
                    >
                      <img
                        src={game.cover}
                        alt={game.title}
                        className="size-10 rounded-md object-cover shrink-0 border border-primary/10"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-secondary truncate">{game.title}</p>
                        <p className="text-xs text-tertiary truncate">{game.platform}</p>
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
