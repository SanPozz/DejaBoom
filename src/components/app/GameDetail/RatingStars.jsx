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

  const renderStar = (starIndex) => {
    const displayRating = hoverRating || rating
    const isFilled = starIndex <= displayRating
    const isHalfFilled = starIndex - 0.5 === displayRating

    if (isFilled) {
      return "fill-primary text-primary"
    } else if (isHalfFilled) {
      return "fill-primary text-primary"
    } else {
      return "text-tertiary/40"
    }
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1
        const displayRating = hoverRating || rating
        const isFilled = starIndex <= displayRating
        const isHalfFilled = starIndex - 0.5 === displayRating

        return (
          <div
            key={index}
            className="relative cursor-pointer transition-transform duration-200 hover:scale-110"
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
