import { useEffect, useState } from 'react';
import { BookmarkPlus, Gamepad2, Globe, Layers3, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/app/Sidebar';
import SearchBar from '../components/app/SearchBar';
import { Spinner } from '../components/app/Spinner.jsx';
import { useAuth } from '../context/AuthContext';
import { getUserLists } from '../services/lists.service';
import { getErrorMessage } from '../services/api.service';

const FILTERS = [
  { label: 'Todas', match: () => true },
  { label: 'Públicas', match: (list) => list.isPublic },
  { label: 'Privadas', match: (list) => !list.isPublic },
];

const Lists = () => {
  const { user } = useAuth();
  const [lists, setLists] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(FILTERS[0]);

  useEffect(() => {
    let ignore = false;

    getUserLists(user.nickname)
      .then((data) => { if (!ignore) setLists(data); })
      .catch((err) => { if (!ignore) setError(getErrorMessage(err, 'No se pudieron cargar tus listas')); });

    return () => { ignore = true; };
  }, [user.nickname]);

  const visibleLists = lists?.filter(filter.match) ?? [];
  const totalGames = lists?.reduce((total, list) => total + list.gamesCount, 0) ?? 0;
  const publicCount = lists?.filter((list) => list.isPublic).length ?? 0;

  const stats = [
    { icon: Layers3, label: 'Total', value: lists?.length ?? 0, detail: 'listas creadas' },
    { icon: Gamepad2, label: 'Juegos', value: totalGames, detail: 'en todas tus listas' },
    { icon: Globe, label: 'Públicas', value: publicCount, detail: 'visibles para todos' },
  ];

  return (
    <div className='flex w-full min-h-screen bg-background text-secondary'>
      <Sidebar />

      <div className='flex-1 min-w-0 flex flex-col'>
        <header className='sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-tertiary/10'>
          <SearchBar />
        </header>

        <main className='flex-1 px-4 sm:px-6 lg:px-8 py-8 pb-20'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
              <div>
                <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-tertiary mb-2'>Biblioteca</p>
                <h1 className='text-3xl sm:text-4xl font-bold text-secondary'>Mis Listas</h1>
              </div>

              <Link
                to='/lists/new'
                className='inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20'
              >
                <BookmarkPlus size={18} />
                Nueva lista
              </Link>
            </div>

            {error && <p className='py-16 text-center text-tertiary'>{error}</p>}

            {!error && !lists && (
              <div className='flex justify-center py-16'>
                <Spinner />
              </div>
            )}

            {lists && (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
                  {stats.map(({ icon: Icon, label, value, detail }) => (
                    <div key={label} className='bg-background-secondary border border-tertiary/15 rounded-2xl p-5'>
                      <div className='flex items-center gap-3 text-tertiary mb-3'>
                        <Icon size={18} className='text-primary' />
                        <span className='text-xs uppercase tracking-[0.18em]'>{label}</span>
                      </div>
                      <p className='text-3xl font-bold text-secondary'>{value}</p>
                      <p className='text-sm text-tertiary mt-1'>{detail}</p>
                    </div>
                  ))}
                </div>

                {lists.length === 0 ? (
                  <div className='rounded-2xl border border-dashed border-primary/25 bg-background-secondary/50 px-6 py-16 text-center'>
                    <p className='text-secondary font-semibold'>Todavía no creaste ninguna lista</p>
                    <p className='mt-1 text-sm text-tertiary'>Juntá tus juegos por tema, género o lo que se te ocurra.</p>
                  </div>
                ) : (
                  <>
                    <div className='flex flex-wrap gap-2 mb-8'>
                      {FILTERS.map((item) => (
                        <button
                          key={item.label}
                          type='button'
                          onClick={() => setFilter(item)}
                          aria-pressed={filter === item}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em] border transition-all ${
                            filter === item
                              ? 'bg-primary text-black border-primary'
                              : 'border-tertiary/20 text-tertiary hover:border-primary/40 hover:text-secondary'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {visibleLists.length === 0 ? (
                      <p className='py-10 text-center text-sm text-tertiary'>No tenés listas {filter.label.toLowerCase()}.</p>
                    ) : (
                      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {visibleLists.map((list) => <ListCard key={list.id} list={list} />)}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

function ListCard({ list }) {
  const VisibilityIcon = list.isPublic ? Globe : Lock;

  return (
    <Link
      to={`/lists/${list.id}`}
      className='group flex flex-col bg-background-secondary border border-tertiary/15 rounded-2xl overflow-hidden hover:border-primary/35 transition-all duration-300'
    >
      <div className='flex items-center gap-1.5 px-4 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-tertiary'>
        <VisibilityIcon size={12} />
        {list.isPublic ? 'Pública' : 'Privada'}
      </div>

      <div className='flex-1 px-4 pb-3 pt-3'>
        <div className='flex -space-x-4 mb-4 h-20'>
          {list.covers.length > 0 ? (
            list.covers.map((game, index) => (
              <div
                key={game.id}
                className='w-16 h-20 rounded-lg overflow-hidden border-2 border-background-secondary ring-1 ring-white/5 shadow-lg shrink-0 bg-zinc-900'
                style={{ zIndex: list.covers.length - index }}
              >
                {game.cover && <img src={game.cover} alt={game.title} className='w-full h-full object-cover' />}
              </div>
            ))
          ) : (
            <div className='grid w-16 h-20 place-items-center rounded-lg border border-dashed border-tertiary/25 text-tertiary'>
              <Gamepad2 size={18} />
            </div>
          )}
        </div>

        <h2 className='text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 wrap-break-word'>
          {list.title}
        </h2>
        {list.description && (
          <p className='text-sm text-tertiary mt-2 leading-relaxed line-clamp-2 wrap-break-word'>{list.description}</p>
        )}
      </div>

      <div className='flex items-center justify-between px-4 pb-4 pt-1 text-xs'>
        <p className='font-medium text-secondary'>
          {list.gamesCount} {list.gamesCount === 1 ? 'juego' : 'juegos'}
        </p>
        <p className='text-tertiary'>Actualizada el {list.updatedAt.toLocaleDateString('es-AR')}</p>
      </div>
    </Link>
  );
}

export default Lists;
