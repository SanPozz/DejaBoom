import { MessageSquare, Heart, Share2 } from "lucide-react"
import { useState } from "react"
import ReviewModal from "./ReviewModal"

const DerechaGameDetail = ({ gameName = "Juego" }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <>
      <aside className="flex flex-col gap-6">
        {/* Botón principal: Reseñar */}
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="w-full px-6 py-3 bg-primary text-background rounded-xl font-semibold hover:bg-primary/90 btn-glow transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageSquare size={18} />
          Escribir reseña
        </button>

        {/* Card de acciones rápidas */}
        <div className="bg-background-secondary border border-tertiary/15 rounded-xl p-4 space-y-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isLiked
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-tertiary/5 text-secondary border border-tertiary/30 hover:border-tertiary/50"
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            {isLiked ? "Te encanta" : "Marcar como favorito"}
          </button>

          <button className="w-full px-4 py-2 rounded-lg font-semibold bg-tertiary/5 text-secondary border border-tertiary/30 hover:border-tertiary/50 transition-all flex items-center justify-center gap-2">
            <Share2 size={18} />
            Compartir
          </button>
        </div>

        {/* Info de comunidad */}
        <div className="bg-background-secondary border border-tertiary/15 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
            Comunidad
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-tertiary">Reseñas</span>
              <span className="font-bold text-primary">2.3K</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-tertiary">En listas</span>
              <span className="font-bold text-primary">5.1K</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-tertiary">Completado</span>
              <span className="font-bold text-primary">847</span>
            </div>
          </div>
        </div>
      </aside>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        gameName={gameName}
      />
    </>
  )
}

export default DerechaGameDetail
