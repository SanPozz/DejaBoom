import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import Sidebar from '../components/app/Sidebar';
import ReviewHeader from '../components/app/ReviewDetail/ReviewHeader';
import ReviewBody from '../components/app/ReviewDetail/ReviewBody';
import CommentsSection from '../components/app/ReviewDetail/CommentsSection';
import GameRatingCard from '../components/app/ReviewDetail/GameRatingCard';
import MoreReviews from '../components/app/ReviewDetail/MoreReviews';
import ReviewDetailSkeleton from '../components/app/ReviewDetail/ReviewDetailSkeleton';

import { userReviews } from '../data/reviews';

import { getReviewById } from '../services/reviews.service';
import { searchGameById } from '../services/games.service';
import {
  getCommentsByReviewId,
  createComment,
  likeComment,
  unlikeComment,
} from '../services/comments.service';

const countComments = (items) =>
  items.reduce(
    (total, comment) => total + 1 + countComments(comment.replies ?? []),
    0,
  );

const ReviewDetail = () => {
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const cover = game?.cover ?? null;
  const artwork = game?.artwork ?? null;
  const otherReviews = userReviews
    .filter((r) => String(r.id) !== id)
    .slice(0, 3);

  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState('');

  const handleAddComment = async (content, parentId) => {
    try {
      await createComment(id, content, parentId);
      const updatedComments = await getCommentsByReviewId(id);
      setComments(updatedComments);
      setCommentsError('');
      return true;
    } catch (error) {
      console.error('Error al publicar comentario:', error);
      setCommentsError(
        error.response?.data?.error ?? 'No se pudo publicar el comentario.',
      );
      return false;
    }
  };

  const handleToggleLike = async (comment) => {
    try {
      if (comment.likedByMe) {
        await unlikeComment(comment.id);
      } else {
        await likeComment(comment.id);
      }

      const updatedComments = await getCommentsByReviewId(id);
      setComments(updatedComments);
      setCommentsError('');
    } catch (error) {
      console.error('Error al actualizar like:', error);
      setCommentsError(
        error.response?.data?.error ?? 'No se pudo actualizar el like.',
      );
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchReview = async () => {
      setLoading(true);
      setGame(null);
      setComments([]);

      let fetchedReview;
      try {
        fetchedReview = await getReviewById(id);
        if (cancelled) return;

        setReview(fetchedReview);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setReview(null);
          setLoading(false);
        }
        return;
      }
      try {
        const fetchedComments = await getCommentsByReviewId(id);
        if (!cancelled) setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        if (!cancelled) {
          setCommentsError('No se pudieron cargar los comentarios.');
        }
      }

      try {
        const resultGame = await searchGameById(fetchedReview.gameId);
        if (!cancelled) setGame(resultGame);
      } catch {
        // Sin datos del juego, la reseña se muestra con la portada por defecto
      }
    };
    fetchReview();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className='flex w-full bg-background min-h-screen text-secondary font-sans antialiased'>
      <Sidebar />

      <div className='flex-1 w-full overflow-y-auto'>
        {loading ? (
          <ReviewDetailSkeleton />
        ) : !review ? (
          <main className='max-w-3xl mx-auto px-6 py-8 space-y-6'>
            <Link
              to='/home'
              className='inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-primary transition-colors'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Volver
            </Link>
            <div className='bg-background-secondary border border-white/[0.07] rounded-2xl p-8 text-center text-tertiary'>
              No se encontró la reseña.
            </div>
          </main>
        ) : (
          <>
            <ReviewHeader
              review={review}
              cover={cover}
              artwork={artwork}
              game={game}
            />

            <main className='max-w-6xl mx-auto px-6 py-8 pb-28 lg:pb-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start'>
              <div className='space-y-8 min-w-0'>
                <ReviewBody
                  review={review}
                  commentsCount={countComments(comments)}
                />
                <CommentsSection
                  comments={comments}
                  error={commentsError}
                  onAddComment={handleAddComment}
                  onToggleLike={handleToggleLike}
                />
              </div>

              <aside className='space-y-6'>
                <GameRatingCard gameId={review.gameId} />
                <MoreReviews reviews={otherReviews} />
              </aside>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
