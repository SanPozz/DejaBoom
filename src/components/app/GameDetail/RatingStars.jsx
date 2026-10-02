import { Star } from "lucide-react"
import { useState } from "react"

const RatingStars = ({ rating, onRatingChange, size = "lg" }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "size-4",
    lg: "size-6"
  }

  const handleStarClick = (starIndex, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const isLeftHalf = x < rect.width / 2
    const rating = isLeftHalf ? starIndex - 0.5 : starIndex
    onRatingChange(rating)
  }

  const handleStarHover = (starIndex, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const isLeftHalf = x < rect.width / 2
    setHoverRating(isLeftHalf ? starIndex - 0.5 : starIndex)
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1
        const displayRating = hoverRating || rating
        const isFilled = starIndex <= displayRating
        const isHalfFilled = starIndex - 0.5 === displayRating
        const isActive = isFilled || isHalfFilled
        const glowClass = hoverRating
          ? "drop-shadow-[0_0_11px_rgba(103,228,91,0.72)]"
          : "drop-shadow-[0_0_6px_rgba(103,228,91,0.48)]"

        return (
          <div
            key={index}
            className={`relative cursor-pointer transition-all duration-200 hover:scale-110 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${isActive ? glowClass : ""}`}
            onMouseMove={(e) => handleStarHover(starIndex, e)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={(e) => handleStarClick(starIndex, e)}
            role="button"
            tabIndex={0}
            aria-label={`Calificar ${displayRating === starIndex - 0.5 ? starIndex - 0.5 : starIndex} de 5`}
          >
            {/* Estrella de fondo (vacía) */}
            <Star className={`${sizeClasses[size]} text-tertiary/40`} />

            {/* Contenedor para estrella llena/media */}
            {(isFilled || isHalfFilled) && (
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
