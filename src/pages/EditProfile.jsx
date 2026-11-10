import { useState, useEffect } from 'react';

import { ArrowLeft, Image, Save, UserRound } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

import Sidebar from '../components/app/Sidebar';
import SearchBar from '../components/app/SearchBar';

import { useAuth } from '../context/AuthContext';

import { getProfile, updateProfile } from '../services/users.service';
import { getErrorMessage } from '../services/api.service';

const EditProfile = () => {
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    let ignore = false;

    getProfile(user.nickname)
      .then((data) => {if (!ignore) setBio(data.user.bio ?? '')})
      .catch((error) => {if (!ignore) setError(getErrorMessage(error, 'Error al obtener el perfil'))})
      .finally(() => {if (!ignore) setLoading(false)})

    return () => { ignore = true; };
  }, [user.nickname])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateProfile({ bio });
      navigate(`/profile/${encodeURIComponent(user.nickname)}`);
      
    } catch (error) {
      setError(getErrorMessage(error, 'Error al actualizar el perfil'));
      setIsSubmitting(false);
    }
  };

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
              to='/profile'
              className='mb-6 inline-flex items-center gap-2 text-sm text-tertiary transition-colors hover:text-primary'
            >
              <ArrowLeft size={16} />
              Volver al perfil
            </Link>

            <div className='mb-8'>
              <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary'>
                Tu cuenta
              </p>
              <h1 className='text-3xl font-bold text-secondary sm:text-4xl'>
                Editar perfil
              </h1>
            </div>

            <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16'>
              <form
                onSubmit={handleSubmit}
                className='space-y-8'
              >
                <section className='space-y-5 border-y border-primary/20 py-6'>
                  <h2 className='text-lg font-bold'>Información personal</h2>
                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold'>
                      Nombre de usuario
                    </span>
                    <input
                      readOnly
                      aria-readonly='true'
                      value={user.nickname}
                      className='w-full cursor-not-allowed rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm text-tertiary outline-none'
                    />
                  </label>
                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold'>
                      Biografía
                    </span>
                    <textarea
                      rows={4}
                      maxLength={240}
                      value={bio}
                      onChange={(event) =>
                        setBio(event.target.value)
                      }
                      className='w-full resize-y rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm outline-none transition focus:border-primary'
                    />
                    <span className='mt-1 block text-right text-xs text-tertiary'>
                      {bio.length}/240
                    </span>
                  </label>
                </section>

                {/* <section className='space-y-5 border-b border-primary/20 pb-6'>
                  <h2 className='text-lg font-bold'>Imágenes</h2>
                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold'>
                      URL de la foto de perfil
                    </span>
                    <input
                      type='url'
                      value={profile.avatar}
                      onChange={(event) =>
                        updateField('avatar', event.target.value)
                      }
                      placeholder='https://ejemplo.com/foto.jpg'
                      className='w-full rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm outline-none transition focus:border-primary'
                    />
                  </label>
                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold'>
                      URL de la portada
                    </span>
                    <input
                      type='url'
                      value={profile.bannerImage}
                      onChange={(event) =>
                        updateField('bannerImage', event.target.value)
                      }
                      placeholder='https://ejemplo.com/portada.jpg'
                      className='w-full rounded-lg border border-primary/25 bg-background-secondary px-4 py-3 text-sm outline-none transition focus:border-primary'
                    />
                  </label>
                </section> */}

                {error && <p className='text-sm text-red-500'>{error}</p>}

                <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  <Link
                    to='/profile'
                    className='rounded-lg border border-primary/25 px-5 py-3 text-center text-sm font-semibold text-tertiary transition hover:border-primary/50 hover:text-secondary'
                  >
                    Cancelar
                  </Link>
                  <button
                    type='submit'
                    disabled={isSubmitting || loading}
                    className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Save size={17} />
                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              </form>

              <aside className='self-start lg:sticky lg:top-24'>
                <div className='mb-4 flex items-center gap-2 text-sm font-bold text-tertiary'>
                  <Image size={16} />
                  Vista previa
                </div>
                <div className='overflow-hidden border-y border-primary/20'>
                  <div className='relative h-24 bg-background-secondary'>
                    {/* TODO: banner elegido en el selector de imágenes
                    {profile.bannerImage && (
                      <img
                        src={profile.bannerImage}
                        alt=''
                        className='h-full w-full object-cover'
                        onError={(event) =>
                          event.currentTarget.classList.add('hidden')
                        }
                      />
                    )} */}
                    <div className='absolute inset-0 bg-linear-to-t from-background/80 to-transparent' />
                  </div>
                  <div className='px-4 pb-5'>
                    <div className='mt-0 mb-5 grid h-16 w-16 place-items-center overflow-hidden rounded-full border-4 border-background bg-background-secondary text-primary'>
                      {/* TODO: avatar elegido en el selector de imágenes
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt=''
                          className='h-full w-full object-cover'
                          onError={(event) =>
                            event.currentTarget.classList.add('hidden')
                          }
                        />
                      ) : ( */}
                        <UserRound size={28} />
                      {/* )} */}
                    </div>
                    <p className='font-bold'>{user.nickname}</p>
                    {/* <p className='mt-1 text-sm font-semibold text-primary'>
                      {profile.username || '@usuario'}
                    </p> */}
                    <p className='mt-3 whitespace-pre-wrap wrap-break-word text-sm text-tertiary'>
                      {bio || 'Tu biografía aparecerá aquí.'}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
