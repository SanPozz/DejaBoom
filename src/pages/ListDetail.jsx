import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, CalendarClock, Gamepad2, Globe, History, Lock, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/app/Sidebar';
import SearchBar from '../components/app/SearchBar';
import ListItem from '../components/app/ListItem';
import { Spinner } from '../components/app/Spinner.jsx';
import { deleteList, getListById, saveList, unsaveList } from '../services/lists.service';
import { getErrorMessage } from '../services/api.service';

const formatDate = (date) => date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

const ListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Se guarda el id junto con el resultado: si cambia la URL, la lista anterior deja de mostrarse sola
  const [result, setResult] = useState({ id: null, list: null, error: null });
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [savePending, setSavePending] = useState(false);

  const isCurrent = result.id === id;
  const list = isCurrent ? result.list : null;
  const error = isCurrent ? result.error : null;

  useEffect(() => {
    let ignore = false;

    getListById(id)
      .then((data) => { if (!ignore) setResult({ id, list: data, error: null }); })
      .catch((err) => {
        if (ignore) return;
        const message = err.response?.status === 404 ? 'Lista no encontrada' : getErrorMessage(err, 'No se pudo cargar la lista');
        setResult({ id, list: null, error: message });
      });

    return () => { ignore = true; };
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteList(id);
      navigate('/lists');
    } catch (err) {
      setDeleteError(getErrorMessage(err, 'No se pudo eliminar la lista'));
      setDeleting(false);
    }
  };

  const setSaved = (savedByMe) => {
    setResult((current) => ({
      ...current,
      list: {
        ...current.list,
        savedByMe,
        savedCount: current.list.savedCount + (savedByMe ? 1 : -1),
      },
    }));
  };

  // Se actualiza al toque y, si el pedido falla, se vuelve atrás
  const handleToggleSave = async () => {
    if (savePending) return;

    const nextSaved = !list.savedByMe;
    setSavePending(true);
    setSaved(nextSaved);

    try {
      if (nextSaved) {
        await saveList(id);
      } else {
        await unsaveList(id);
      }
    } catch {
      setSaved(!nextSaved);
    } finally {
      setSavePending(false);
    }
  };

  if (error) {
    return (
      <div className='flex w-full min-h-screen bg-background text-secondary'>
        <Sidebar />
        <div className='flex-1 flex items-center justify-center px-6'>
          <div className='text-center'>
            <p className='text-xs uppercase tracking-[0.2em] text-tertiary mb-3'>{error}</p>
            <Link to='/lists' className='text-primary font-bold underline underline-offset-4'>
              Volver a mis listas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className='flex w-full min-h-screen bg-background text-secondary'>
        <Sidebar />
        <div className='flex-1 flex items-center justify-center'>
          <Spinner />
        </div>
      </div>
    );
  }

  const VisibilityIcon = list.isPublic ? Globe : Lock;
  const heroCovers = list.games.slice(0, 4).filter((game) => game.coverLarge);

  const stats = [
    { icon: Gamepad2, label: 'Juegos', value: list.games.length },
    { icon: Bookmark, label: 'Guardada', value: `${list.savedCount} ${list.savedCount === 1 ? 'vez' : 'veces'}` },
    { icon: CalendarClock, label: 'Creada', value: formatDate(list.createdAt) },
    { icon: History, label: 'Actualizada', value: formatDate(list.updatedAt) },
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
            <div className='mb-6'>
              <Link
                to={list.isOwner ? '/lists' : `/profile/${encodeURIComponent(list.user.nickname)}`}
                className='inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors'
              >
                <ArrowLeft size={16} />
                {list.isOwner ? 'Volver a mis listas' : `Volver al perfil de ${list.user.nickname}`}
              </Link>
            </div>

            <section className='rounded-3xl border border-tertiary/15 bg-background-secondary overflow-hidden mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]'>
              {/* Portada: las primeras 4 portadas una al lado de la otra, detrás del degradado */}
              <div className='relative h-56 sm:h-72 w-full overflow-hidden'>
                {heroCovers.length > 0 && (
                  <div className='absolute inset-0 flex scale-[1.03]'>
                    {heroCovers.map((game) => (
                      <img key={game.id} src={game.coverLarge} alt='' className='h-full min-w-0 flex-1 object-cover' />
                    ))}
                  </div>
                )}
                <div className='absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/30' />
                <div className='absolute inset-0 flex items-end p-6 sm:p-8'>
                  <div className='max-w-2xl min-w-0'>
                    <p className='inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary mb-3'>
                      <VisibilityIcon size={12} />
                      {list.isPublic ? 'Pública' : 'Privada'}
                    </p>
                    <h1 className='text-3xl sm:text-5xl font-black tracking-tight text-white mb-3 wrap-break-word'>
                      {list.title}
                    </h1>
                    {list.description && (
                      <p className='text-sm sm:text-base text-zinc-200 max-w-xl leading-relaxed line-clamp-3 wrap-break-word'>
                        {list.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6'>
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className='rounded-2xl border border-tertiary/15 bg-background/80 p-4'>
                    <div className='flex items-center gap-2 text-tertiary mb-2'>
                      <Icon size={16} className='text-primary' />
                      <span className='text-[10px] uppercase tracking-[0.18em]'>{label}</span>
                    </div>
                    <p className='text-xl font-bold text-secondary'>{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className='mb-6 flex items-center justify-between gap-4 flex-wrap'>
              <Link
                to={`/profile/${encodeURIComponent(list.user.nickname)}`}
                className='flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors'
              >
                {list.user.profilePicture ? (
                  <img src={list.user.profilePicture} alt='' className='w-7 h-7 rounded-full object-cover' />
                ) : (
                  <span className='grid w-7 h-7 place-items-center rounded-full bg-primary text-xs font-black text-black'>
                    {list.user.nickname.charAt(0).toUpperCase()}
                  </span>
                )}
                Lista de <span className='font-bold text-secondary'>{list.user.nickname}</span>
              </Link>

              {!list.isOwner && (
                <button
                  type='button'
                  onClick={handleToggleSave}
                  disabled={savePending}
                  aria-pressed={list.savedByMe}
                  className={`inline-flex items-center gap-2 font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 ${
                    list.savedByMe
                      ? 'border border-primary/50 bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-primary text-black hover:opacity-90 shadow-lg shadow-primary/20'
                  }`}
                >
                  <Bookmark size={16} className={list.savedByMe ? 'fill-primary' : ''} />
                  {list.savedByMe ? 'Guardada' : 'Guardar lista'}
                  <span className={`text-xs ${list.savedByMe ? 'text-primary/70' : 'text-black/60'}`}>{list.savedCount}</span>
                </button>
              )}

              {list.isOwner && (
                <div className='flex items-center gap-3 flex-wrap'>
                  {deleteError && <p className='text-sm text-red-400'>{deleteError}</p>}

                  {confirmingDelete ? (
                    <>
                      <span className='text-sm text-tertiary'>¿Eliminar esta lista?</span>
                      <button
                        type='button'
                        onClick={() => setConfirmingDelete(false)}
                        disabled={deleting}
                        className='px-4 py-2.5 rounded-xl border border-tertiary/25 text-sm font-semibold text-tertiary hover:text-secondary transition-colors'
                      >
                        Cancelar
                      </button>
                      <button
                        type='button'
                        onClick={handleDelete}
                        disabled={deleting}
                        className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 text-sm font-bold text-white hover:bg-rose-400 transition-colors disabled:opacity-50'
                      >
                        <Trash2 size={16} />
                        {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type='button'
                        onClick={() => setConfirmingDelete(true)}
                        className='inline-flex items-center gap-2 border border-tertiary/25 text-tertiary font-bold px-4 py-2.5 rounded-xl hover:border-rose-400/50 hover:text-rose-400 transition-colors'
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                      <Link
                        to={`/lists/${list.id}/edit`}
                        className='inline-flex items-center gap-2 bg-primary text-black font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20'
                      >
                        <Pencil size={16} />
                        Editar lista
                      </Link>
                    </>
                  )}
                </div>
              )}
            </section>

            {list.games.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4'>
                {list.games.map((game, index) => (
                  <ListItem key={game.id} game={game} position={index + 1} />
                ))}
              </div>
            ) : (
              <div className='rounded-2xl border border-dashed border-primary/25 bg-background-secondary/50 px-6 py-16 text-center text-sm text-tertiary'>
                Esta lista todavía no tiene juegos.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListDetail;
