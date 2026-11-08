import Sidebar from '../components/app/Sidebar';

import GameCover from '../components/app/GameDetail/GameCover';

import ColumnaCentro from '../components/app/GameDetail/ColumnaCentro';

import DerechaGameDetail from '../components/app/GameDetail/DerechaGameDetail';

import SimilarGamesCarousel from '../components/app/GameDetail/SimilarGamesCarousel';

import PopularListsSection from '../components/app/GameDetail/PopularListsSection';
import GameDetailSkeleton from '../components/app/GameDetail/GameDetailSkeleton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchGameById } from '../services/games.service';

const GameDetail = () => {
  const { id: gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loadedId, setLoadedId] = useState(null);
  const loading = loadedId !== gameId;

  useEffect(() => {
    let cancelled = false;

    window.scrollTo(0, 0);

    searchGameById(gameId).then((result) => {
      if (cancelled) return;
      setGame(result);
      setLoadedId(gameId);
    });

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  return (
    <div className='flex w-full bg-background min-h-screen text-secondary font-sans antialiased'>
      <Sidebar />

      <div className='flex-1 w-full overflow-y-auto'>
        {loading ? (
          <GameDetailSkeleton />
        ) : (
          <main className='max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-8 items-start'>
            <GameCover
              url={game?.coverLarge}
              title={game?.title}
            />

            <ColumnaCentro
              genres={game?.genres ?? []}
              platforms={game?.platforms ?? []}
              title={game?.title}
              releaseDate={
                game?.releaseDate?.toLocaleDateString('es-AR', {
                  timeZone: 'UTC',
                }) ?? ''
              }
              description={game?.description}
              studios={game?.developers ?? []}
              publishers={game?.publishers ?? []}
            />

            <DerechaGameDetail
              gameName={game?.title}
              gameId={game?.id}
              timeToBeat={game?.timeToBeat}
            />
          </main>
        )}

        <SimilarGamesCarousel
          key={gameId}
          gameId={gameId}
        />

        <PopularListsSection gameName={game?.title} />
      </div>
    </div>
  );
};

export default GameDetail;
