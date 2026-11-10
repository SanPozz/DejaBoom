import { useEffect, useState } from 'react';
import { Bookmark, Gamepad2, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPopularLists } from '../../services/lists.service';
import Bone from './Bone';

const COVER = 'w-12 h-18 sm:w-14 sm:h-20 shrink-0 rounded-lg';

export default function PopularLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getPopularLists().then((result) => {
      if (cancelled) return;
      setLists(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sin listas públicas: la sección no se muestra
  if (!loading && lists.length === 0) return null;

  return (
    <section className='w-full bg-background text-white px-4 sm:px-8 lg:px-12 xl:px-16 pb-12 font-sans select-none'>
      <div className='max-w-6xl mx-auto'>
        <div className='pt-8 mb-5'>
          <p className='text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1'>Descubre</p>
          <h3 className='text-xl sm:text-2xl font-black tracking-tight text-secondary'>Listas populares</h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4'>
          {loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div key={i} className='bg-background-secondary border border-white/[0.07] rounded-2xl p-5 sm:p-4'>
                  <div className='flex gap-3 sm:gap-4 mb-5'>
                    <div className='flex -space-x-6 pl-1 pt-1 w-32 sm:w-40 shrink-0'>
                      {Array.from({ length: 3 }, (_, j) => <Bone key={j} className={COVER} />)}
                    </div>
                    <div className='flex-1 pt-1 space-y-2'>
                      <Bone className='h-3 w-16' />
                      <Bone className='h-5 w-full' />
                    </div>
                  </div>
                  <Bone className='h-4 w-1/2' />
                </div>
              ))
            : lists.map((list) => <PopularListCard key={list.id} list={list} />)}
        </div>
      </div>
    </section>
  );
}

function PopularListCard({ list }) {
  const { covers } = list;

  return (
    <Link
      to={`/lists/${list.id}`}
      className='group bg-background-secondary border border-white/[0.07] rounded-2xl p-5 sm:p-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300'
    >
      <div className='flex gap-3 sm:gap-4 mb-5'>
        {/* Portadas apiladas e inclinadas, centradas según cuántas haya */}
        <div className='flex -space-x-6 pl-1 pt-1 w-32 sm:w-40 h-19 sm:h-21 shrink-0'>
          {covers.length > 0 ? (
            covers.map((game, index) => (
              <div
                key={game.id}
                style={{
                  zIndex: covers.length - index,
                  transform: `rotate(${(index - (covers.length - 1) / 2) * 3}deg)`,
                }}
                className={`relative ${COVER} overflow-hidden border-2 border-background-secondary shadow-xl bg-zinc-900 group-hover:-translate-y-1 transition-transform duration-300`}
              >
                {game.cover && <img src={game.cover} alt={`Portada de ${game.title}`} className='w-full h-full object-cover' />}
              </div>
            ))
          ) : (
            <div className={`grid ${COVER} place-items-center border border-dashed border-white/15 text-zinc-500`}>
              <Gamepad2 size={18} />
            </div>
          )}
        </div>

        <div className='pt-1 min-w-0'>
          <span className='text-[10px] uppercase tracking-wider text-zinc-500 font-bold'>Colección</span>
          <h4 className='font-bold text-lg sm:text-base leading-snug text-zinc-100 group-hover:text-primary transition-colors line-clamp-2 mt-1 wrap-break-word'>
            {list.title}
          </h4>
        </div>
      </div>

      <div className='flex items-center gap-2 pt-4 sm:pt-3 border-t border-white/6 text-sm sm:text-xs text-zinc-500 font-medium'>
        <Layers3 className='w-3.5 h-3.5 text-primary/80 shrink-0' />
        <span className='shrink-0'>
          {list.gamesCount} {list.gamesCount === 1 ? 'juego' : 'juegos'}
        </span>
        <span className='text-zinc-700'>|</span>
        <span className='truncate'>por {list.user.nickname}</span>
        {list.savedCount > 0 && (
          <span className='ml-auto flex shrink-0 items-center gap-1 text-primary' aria-label={`Guardada ${list.savedCount} veces`}>
            <Bookmark className='w-3.5 h-3.5 fill-primary' />
            {list.savedCount}
          </span>
        )}
      </div>
    </Link>
  );
}
