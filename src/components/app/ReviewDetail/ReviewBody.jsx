import { useState } from "react"
import { Check, Flag, Heart, MessageCircle, Quote, Share2 } from "lucide-react"

import { likeReview, unlikeReview } from "../../../services/reviews.service"

const actionBase =
  "inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3.5 py-2 cursor-pointer transition-all active:scale-95"

const ReviewBody = ({ review, commentsCount }) => {
  const { id, content, likes = 0, likedByMe = false } = review

  const [liked, setLiked] = useState(likedByMe)
  const [likesCount, setLikesCount] = useState(likes)
  const [likePending, setLikePending] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLike = async () => {
    if (likePending) return

    const nextLiked = !liked
    const delta = nextLiked ? 1 : -1
    
    setLikePending(true)
    setLiked(nextLiked)
    setLikesCount((count) => count + delta)

    try {
      if (nextLiked) {
        await likeReview(id)
      } else {
        await unlikeReview(id)
      }
    } catch {

      setLiked(!nextLiked)
      setLikesCount((count) => count - delta)
    } finally {
      setLikePending(false)
    }
  }

  return (
    <article className="bg-background-secondary border border-white/[0.07] rounded-2xl overflow-hidden">
      <div className="flex gap-4 p-5 sm:p-8">
        <p className="min-w-0 flex-1 text-base sm:text-xl text-secondary/95 leading-relaxed font-light whitespace-pre-line wrap-break-word max-w-prose">
          {content}
        </p>
        <Quote aria-hidden className="hidden sm:block w-10 h-10 shrink-0 text-primary/10 rotate-180 ml-auto" />
      </div>

      <div className="flex items-center gap-2 flex-wrap px-5 sm:px-8 py-4 bg-background/40 border-t border-white/6">
        <button
          onClick={handleLike}
          disabled={likePending}
          aria-pressed={liked}
          className={`${actionBase} ${liked ? "text-rose-400 border-rose-400/40 bg-rose-400/10" : "text-tertiary border-white/10 hover:text-rose-400 hover:border-rose-400/40"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-rose-400" : ""}`} />
          {likesCount}
        </button>

        <a
          href="#comentarios"
          className={`${actionBase} text-tertiary border-white/10 hover:text-primary hover:border-primary/40`}
        >
          <MessageCircle className="w-4 h-4" />
          {commentsCount} {commentsCount === 1 ? "comentario" : "comentarios"}
        </a>

        <button
          onClick={handleShare}
          className={`${actionBase} ${copied ? "text-primary border-primary/40 bg-primary/10" : "text-tertiary border-white/10 hover:text-primary hover:border-primary/40"}`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Link copiado" : "Compartir"}
        </button>

        <button
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary/70 rounded-full px-3 py-2 cursor-pointer hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <Flag className="w-4 h-4" /> Reportar
        </button>
      </div>
    </article>
  )
}

export default ReviewBody
