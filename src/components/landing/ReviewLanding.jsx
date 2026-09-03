import { Star } from "lucide-react"

const ReviewLanding = ({ user = "User", game = "Game", review = "lorem ipsum dolor sit amet", rating = 4.5, timeAgo = "Hace 2 horas" }) => {
  return (
    <div className='bg-background rounded-xl border border-tertiary px-4 py-4 sm:px-5 sm:py-4 shadow-lg'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-start gap-3 min-w-0'>
          <div className='size-9 rounded-full bg-primary shrink-0'></div>
          <div className='min-w-0'>
            <p className="text-sm text-tertiary wrap-break-word">
              <span className='font-semibold text-secondary'>{user}</span> reseñó
              <span className='font-semibold text-primary'> {game}</span>
            </p>
            <p className='text-xs text-tertiary mt-0.5'>{timeAgo}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-primary shrink-0 pt-0.5">
          {Array.from({ length: 5 }).map((_, s) => {
            const ratingValue = s + 1
            const isFilled = ratingValue <= Math.floor(rating)
            const isHalf = ratingValue === Math.ceil(rating) && rating % 1 !== 0

            return (
              <div key={s} className="relative">
                <Star className="size-3 fill-none opacity-40" />
                {(isFilled || isHalf) && (
                  <div className={`absolute inset-0 overflow-hidden ${isHalf ? "w-1/2" : "w-full"}`}>
                    <Star className="size-3 fill-primary" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className='text-sm sm:text-base text-tertiary mt-4 leading-relaxed wrap-break-word'>"{review}"</p>
    </div>
  )
}

export default ReviewLanding
