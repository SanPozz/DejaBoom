import { useEffect, useState } from 'react';

import Bone from './Bone.jsx';

import { getPopularGames } from '../../services/games.service.js';

import { Link } from 'react-router-dom';

export default function GameGrids() {

  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPopularGames().then((games) => {
      if (!cancelled) {
        setPopularGames(games);
        setLoading(false);
      }
    });
    
    return () => {
      cancelled = true;
    };
  }, []);


  return (
    <section className="w-full bg-background text-secondary px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 font-sans select-none">
      <div className="max-w-6xl mx-auto">
        <div>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">Explora ahora</p>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-secondary">Populares esta semana</h3>
            </div>
          </div>

          {!loading && popularGames.length === 0 ? (
            <p className="text-sm text-zinc-500">Todavía no hay juegos reseñados.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {loading
                ? Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="min-w-0">
                      <Bone className="aspect-3/4 w-full rounded-xl" />
                      <Bone className="mt-2 h-4 w-3/4" />
                    </div>
                  ))
                : popularGames.map((game) => (
                    <Link key={game.id} to={`/game/${game.id}`} className="group min-w-0">
                      <div className="aspect-3/4 w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/8 group-hover:border-primary/60 group-hover:ring-2 group-hover:ring-primary/10 transition-all duration-300">
                        <img src={game.cover} alt={`Portada de ${game.title}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <h4 className="mt-2 text-sm font-bold text-zinc-200 truncate group-hover:text-primary transition-colors">{game.title}</h4>
                    </Link>
                  ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
