import ReviewStars from "./ReviewStars"

const ReviewScore = ({ rating }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 bg-background/70 backdrop-blur-sm border border-primary/25 rounded-2xl px-5 py-4 sm:px-6 shadow-[0_0_30px_-10px_rgba(103,228,91,0.5)] shrink-0">
    <ReviewStars
      rating={rating}
      className="text-4xl sm:text-5xl leading-none bg-transparent px-0 py-0 drop-shadow-[0_0_12px_rgba(103,228,91,0.45)]"
    />
    <p className="flex items-baseline gap-0.5 leading-none">
      <span className="text-base font-bold text-primary">{rating}</span>
      <span className="text-xs font-semibold text-tertiary/50">/5</span>
    </p>
  </div>
)

export default ReviewScore
