import { Star } from "lucide-react"
import { useRef, useState } from "react"

const RatingStars = ({ rating, onRatingChange, size = "lg" }) => {
  const [hoverRating, setHoverRating] = useState(0)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const sizeClasses = {
    sm: "size-4",
    lg: "size-6"
  }

  // Calcula la nota (pasos de 0.5) según la posición horizontal del puntero, aunque salga del componente
  const ratingFromPointer = (clientX) => {
    const stars = containerRef.current?.children
    if (!stars?.length) return 0

    for (let i = 0; i < stars.length; i++) {
      const rect = stars[i].getBoundingClientRect()
      if (clientX <= rect.right) {
        if (clientX < rect.left) return i === 0 ? 0.5 : i
        return clientX < rect.left + rect.width / 2 ? i + 0.5 : i + 1
      }
    }
    return stars.length
  }

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    onRatingChange(ratingFromPointer(e.clientX))
  }

  const handlePointerMove = (e) => {
    const value = ratingFromPointer(e.clientX)
    if (dragging) {
      onRatingChange(value)
    } else if (e.pointerType === "mouse") {
      setHoverRating(value)
    }
  }

  const handlePointerEnd = () => setDragging(false)

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      onRatingChange(Math.min(5, (rating || 0) + 0.5))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      onRatingChange(Math.max(0.5, (rating || 0) - 0.5))
    }
  }

  const displayRating = dragging ? rating : hoverRating || rating

  return (
    <div
      ref={containerRef}
      className="flex gap-2 w-fit cursor-pointer select-none touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={() => setHoverRating(0)}
      onKeyDown={handleKeyDown}
      role="slider"
      tabIndex={0}
      aria-label="Calificación"
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={rating || 0}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1
        const isFilled = starIndex <= displayRating
        const isHalfFilled = starIndex - 0.5 === displayRating
        const isActive = isFilled || isHalfFilled
        const glowClass = hoverRating || dragging
          ? "drop-shadow-[0_0_11px_rgba(103,228,91,0.72)]"
          : "drop-shadow-[0_0_6px_rgba(103,228,91,0.48)]"

        return (
          <div
            key={index}
            className={`relative transition-all duration-200 ${isActive ? glowClass : ""}`}
          >
            {/* Estrella de fondo (vacía) */}
            <Star className={`${sizeClasses[size]} text-tertiary/40`} />

            {/* Contenedor para estrella llena/media */}
            {isActive && (
              <div
                className={`absolute inset-0 overflow-hidden transition-all duration-200 ${
                  isHalfFilled ? "w-1/2" : "w-full"
                }`}
              >
                <Star className={`${sizeClasses[size]} fill-primary text-primary`} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default RatingStars
