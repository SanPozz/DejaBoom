import { X } from "lucide-react"
import { useState } from "react"
import RatingStars from "./RatingStars"
import Checkbox from "../Checkbox"

import { createReview } from "../../../services/reviews.service"
import { getErrorMessage } from "../../../services/api.service"

const ReviewModal = ({ isOpen, onClose, gameName, gameId }) => {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [completed, setCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0 || !content.trim()) {
      alert("Por favor completa la calificación y comentario")
      return
    }

    setIsSubmitting(true)

    try {
      await createReview({ gameId, rating, content: content.trim(), completed })
      alert("Reseña enviada exitosamente")
      handleClose()
    } catch (error) {
      alert(
        error.response?.status === 401
          ? "Debes iniciar sesión para enviar una reseña"
          : getErrorMessage(error, "Error al enviar la reseña")
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setRating(0)
    setContent("")
    setCompleted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background-secondary border border-primary/35 rounded-2xl max-w-md w-full shadow-[0_0_0_1px_rgba(103,228,91,0.08),0_24px_80px_rgba(0,0,0,0.65),0_0_36px_rgba(103,228,91,0.14)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-lg font-bold text-secondary">Reseña de {gameName}</h2>
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Comparte tu experiencia con este juego..."
              rows={4}
              maxLength={500}
              className="w-full bg-background border border-primary/25 rounded-lg px-3 py-2 text-secondary placeholder-tertiary/50 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none resize-none transition-colors"
            />
            <div className="mt-1 text-xs text-tertiary text-right">
              {content.length}/500
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

export default ReviewModal
