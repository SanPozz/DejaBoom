import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const ORDERS = [
  ['recent', 'Recientes'],
  ['top', 'Más votados'],
];

const countComments = (items) =>
  items.reduce(
    (total, comment) => total + 1 + countComments(comment.replies ?? []),
    0,
  );

const CommentsSection = ({ comments, error, onAddComment, onToggleLike }) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [order, setOrder] = useState('recent');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sortedComments =
    order === 'top'
      ? [...comments].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
      : comments;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const published = await onAddComment(newComment.trim(), replyTo?.id);

      if (published) {
        setNewComment('');
        setReplyTo(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='comentarios'
      className='space-y-5 scroll-mt-6'
    >
      <div className='flex items-center justify-between border-b border-white/6 pb-2'>
        <h2 className='text-xs font-bold uppercase tracking-wider text-tertiary'>
          Comentarios{' '}
          <span className='text-tertiary/40 font-normal lowercase'>
            ({countComments(comments)})
          </span>
        </h2>

        <div className='flex gap-1 text-[11px] font-semibold'>
          {ORDERS.map(([key, label]) => (
            <button
              key={key}
              type='button'
              onClick={() => setOrder(key)}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition-colors ${
                order === key
                  ? 'bg-primary/15 text-primary'
                  : 'text-tertiary/60 hover:text-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p
          role='alert'
          className='text-sm text-red-400'
        >
          {error}
        </p>
      )}

      {replyTo && (
        <div className='flex items-center justify-between text-xs text-tertiary'>
          <span>
            Respondiendo a {replyTo.author?.nickname ?? 'este comentario'}
          </span>
          <button
            type='button'
            onClick={() => setReplyTo(null)}
            className='text-primary hover:underline'
          >
            Cancelar respuesta
          </button>
        </div>
      )}

      <CommentForm
        value={newComment}
        onChange={setNewComment}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {sortedComments.length === 0 ? (
        <p className='text-sm text-tertiary'>
          Todavía no hay comentarios. ¡Sé el primero en comentar!
        </p>
      ) : (
        <ul className='space-y-4'>
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onToggleLike={onToggleLike}
              onReply={setReplyTo}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsSection;
