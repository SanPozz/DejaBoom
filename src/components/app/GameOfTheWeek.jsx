import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGameOfTheWeek } from '../../services/games.service';
import ReviewStars from './ReviewDetail/ReviewStars';
import Bone from './Bone';

// Celular: portada chica a la izquierda con título y rating al lado, descripción abajo a todo el ancho.
// Desde sm: portada a la izquierda ocupando las dos filas, texto a la derecha.
const LAYOUT = 'relative z-10 grid grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr] gap-x-4 sm:gap-x-6 gap-y-3';
const COVER = 'w-24 sm:w-32 md:w-36 lg:w-40 aspect-3/4 shrink-0 rounded-lg sm:row-span-2';
// self-start: sin esto la fila 1fr estira el párrafo y el line-clamp deja asomar la 4ª línea
const DESCRIPTION = 'col-span-2 sm:col-span-1 sm:col-start-2 self-start';

export default function GameOfTheWeek() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getGameOfTheWeek().then((result) => {
      if (cancelled) return;
      setData(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sin reseñas en la base o error: no se muestra la tarjeta
  if (!loading && !data) return null;

  const { game, stats } = data ?? {};

  return (
    <div className="w-full bg-background flex justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full max-w-4xl bg-background-secondary border border-tertiary/15 rounded-xl p-4 sm:p-6 md:p-8 font-sans select-none relative overflow-hidden">

        {/* Background con gradientes y blur */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(103,228,91,0.16) 0%, rgba(103,228,91,0.08) 18%, rgba(103,228,91,0.03) 38%, rgba(103,228,91,0.01) 60%, transparent 80%), radial-gradient(circle at 80% 70%, rgba(103,228,91,0.12) 0%, rgba(103,228,91,0.05) 20%, rgba(103,228,91,0.02) 40%, transparent 70%)',
            filter: 'blur(18px)'
          }}
        ></div>

        {loading ? (
          <div className={LAYOUT}>
            <Bone className={COVER} />
            <div className="min-w-0 self-center sm:self-start space-y-2.5">
              <Bone className="h-3 w-28" />
              <Bone className="h-6 sm:h-8 w-3/4" />
              <Bone className="h-4 w-36" />
            </div>
            <div className={`${DESCRIPTION} space-y-2`}>
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-5/6" />
            </div>
          </div>
        ) : (
          <Link to={`/game/${game.id}`} className={`group ${LAYOUT}`}>

            {/* Portada */}
            <div className={`relative overflow-hidden shadow-md ${COVER}`}>
              <img src={game.coverLarge} alt={`Portada de ${game.title}`} className="w-full h-full object-cover" />

              {/* Borde: uno fijo tenue + uno verde que se dibuja con el hover */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <rect
                  width="100%" height="100%" rx="8"
                  fill="none" strokeWidth="2"
                  className="stroke-tertiary/15"
                />
                <rect
                  width="100%" height="100%" rx="8"
                  fill="none" strokeWidth="4"
                  pathLength="100" strokeDasharray="100"
                  className="stroke-primary [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-900 ease-out"
                />
              </svg>
            </div>

            {/* Título y calificación */}
            <div className="min-w-0 self-center sm:self-start">
              <span className="text-primary font-extrabold text-[10px] sm:text-xs md:text-sm tracking-wider uppercase block mb-1">
                Juego de la semana
              </span>

              <h2 className="w-fit max-w-full wrap-break-word text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-black tracking-tight mb-2 bg-linear-to-r from-primary from-50% to-secondary to-50% bg-[length:200%_100%] bg-[position:100%_0] group-hover:bg-[position:0_0] bg-clip-text text-transparent transition-[background-position] duration-600 ease-linear">
                {game.title}
              </h2>

              <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                {stats.averageRating !== null && (
                  <>
                    <ReviewStars rating={stats.averageRating} className="text-xs sm:text-sm" />
                    <span className="text-tertiary text-xs sm:text-sm font-medium">{stats.averageRating.toFixed(1)}</span>
                    <span className="text-tertiary/30 text-xs sm:text-sm font-medium">·</span>
                  </>
                )}
                <span className="text-tertiary/40 text-xs sm:text-sm font-medium">
                  {stats.reviewsCount} {stats.reviewsCount === 1 ? 'reseña' : 'reseñas'}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <p className={`${DESCRIPTION} text-tertiary text-sm md:text-base leading-relaxed max-w-xl line-clamp-3`}>
              {game.description}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
