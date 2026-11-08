import { useState } from "react"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"

const ORDERS = [["recent", "Recientes"], ["top", "Más votados"]]

const CommentsSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("")
  const [likedComments, setLikedComments] = useState({})
  const [order, setOrder] = useState("recent")

  const likesOf = (c) => c.likes + (likedComments[c.id] ? 1 : 0)
  const sortedComments = order === "top" ? [...comments].sort((a, b) => likesOf(b) - likesOf(a)) : comments

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    onAddComment(newComment.trim())
    setNewComment("")
  }

  return (
    <section id="comentarios" className="space-y-5 scroll-mt-6">
      <div className="flex justify-between items-center border-b border-white/6 pb-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary">
          Comentarios <span className="text-tertiary/40 font-normal lowercase">({comments.length})</span>
        </h2>
        <div className="flex gap-1 text-[11px] font-semibold">
          {ORDERS.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setOrder(key)}
              className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${order === key ? "bg-primary/15 text-primary" : "text-tertiary/60 hover:text-secondary"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <CommentForm value={newComment} onChange={setNewComment} onSubmit={handleSubmit} />

      <div className="space-y-4">
        {sortedComments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            liked={!!likedComments[c.id]}
            likes={likesOf(c)}
            onToggleLike={() => setLikedComments((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
            onReply={() => setNewComment(`@${c.user} `)}
          />
        ))}
      </div>
    </section>
  )
}

export default CommentsSection
