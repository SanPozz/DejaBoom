import { Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularReviews } from '../../services/reviews.service';
import ReviewStars from './ReviewDetail/ReviewStars';
import Bone from './Bone';

const COVER = 'w-20 sm:w-24 md:w-28 aspect-3/4 shrink-0 rounded-xl';

export default function PopularReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getPopularReviews().then((result) => {
      if (cancelled) return;
      setReviews(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sin reseñas: la sección no se muestra
  if (!loading && reviews.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 bg-background text-secondary font-sans select-none">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado de la sección */}
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">La comunidad opina</p>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">Reseñas populares</h3>
        </div>

        {/* Lista de Reseñas */}
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex gap-4 sm:gap-5 bg-background-secondary border border-white/[0.07] rounded-2xl p-4 sm:p-5">
                  <Bone className={COVER} />
                  <div className="flex-1 min-w-0 space-y-3">
                    <Bone className="h-6 w-1/2" />
                    <Bone className="h-5 w-40" />
                    <Bone className="h-4 w-full" />
                    <Bone className="h-4 w-4/5" />
                  </div>
                </div>
              ))
            : reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  const { game, user } = review;
  const title = game?.title ?? 'Juego desconocido';
  const year = game?.releaseDate?.getFullYear();

  return (
    <article className="group relative flex gap-4 sm:gap-5 bg-background-secondary border border-white/[0.07] rounded-2xl p-4 sm:p-5 hover:border-primary/35 hover:bg-[#10161b] transition-all duration-300">

      {/* Portada */}
      <div className={`${COVER} overflow-hidden border border-white/8 bg-zinc-900`}>
        {game?.cover && (
          <img src={game.cover} alt={`Portada de ${title}`} className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Título y año. El ::after estira el link a toda la tarjeta */}
          <div className="flex items-baseline gap-2 mb-2 flex-wrap">
            <Link
              to={`/review/${review.id}`}
              className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300 after:absolute after:inset-0 after:rounded-2xl"
            >
              {title}
            </Link>
            {year && (
              <span className="text-[11px] font-bold text-tertiary/60 border border-white/8 rounded-full px-2 py-0.5">
                {year}
              </span>
            )}
          </div>

          {/* Autor y calificación */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Link to={`/profile/${user.nickname}`} className="relative z-10 flex items-center gap-2 hover:text-primary transition-colors">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px] font-black text-black shrink-0">
                  {user.nickname.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-bold text-secondary/80">{user.nickname}</span>
            </Link>
            <ReviewStars rating={review.rating} className="text-xs ml-1" />
          </div>

          {/* Texto de la reseña */}
          <p className="text-sm text-tertiary/90 leading-relaxed max-w-3xl line-clamp-3 lg:line-clamp-2 wrap-break-word">
            {review.content}
          </p>
        </div>

        {/* Likes y comentarios */}
        <div className="flex items-center gap-4 text-xs font-semibold text-tertiary mt-4 pt-3 border-t border-white/6">
          <span className="flex items-center gap-1.5" aria-label={`${review.likes} me gusta`}>
            <Heart className="w-4 h-4" /> {review.likes}
          </span>
          <span className="flex items-center gap-1.5" aria-label={`${review.commentsCount} comentarios`}>
            <MessageCircle className="w-4 h-4" /> {review.commentsCount}
          </span>
        </div>
      </div>
    </article>
  );
}
