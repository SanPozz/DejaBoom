import { Edit3, Share2, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProfileHeader({ profile }) {
  const [shareLabel, setShareLabel] = useState('Compartir perfil')

  const handleShareProfile = async () => {
    const shareUrl = window.location.href
    const shareData = {
      title: `Perfil de ${profile.name}`,
      text: `Mira el perfil de ${profile.name} en DejaBoom`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareLabel('Enlace compartido')
        return
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        setShareLabel('Enlace copiado')
        return
      }

      window.prompt('Copia este enlace:', shareUrl)
      setShareLabel('Enlace listo')
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setShareLabel('No se pudo compartir')
      }
    } finally {
      window.setTimeout(() => setShareLabel('Compartir perfil'), 1800)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-8">
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 grid h-28 w-28 place-items-center rounded-full border-4 border-background bg-background-secondary text-primary sm:h-32 sm:w-32 md:h-40 md:w-40">
        <UserIcon size={40} />
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt={`${profile.name} avatar`}
            onError={(event) => event.currentTarget.classList.add("hidden")}
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-secondary sm:text-3xl md:text-4xl">
              {profile.name || 'User Example'}
            </h1>
            <p className="text-base font-semibold text-primary md:text-lg">
              @{profile.username || 'userexample'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={handleShareProfile}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-base font-bold text-background transition-all hover:opacity-90 sm:w-auto sm:px-4 sm:py-2.5 sm:text-base"
            >
              <Share2 size={18} />
              {shareLabel}
            </button>

            <Link
              to="/profile/edit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-base font-bold text-background transition-all hover:opacity-90 sm:w-auto sm:px-4 sm:py-2.5 sm:text-base"
            >
              <Edit3 size={18} />
              Editar Perfil
            </Link>

          </div>
        </div>

        <p className="mb-3 text-sm font-light text-tertiary md:text-base">
          {profile.bio}
        </p>
      </div>
    </div>
  )
}
