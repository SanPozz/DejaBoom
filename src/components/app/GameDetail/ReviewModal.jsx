import { X } from "lucide-react"
import { useState } from "react"
import RatingStars from "./RatingStars"

const ReviewModal = ({ isOpen, onClose, gameName = "Juego" }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0 || !comment.trim()) {
      alert("Por favor completa la calificación y comentario")
      return
    }

    setIsSubmitting(true)
    // Simular envío
    setTimeout(() => {
      console.log({ gameName, rating, comment })
      alert("Reseña enviada exitosamente")
      setRating(0)
      setComment("")
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  const handleClose = () => {
    setRating(0)
    setComment("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background-secondary border border-tertiary rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-tertiary/30">
          <h2 className="text-lg font-bold text-secondary">Reseña de {gameName}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-primary/10 rounded-lg text-tertiary hover:text-primary transition-all"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
              className="w-full bg-background border border-tertiary/30 rounded-lg px-3 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:outline-none resize-none transition-colors"
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
              className="flex-1 px-4 py-2 rounded-lg border border-tertiary/30 text-secondary hover:border-tertiary hover:bg-tertiary/5 transition-all font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Enviar reseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewModal
