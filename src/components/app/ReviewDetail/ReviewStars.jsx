// Cada estrella se rellena de forma parcial para admitir medias puntuaciones
const ReviewStars = ({ rating, className = "text-sm" }) => (
  <div className={`flex tracking-tight bg-background px-2.5 py-1 rounded-full w-fit ${className}`} role="img" aria-label={`${rating} de 5`}>
    {[...Array(5)].map((_, i) => {
      const fill = Math.min(Math.max(rating - i, 0), 1)
      return (
        <span key={i} className="relative text-tertiary/15">
          ★
          <span className="absolute inset-y-0 left-0 overflow-hidden text-primary" style={{ width: `${fill * 100}%` }}>★</span>
        </span>
      )
    })}
  </div>
)

export default ReviewStars
