import { CornerDownRight, Heart } from 'lucide-react';

const CommentItem = ({ comment, onToggleLike, onReply }) => {
  const author = comment.author?.nickname ?? 'Usuario';
  const initial = author.charAt(0).toUpperCase();
  const date = new Date(comment.createdAt);
  const dateText = Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('es-AR');

  return (
    <li>
      <div className='flex items-start gap-4'>
        {comment.author?.profilePicture ? (
          <img
            src={comment.author.profilePicture}
            alt=''
            className='h-8 w-8 shrink-0 rounded-full object-cover'
          />
        ) : (
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-black'>
            {comment.deleted ? '—' : initial}
          </div>
        )}

        <div className='min-w-0 flex-1 space-y-2 rounded-lg border border-white/[0.07] bg-background-secondary/30 p-3'>
          <div className='flex items-baseline justify-between gap-3'>
            <span className='text-xs font-bold text-secondary'>
              {comment.deleted ? 'Comentario eliminado' : author}
            </span>
            <span className='shrink-0 text-[10px] text-tertiary/50'>
              {dateText}
            </span>
          </div>

          <p className='whitespace-pre-wrap break-words text-sm font-light leading-relaxed text-secondary/90'>
            {comment.deleted
              ? 'Este comentario fue eliminado.'
              : comment.content}
          </p>

          {!comment.deleted && (
            <div className='flex items-center gap-4 text-[11px] font-semibold text-tertiary/70'>
              <button
                type='button'
                onClick={() => onToggleLike(comment)}
                aria-pressed={comment.likedByMe}
                className={`flex items-center gap-1 transition-colors hover:text-rose-400 ${
                  comment.likedByMe ? 'text-rose-400' : ''
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    comment.likedByMe ? 'fill-rose-400/30' : ''
                  }`}
                />
                {comment.likes ?? 0}
              </button>

              <button
                type='button'
                onClick={() => onReply(comment)}
                className='flex items-center gap-1 transition-colors hover:text-primary'
              >
                <CornerDownRight className='h-3.5 w-3.5' />
                Responder
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <ul className='ml-5 mt-4 space-y-4 border-l border-white/10 pl-4 sm:ml-8'>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onToggleLike={onToggleLike}
              onReply={onReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CommentItem;
