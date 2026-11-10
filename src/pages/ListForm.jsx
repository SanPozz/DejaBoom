import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Check, Gamepad2, Globe, GripVertical, Lock, Plus, Search, Trash2 } from 'lucide-react';
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/app/Sidebar';
import SearchBar from '../components/app/SearchBar';
import { Spinner } from '../components/app/Spinner.jsx';
import { useDebounce } from '../hooks/useDebounce';
import { searchGames } from '../services/games.service';
import { createList, getListById, updateList } from '../services/lists.service';
import { getErrorMessage } from '../services/api.service';

const EMPTY_LIST = { title: '', description: '', isPublic: false, games: [] };

const VISIBILITY_OPTIONS = [
  { value: false, label: 'Privada', detail: 'Solo vos la ves', icon: Lock },
  { value: true, label: 'Pública', detail: 'Aparece en tu perfil', icon: Globe },
];

const GameCover = ({ game, className }) => (
  <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded bg-background-secondary ${className}`}>
    <Gamepad2 size={18} className='absolute text-tertiary' />
    {game.cover && (
      <img
        src={game.cover}
        alt=''
        onError={(event) => event.currentTarget.classList.add('hidden')}
        className='relative h-full w-full rounded object-cover'
      />
    )}
  </div>
);

const releaseYear = (game) => game.releaseDate?.getUTCFullYear() ?? '';

// Fila de un juego de la lista. Se arrastra solo desde la manija, así en celular se puede seguir scrolleando
const SortableGameRow = ({ game, position, dragDisabled, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: game.id,
    disabled: dragDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative flex min-w-0 items-center gap-3 border-b border-primary/10 bg-background px-2 py-2.5 last:border-b-0 ${
        isDragging ? 'z-10 rounded-lg border-primary/40 shadow-[0_0_18px_rgba(103,228,91,0.25)]' : ''
      }`}
    >
      <button
        type='button'
        {...attributes}
        {...listeners}
        aria-label={`Mover ${game.title}`}
        disabled={dragDisabled}
        className='grid h-9 w-6 shrink-0 touch-none place-items-center rounded text-tertiary transition hover:text-primary enabled:cursor-grab enabled:active:cursor-grabbing disabled:opacity-30'
      >
        <GripVertical size={16} />
      </button>
      <span className='w-5 shrink-0 text-center text-xs font-bold text-tertiary'>{position}</span>
      <GameCover game={game} className='h-12 w-10' />
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-semibold leading-snug text-secondary'>{game.title}</p>
        <p className='mt-1 text-xs text-tertiary'>{releaseYear(game)}</p>
      </div>
      <button
        type='button'
        onClick={() => onRemove(game.id)}
        aria-label={`Quitar ${game.title} de la lista`}
        className='grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md border border-primary/20 text-tertiary transition hover:border-rose-400/50 hover:text-rose-400'
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

const ListForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [list, setList] = useState(isEditing ? null : EMPTY_LIST);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');

  // Al editar se carga la lista. Si no es tuya se trata como inexistente
  useEffect(() => {
    if (!id) return;

    let ignore = false;

    getListById(id)
      .then((data) => {
        if (ignore) return;
        if (!data.isOwner) {
          setLoadError('Lista no encontrada');
          return;
        }
        setList({
          title: data.title,
          description: data.description ?? '',
          isPublic: data.isPublic,
          games: data.games,
        });
      })
      .catch((err) => {
        if (ignore) return;
        setLoadError(err.response?.status === 404 ? 'Lista no encontrada' : getErrorMessage(err, 'No se pudo cargar la lista'));
      });

    return () => { ignore = true; };
  }, [id]);

  // Búsqueda en IGDB: espera a que deje de escribir y cancela el pedido anterior
  const debouncedQuery = useDebounce(query, 300);
  const term = query.trim() ? debouncedQuery.trim() : '';
  const [results, setResults] = useState({ term: '', games: [] });
  const isSearching = query.trim() !== term || results.term !== term;

  useEffect(() => {
    if (!term) return;

    const controller = new AbortController();
    searchGames(term, controller.signal)
      .then((games) => setResults({ term, games }))
      .catch((error) => {
        if (!axios.isCancel(error)) setResults({ term, games: [] });
      });

    return () => controller.abort();
  }, [term]);

  const selectedGames = list?.games.filter((game) =>
    game.title.toLowerCase().includes(selectedQuery.trim().toLowerCase()),
  ) ?? [];

  const updateField = (field, value) => setList((current) => ({ ...current, [field]: value }));

  const addGame = (game) => {
    setList((current) => ({
      ...current,
      games: current.games.some((item) => item.id === game.id) ? current.games : [...current.games, game],
    }));
  };

  const removeGame = (gameId) => {
    setList((current) => ({
      ...current,
      games: current.games.filter((game) => game.id !== gameId),
    }));
  };

  // distance: 5 evita que un clic en la manija se tome como arrastre
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setList((current) => {
      const oldIndex = current.games.findIndex((game) => game.id === active.id);
      const newIndex = current.games.findIndex((game) => game.id === over.id);
      return { ...current, games: arrayMove(current.games, oldIndex, newIndex) };
    });
  };

  // Con el filtro activo solo se ve una parte de la lista, así que no se puede reordenar
  const isFiltering = selectedQuery.trim() !== '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError(null);

    const payload = {
      title: list.title,
      description: list.description,
      isPublic: list.isPublic,
      gameIds: list.games.map((game) => game.id),
    };

    try {
      const saved = isEditing ? await updateList(id, payload) : await createList(payload);
      navigate(`/lists/${saved.id}`);
    } catch (error) {
      setSaveError(getErrorMessage(error, 'No se pudo guardar la lista'));
      setSaving(false);
    }
  };

  if (loadError) {
    return (
      <div className='flex min-h-screen w-full bg-background text-secondary'>
        <Sidebar />
        <main className='flex flex-1 items-center justify-center px-6'>
          <div className='text-center'>
            <p className='mb-3 text-xs uppercase tracking-[0.2em] text-tertiary'>{loadError}</p>
            <Link to='/lists' className='font-bold text-primary underline underline-offset-4'>
              Volver a mis listas
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!list) {
    return (
      <div className='flex min-h-screen w-full bg-background text-secondary'>
        <Sidebar />
        <main className='flex flex-1 items-center justify-center'>
          <Spinner />
        </main>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen w-full bg-background text-secondary'>
      <Sidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <header className='sticky top-0 z-30 border-b border-tertiary/10 bg-background/90 backdrop-blur-xl'>
          <SearchBar />
        </header>

        <main className='flex-1 px-4 py-8 pb-24 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-5xl'>
            <Link
              to={isEditing ? `/lists/${id}` : '/lists'}
              className='mb-6 inline-flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-primary'
            >
              <ArrowLeft size={16} />
              {isEditing ? 'Volver a la lista' : 'Volver a mis listas'}
            </Link>

            <div className='mb-8'>
              <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary'>Biblioteca</p>
              <h1 className='text-3xl font-bold text-secondary sm:text-4xl'>
                {isEditing ? 'Editar lista' : 'Crear una lista'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className='space-y-8'>
              <section className='grid gap-5 border-y border-primary/20 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]'>
                <div className='space-y-5'>
                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold text-secondary'>Título</span>
                    <input
                      autoFocus
                      required
                      maxLength={80}
                      value={list.title}
                      onChange={(event) => updateField('title', event.target.value)}
                      placeholder='Ej. Aventuras para perderse'
                      className='w-full rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary'
                    />
                  </label>

                  <fieldset>
                    <legend className='mb-2 block text-sm font-semibold text-secondary'>Visibilidad</legend>
                    <div className='grid grid-cols-2 gap-2'>
                      {VISIBILITY_OPTIONS.map(({ value, label, detail, icon: Icon }) => {
                        const selected = list.isPublic === value;
                        return (
                          <button
                            key={label}
                            type='button'
                            onClick={() => updateField('isPublic', value)}
                            aria-pressed={selected}
                            className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition ${
                              selected
                                ? 'border-primary bg-primary/10'
                                : 'border-primary/20 bg-background-secondary hover:border-primary/50'
                            }`}
                          >
                            <Icon size={16} className={`mt-0.5 shrink-0 ${selected ? 'text-primary' : 'text-tertiary'}`} />
                            <span>
                              <span className={`block text-sm font-semibold ${selected ? 'text-primary' : 'text-secondary'}`}>{label}</span>
                              <span className='block text-xs text-tertiary'>{detail}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <label className='block'>
                  <span className='mb-2 block text-sm font-semibold text-secondary'>Descripción</span>
                  <textarea
                    rows={6}
                    maxLength={300}
                    value={list.description}
                    onChange={(event) => updateField('description', event.target.value)}
                    placeholder='¿Qué tienen en común estos juegos?'
                    className='w-full resize-y rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary'
                  />
                  <span className='mt-1 block text-right text-xs text-tertiary'>{list.description.length}/300</span>
                </label>
              </section>

              <section className='rounded-xl border border-primary/25 bg-background-secondary p-4 sm:p-5'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <h2 className='text-lg font-bold'>Juegos de la lista</h2>
                  <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                    <p className='text-sm text-tertiary'>{list.games.length} en la lista</p>
                    {list.games.length > 0 && (
                      <label className='relative block w-full sm:w-64'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-tertiary' />
                        <input
                          type='search'
                          value={selectedQuery}
                          onChange={(event) => setSelectedQuery(event.target.value)}
                          placeholder='Buscar para quitar'
                          aria-label='Buscar juego para quitar'
                          className='w-full rounded-lg border border-primary/25 bg-background py-2 pl-9 pr-3 text-sm text-secondary outline-none transition focus:border-primary'
                        />
                      </label>
                    )}
                  </div>
                </div>

                {list.games.length > 0 ? (
                  <div
                    className='list-games-scrollbar mt-4 max-h-72 overflow-y-auto rounded-lg border border-primary/20 bg-background p-2 sm:p-3'
                    role='region'
                    aria-label='Juegos seleccionados'
                    tabIndex={0}
                  >
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={selectedGames.map((game) => game.id)} strategy={verticalListSortingStrategy}>
                        {selectedGames.map((game) => (
                          <SortableGameRow
                            key={game.id}
                            game={game}
                            position={list.games.indexOf(game) + 1}
                            dragDisabled={isFiltering}
                            onRemove={removeGame}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                    {selectedGames.length === 0 && (
                      <p className='px-2 py-6 text-sm text-tertiary'>No hay juegos que coincidan con la búsqueda.</p>
                    )}
                  </div>
                ) : (
                  <p className='mt-4 text-sm text-tertiary'>Buscá un juego y agregalo a tu lista.</p>
                )}

                <div className='mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 sm:p-4'>
                  <div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h3 className='text-sm font-bold text-primary'>Agregar juegos</h3>
                    <label className='relative block w-full sm:max-w-sm sm:flex-1'>
                      <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-primary/70' />
                      <input
                        type='search'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Buscar juegos'
                        aria-label='Buscar juegos para agregar'
                        maxLength={100}
                        autoComplete='off'
                        className='w-full rounded-lg border border-primary/25 bg-background-secondary py-2.5 pl-9 pr-3 text-sm text-secondary outline-none transition focus:border-primary'
                      />
                    </label>
                  </div>

                  <div className='list-games-scrollbar max-h-72 overflow-y-auto' role='region' aria-label='Resultados de búsqueda' tabIndex={0}>
                    {!query.trim() ? (
                      <p className='py-6 text-sm text-tertiary'>Escribí el nombre de un juego para buscarlo.</p>
                    ) : isSearching ? (
                      <p className='py-6 text-sm text-tertiary'>Buscando...</p>
                    ) : results.games.length === 0 ? (
                      <p className='py-6 text-sm text-tertiary'>No se encontraron juegos.</p>
                    ) : (
                      results.games.map((game) => {
                        const alreadyAdded = list.games.some((item) => item.id === game.id);
                        return (
                          <div
                            key={game.id}
                            className='flex min-w-0 items-center gap-3 border-b border-primary/10 px-2 py-2.5 transition-colors last:border-b-0 hover:bg-primary/5'
                          >
                            <GameCover game={game} className='h-14 w-11' />
                            <div className='min-w-0 flex-1'>
                              <p className='truncate text-sm font-semibold'>{game.title}</p>
                              <p className='mt-1 text-xs text-tertiary'>{releaseYear(game)}</p>
                            </div>
                            <button
                              type='button'
                              onClick={() => addGame(game)}
                              disabled={alreadyAdded}
                              aria-label={`${alreadyAdded ? 'Agregado' : 'Agregar'}: ${game.title}`}
                              className='grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              {alreadyAdded ? <Check size={17} /> : <Plus size={17} />}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </section>

              <div className='flex flex-wrap items-center justify-end gap-3 border-t border-primary/20 pt-5'>
                {saveError && <p className='mr-auto text-sm text-red-400'>{saveError}</p>}
                <Link
                  to={isEditing ? `/lists/${id}` : '/lists'}
                  className='rounded-lg border border-primary/25 px-4 py-2.5 text-sm font-semibold text-tertiary transition hover:border-primary hover:bg-primary/5 hover:text-secondary'
                >
                  Cancelar
                </Link>
                <button
                  type='submit'
                  disabled={saving}
                  className='inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <Check size={17} />
                  {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear lista'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListForm;
