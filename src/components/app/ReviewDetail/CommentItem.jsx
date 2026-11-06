import { CornerDownRight, Heart } from "lucide-react"

const CommentItem = ({ comment, liked, likes, onToggleLike, onReply }) => (
  <div className="flex gap-4 items-start">
    <div className={`w-8 h-8 rounded-full ${comment.avatarColor} flex items-center justify-center font-bold text-black text-xs shrink-0`}>
      {comment.initial}
    </div>
    <div className="flex-1 bg-background-secondary/30 p-3 rounded-lg border border-white/[0.07] space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold text-secondary">{comment.user}</span>
        <span className="text-[10px] text-tertiary/50">{comment.time}</span>
      </div>
      <p className="text-sm text-secondary/90 font-light leading-relaxed">{comment.text}</p>
      <div className="flex items-center gap-4 text-[11px] font-semibold text-tertiary/70">
        <button
          onClick={onToggleLike}
          className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-rose-400 ${liked ? "text-rose-400" : ""}`}
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-400/30" : ""}`} /> {likes}
        </button>
        <button
          onClick={onReply}
          className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
        >
          <CornerDownRight className="w-3.5 h-3.5" /> Responder
        </button>
      </div>
    </div>
  </div>
)

export default CommentItem
